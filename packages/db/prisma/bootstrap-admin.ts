import {
  prisma,
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
  const firmName =
    requireValue(
      "BOOTSTRAP_FIRM_NAME",
    );

  const adminName =
    requireValue(
      "BOOTSTRAP_ADMIN_NAME",
    );

  const adminEmail =
    requireValue(
      "BOOTSTRAP_ADMIN_EMAIL",
    )
      .toLowerCase();

  const adminPassword =
    requireValue(
      "BOOTSTRAP_ADMIN_PASSWORD",
    );

  if (
    !adminEmail.includes("@")
  ) {
    throw new Error(
      "BOOTSTRAP_ADMIN_EMAIL_INVALID",
    );
  }

  if (
    adminPassword.length < 12 ||
    adminPassword.length > 128
  ) {
    throw new Error(
      "BOOTSTRAP_ADMIN_PASSWORD_INVALID",
    );
  }

  const existingUsers =
    await prisma.user.count();

  if (
    existingUsers > 0
  ) {
    throw new Error(
      "BOOTSTRAP_ALREADY_COMPLETED",
    );
  }

  const passwordHash =
    await Bun.password.hash(
      adminPassword,
    );

  const result =
    await prisma.$transaction(
      async (tx) => {
        await tx.$executeRaw`
          SELECT pg_advisory_xact_lock(
            hashtext(
              'pms_oms_bootstrap_admin'
            )
          )
        `;

        if (
          await tx.user.count() > 0
        ) {
          throw new Error(
            "BOOTSTRAP_ALREADY_COMPLETED",
          );
        }

        const firm =
          await tx.firm.create({
            data: {
              name: firmName,
            },
          });

        const user =
          await tx.user.create({
            data: {
              name: adminName,
              email:
                adminEmail,
              passwordHash,
              role: "ADMIN",
              firmId: firm.id,
            },
            select: {
              id: true,
              email: true,
            },
          });

        return {
          firmId: firm.id,
          userId: user.id,
          email: user.email,
        };
      },
    );

  console.log(
    JSON.stringify({
      event:
        "production_admin_bootstrapped",
      ...result,
    }),
  );
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
