import { prisma } from "@pms-oms/db";

import {
  createAccessToken,
} from "./auth-token.service";

export async function loginService(
  email: string,
  password: string,
) {
  const user =
    await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

  if (!user) {
    throw new Error(
      "INVALID_CREDENTIALS",
    );
  }

  const passwordValid =
    await Bun.password.verify(
      password,
      user.passwordHash,
    );

  if (!passwordValid) {
    throw new Error(
      "INVALID_CREDENTIALS",
    );
  }

  const token =
    await createAccessToken({
      userId: user.id,
      firmId: user.firmId,
      role: user.role,
    });

  return {
    token,

    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      firmId: user.firmId,
    },
  };
}
