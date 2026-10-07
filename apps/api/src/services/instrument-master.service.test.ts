import type { prisma } from "@pms-oms/db";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  afterEach,
  beforeEach,
  mock,
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
const instrument = {
  findMany: mock(async (): Promise<unknown[]> => []),
  findUnique: mock(async (): Promise<unknown> => null),
  count: mock(async () => 0),
};
const database = { instrument } as unknown as Pick<typeof prisma, "instrument">;

beforeEach(() => {
  delete process.env.INSTRUMENT_MASTER_PATH;
  delete process.env.INSTRUMENT_MASTER_STRICT;
  resetInstrumentMasterCacheForTests();
  instrument.findMany.mockReset().mockResolvedValue([]);
  instrument.findUnique.mockReset().mockResolvedValue(null);
  instrument.count.mockReset().mockResolvedValue(0);
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
            database,
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
            database,
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
            database,
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
          await getInstrumentMaster(database);

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
    instrument.count.mockResolvedValue(1);
    expect(await getInstrumentMaster(database)).toEqual([]);
  });

  test("validates configured instruments in strict mode before database initialization", async () => {
    await configureSource([{ symbol: " custom ", exchange: " nse ", instrumentToken: "42" }]);
    process.env.INSTRUMENT_MASTER_STRICT = "true";
    expect(await validateInstrument("CUSTOM", "NSE", database)).toEqual({
      symbol: "CUSTOM", exchange: "NSE", instrumentToken: "42", name: undefined,
    });
  });

  test("rejects explicitly inactive instruments even in permissive mode", async () => {
    instrument.findUnique.mockResolvedValue({
      id: "inactive", symbol: "INFY", exchange: "NSE", isActive: false,
      instrumentToken: null, name: null, createdAt: new Date(), updatedAt: new Date(),
    });
    await expect(validateInstrument("INFY", "NSE", database)).rejects.toThrow("UNKNOWN_INSTRUMENT");
  });

  test("rejects malformed request values with a validation error", async () => {
    for (const input of [null, {}, { symbol: 42, exchange: "NSE" },
      { symbol: "INFY", exchange: "NSE", name: 42 }]) {
      await expect(upsertInstrument(input as never, database)).rejects.toThrow("INVALID_INSTRUMENT_MASTER");
    }
  });

  test("a failed source load never reuses the previous path's cache", async () => {
    await getInstrumentMaster(database);
    await configureSource([{ symbol: 42, exchange: "NSE" }]);
    await expect(getInstrumentMaster(database)).rejects.toThrow("INVALID_INSTRUMENT_MASTER");
    await expect(getInstrumentMaster(database)).rejects.toThrow("INVALID_INSTRUMENT_MASTER");
  });

  test("explicit imports reload a file edited at the same path", async () => {
    const path = await configureSource([{ symbol: "OLD", exchange: "NSE" }]);
    await getInstrumentMaster(database);
    await writeFile(path, JSON.stringify([{ symbol: "NEW", exchange: "NSE" }]));
    const imported: string[] = [];
    const transactionDatabase = { $transaction: async (callback: unknown) => {
      return (callback as (tx: unknown) => Promise<unknown>)({ instrument: {
        upsert: async (args: { create: { symbol: string } }) => { imported.push(args.create.symbol); },
      } });
    } } as unknown as Pick<typeof prisma, "$transaction">;
    expect(await importConfiguredInstrumentMaster(false, transactionDatabase)).toEqual({ importedCount: 1, replaced: false });
    expect(imported).toEqual(["NEW"]);
  });
});
