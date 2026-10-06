import {
  afterEach,
  describe,
  expect,
  test,
} from "bun:test";

import {
  getInstrumentMaster,
  resetInstrumentMasterCacheForTests,
  validateInstrument,
} from "./instrument-master.service";

const originalPath =
  process.env
    .INSTRUMENT_MASTER_PATH;

const originalStrict =
  process.env
    .INSTRUMENT_MASTER_STRICT;

afterEach(() => {
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
