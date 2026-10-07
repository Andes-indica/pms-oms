import { prisma } from "@pms-oms/db";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  afterEach,
  beforeEach,
  spyOn,
  describe,
  expect,
  test,
} from "bun:test";

import {
  getInstrumentMaster,
  resetInstrumentMasterCacheForTests,
  validateInstrument,
  upsertInstrument,
  importConfiguredInstrumentMaster,
} from "./instrument-master.service";

let sourceDirectory: string | undefined;
const databaseMocks: Array<{ mockRestore(): void }> = [];

beforeEach(() => {
  delete process.env.INSTRUMENT_MASTER_PATH;
  delete process.env.INSTRUMENT_MASTER_STRICT;
  resetInstrumentMasterCacheForTests();
  databaseMocks.push(
    spyOn(prisma.instrument, "findMany").mockResolvedValue([]),
    spyOn(prisma.instrument, "findUnique").mockResolvedValue(null),
    spyOn(prisma.instrument, "count").mockResolvedValue(0),
  );
});

async function configureSource(items: unknown) {
  sourceDirectory = await mkdtemp(join(tmpdir(), "pms-instruments-"));
  const path = join(sourceDirectory, "instruments.json");
  await writeFile(path, JSON.stringify(items));
  process.env.INSTRUMENT_MASTER_PATH = path;
  return path;
}

const originalPath =
  process.env
    .INSTRUMENT_MASTER_PATH;

const originalStrict =
  process.env
    .INSTRUMENT_MASTER_STRICT;

afterEach(async () => {
  for (const mocked of databaseMocks.reverse()) mocked.mockRestore();
  databaseMocks.length = 0;
  if (sourceDirectory) await rm(sourceDirectory, { recursive: true, force: true });
  sourceDirectory = undefined;
  if (
    originalPath ===
    undefined
  ) {
    delete process.env
      .INSTRUMENT_MASTER_PATH;
  } else {
    process.env
      .INSTRUMENT_MASTER_PATH =
      originalPath;
  }

  if (
    originalStrict ===
    undefined
  ) {
    delete process.env
      .INSTRUMENT_MASTER_STRICT;
  } else {
    process.env
      .INSTRUMENT_MASTER_STRICT =
      originalStrict;
  }

  resetInstrumentMasterCacheForTests();
});

describe(
  "instrument master",
  () => {
    test(
      "normalizes known instruments",
      async () => {
        const instrument =
          await validateInstrument(
            " infy ",
            "nse",
          );

        expect(
          instrument.symbol,
        ).toBe("INFY");

        expect(
          instrument.exchange,
        ).toBe("NSE");
      },
    );

    test(
      "allows normalized unknown instruments when strict mode is disabled",
      async () => {
        delete process.env
          .INSTRUMENT_MASTER_STRICT;

        const instrument =
          await validateInstrument(
            "custom",
            "nse",
          );

        expect(
          instrument,
        ).toEqual({
          symbol: "CUSTOM",
          exchange: "NSE",
        });
      },
    );

    test(
      "rejects unknown instruments in strict mode",
      async () => {
        process.env
          .INSTRUMENT_MASTER_STRICT =
          "true";

        await expect(
          validateInstrument(
            "CUSTOM",
            "NSE",
          ),
        ).rejects.toThrow(
          "UNKNOWN_INSTRUMENT",
        );
      },
    );

    test(
      "returns built in instrument list by default",
      async () => {
        delete process.env
          .INSTRUMENT_MASTER_PATH;

        const instruments =
          await getInstrumentMaster();

        expect(
          instruments.some(
            (instrument) =>
              instrument.symbol ===
                "INFY" &&
              instrument.exchange ===
                "NSE",
          ),
        ).toBe(true);
      },
    );
  },
);


describe("instrument master authority and validation", () => {
  test("does not resurrect fallback instruments when all database rows are inactive", async () => {
    databaseMocks.push(spyOn(prisma.instrument, "count").mockResolvedValue(1));
    expect(await getInstrumentMaster()).toEqual([]);
  });

  test("validates configured instruments in strict mode before database initialization", async () => {
    await configureSource([{ symbol: " custom ", exchange: " nse ", instrumentToken: "42" }]);
    process.env.INSTRUMENT_MASTER_STRICT = "true";
    expect(await validateInstrument("CUSTOM", "NSE")).toEqual({
      symbol: "CUSTOM", exchange: "NSE", instrumentToken: "42", name: undefined,
    });
  });

  test("rejects explicitly inactive instruments even in permissive mode", async () => {
    databaseMocks.push(spyOn(prisma.instrument, "findUnique").mockResolvedValue({
      id: "inactive", symbol: "INFY", exchange: "NSE", isActive: false,
      instrumentToken: null, name: null, createdAt: new Date(), updatedAt: new Date(),
    }));
    await expect(validateInstrument("INFY", "NSE")).rejects.toThrow("UNKNOWN_INSTRUMENT");
  });

  test("rejects malformed request values with a validation error", async () => {
    for (const input of [null, {}, { symbol: 42, exchange: "NSE" },
      { symbol: "INFY", exchange: "NSE", name: 42 }]) {
      await expect(upsertInstrument(input as never)).rejects.toThrow("INVALID_INSTRUMENT_MASTER");
    }
  });

  test("a failed source load never reuses the previous path's cache", async () => {
    await getInstrumentMaster();
    await configureSource([{ symbol: 42, exchange: "NSE" }]);
    await expect(getInstrumentMaster()).rejects.toThrow("INVALID_INSTRUMENT_MASTER");
    await expect(getInstrumentMaster()).rejects.toThrow("INVALID_INSTRUMENT_MASTER");
  });

  test("explicit imports reload a file edited at the same path", async () => {
    const path = await configureSource([{ symbol: "OLD", exchange: "NSE" }]);
    await getInstrumentMaster();
    await writeFile(path, JSON.stringify([{ symbol: "NEW", exchange: "NSE" }]));
    const imported: string[] = [];
    databaseMocks.push(spyOn(prisma, "$transaction").mockImplementation((async (callback: unknown) => {
      return (callback as (tx: unknown) => Promise<unknown>)({ instrument: {
        upsert: async (args: { create: { symbol: string } }) => { imported.push(args.create.symbol); },
      } });
    }) as never));
    expect(await importConfiguredInstrumentMaster()).toEqual({ importedCount: 1, replaced: false });
    expect(imported).toEqual(["NEW"]);
  });
});
