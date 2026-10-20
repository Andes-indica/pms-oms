import {
  prisma,
  recoverAdministrator,
} from "../src";

function requireValue(
  name: string,
) {
  const value =
    process.env[name]
      ?.trim();

  if (!value) {
    throw new Error(
      `${name}_REQUIRED`,
    );
  }

  return value;
}

async function main() {
  if (
    requireValue(
      "RECOVERY_CONFIRM",
    ) !==
    "RECOVER_ADMIN"
  ) {
    throw new Error(
      "RECOVERY_CONFIRM_INVALID",
    );
  }

  const result =
    await recoverAdministrator(
      requireValue(
        "RECOVERY_ADMIN_EMAIL",
      ),
    );

  console.log(
    JSON.stringify({
      event:
        "administrator_recovered",
      firmId: result.firmId,
      userId: result.id,
      email: result.email,
      sessionsRevoked: true,
    }),
  );
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
