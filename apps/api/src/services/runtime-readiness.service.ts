import {
  prisma,
} from "@pms-oms/db";

import {
  getInstrumentMaster,
} from "./instrument-master.service";

type ReadinessDatabase =
  Pick<
    typeof prisma,
    "instrument"
  >;

export async function validateRuntimeDependencies(
  database:
    ReadinessDatabase = prisma,
) {
  if (
    process.env.NODE_ENV !==
    "production"
  ) {
    return;
  }

  const activeInstrumentCount =
    await database.instrument
      .count({
        where: {
          isActive: true,
        },
      });

  if (
    activeInstrumentCount > 0
  ) {
    return;
  }

  if (
    !process.env
      .INSTRUMENT_MASTER_PATH
      ?.trim()
  ) {
    throw new Error(
      "PRODUCTION_INSTRUMENT_MASTER_REQUIRED",
    );
  }

  const instruments =
    await getInstrumentMaster(
      database,
    );

  if (
    instruments.length === 0
  ) {
    throw new Error(
      "PRODUCTION_INSTRUMENT_MASTER_EMPTY",
    );
  }
}
