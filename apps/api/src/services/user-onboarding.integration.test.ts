import { createHash } from "node:crypto";

import {
  afterAll,
  beforeEach,
  describe,
  expect,
  test,
} from "bun:test";

import { prisma } from "@pms-oms/db";

import {
  clearTestDatabase,
} from "../test/integration-db";
import {
  createUserInvitationService,
  createUserPasswordLinkService,
  completeUserOnboardingService,
  getUserOnboardingSummary,
  revokeUserSessionsService,
  setUserEnabledService,
  updateUserRoleService,
} from "./user.service";
import { loginService } from "./auth.service";
import {
  verifyAccessToken,
} from "./auth-token.service";

beforeEach(async () => {
  await clearTestDatabase();
});

afterAll(async () => {
  await clearTestDatabase();
  await prisma.$disconnect();
});

async function createFirmAdmin() {
  const firm = await prisma.firm.create({
    data: {
      name: "Staff Lifecycle Test Firm",
    },
  });
  const now = new Date();
  const admin = await prisma.user.create({
    data: {
      name: "Primary Admin",
      email: "admin@example.com",
      passwordHash:
        await Bun.password.hash("AdminPassword123!"),
      role: "ADMIN",
      status: "ACTIVE",
      activatedAt: now,
      passwordChangedAt: now,
      firmId: firm.id,
    },
  });

  return { firm, admin };
}

describe("staff onboarding lifecycle", () => {
  test("invitation is hashed, single-use, and activates login", async () => {
    const { firm, admin } = await createFirmAdmin();
    const invitation = await createUserInvitationService({
      firmId: firm.id,
      actorUserId: admin.id,
      name: "Portfolio Manager",
      email: "Manager@Example.com",
      role: "PORTFOLIO_MANAGER",
    });

    const stored =
      await prisma.userOnboardingToken.findFirstOrThrow({
        where: {
          userId: invitation.user.id,
          type: "INVITATION",
        },
      });

    expect(stored.tokenHash).not.toBe(invitation.token);
    expect(stored.tokenHash).toBe(
      createHash("sha256")
        .update(invitation.token)
        .digest("hex"),
    );
    expect(invitation.user.status).toBe("INVITED");

    await expect(
      loginService(
        "manager@example.com",
        "SecurePassword123!",
      ),
    ).rejects.toThrow("ACCOUNT_SETUP_REQUIRED");

    expect(
      await getUserOnboardingSummary(invitation.token),
    ).toMatchObject({
      type: "INVITATION",
      email: "manager@example.com",
    });

    await completeUserOnboardingService(
      invitation.token,
      "SecurePassword123!",
    );

    const activated = await prisma.user.findUniqueOrThrow({
      where: { id: invitation.user.id },
    });
    expect(activated.status).toBe("ACTIVE");
    expect(activated.activatedAt).not.toBeNull();
    expect(activated.passwordChangedAt).not.toBeNull();
    expect(
      await Bun.password.verify(
        "SecurePassword123!",
        activated.passwordHash!,
      ),
    ).toBe(true);

    const login = await loginService(
      "manager@example.com",
      "SecurePassword123!",
    );
    expect(login.user.role).toBe("PORTFOLIO_MANAGER");

    await expect(
      completeUserOnboardingService(
        invitation.token,
        "AnotherPassword123!",
      ),
    ).rejects.toThrow("USER_ONBOARDING_LINK_EXPIRED");
  });

  test("password reset and explicit revocation invalidate prior sessions", async () => {
    const { firm, admin } = await createFirmAdmin();
    const initialLogin = await loginService(
      admin.email,
      "AdminPassword123!",
    );
    const initialClaims = await verifyAccessToken(
      initialLogin.token,
    );

    const reset = await createUserPasswordLinkService(
      admin.id,
      firm.id,
      admin.id,
    );
    await completeUserOnboardingService(
      reset.token,
      "ChangedPassword123!",
    );

    const afterReset = await prisma.user.findUniqueOrThrow({
      where: { id: admin.id },
    });
    expect(afterReset.sessionVersion).toBe(
      initialClaims.sessionVersion! + 1,
    );

    const newLogin = await loginService(
      admin.email,
      "ChangedPassword123!",
    );
    const newClaims = await verifyAccessToken(newLogin.token);

    await revokeUserSessionsService(
      admin.id,
      firm.id,
      admin.id,
    );
    const afterRevocation = await prisma.user.findUniqueOrThrow({
      where: { id: admin.id },
    });
    expect(afterRevocation.sessionVersion).toBe(
      newClaims.sessionVersion! + 1,
    );
  });

  test("protects self-management and the last active administrator", async () => {
    const { firm, admin } = await createFirmAdmin();
    const operator = await prisma.user.create({
      data: {
        name: "Operator",
        email: "operator@example.com",
        passwordHash:
          await Bun.password.hash("OperatorPassword123!"),
        role: "OPERATIONS",
        status: "ACTIVE",
        firmId: firm.id,
      },
    });

    await expect(
      updateUserRoleService(
        admin.id,
        firm.id,
        "VIEWER",
        admin.id,
      ),
    ).rejects.toThrow("SELF_ROLE_CHANGE_NOT_ALLOWED");

    await expect(
      setUserEnabledService(
        admin.id,
        firm.id,
        false,
        admin.id,
      ),
    ).rejects.toThrow("SELF_DISABLE_NOT_ALLOWED");

    await expect(
      updateUserRoleService(
        admin.id,
        firm.id,
        "VIEWER",
        operator.id,
      ),
    ).rejects.toThrow("LAST_ACTIVE_ADMIN_REQUIRED");

    await expect(
      setUserEnabledService(
        admin.id,
        firm.id,
        false,
        operator.id,
      ),
    ).rejects.toThrow("LAST_ACTIVE_ADMIN_REQUIRED");
  });

  test("disabling an invited account invalidates its setup link", async () => {
    const { firm, admin } = await createFirmAdmin();
    const invitation = await createUserInvitationService({
      firmId: firm.id,
      actorUserId: admin.id,
      name: "Invited Viewer",
      email: "viewer@example.com",
      role: "VIEWER",
    });

    await setUserEnabledService(
      invitation.user.id,
      firm.id,
      false,
      admin.id,
    );
    await setUserEnabledService(
      invitation.user.id,
      firm.id,
      true,
      admin.id,
    );

    await expect(
      getUserOnboardingSummary(invitation.token),
    ).rejects.toThrow("USER_ONBOARDING_LINK_EXPIRED");
  });
});
