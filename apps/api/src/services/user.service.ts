import { prisma } from "@pms-oms/db";

type UserRole =
  | "ADMIN"
  | "PORTFOLIO_MANAGER"
  | "OPERATIONS"
  | "VIEWER";

type CreateUserInput = {
  firmId: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export async function createUserService(
  input: CreateUserInput,
) {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const passwordHash =
    await Bun.password.hash(
      input.password,
    );

  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
      firmId: input.firmId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      firmId: true,
      createdAt: true,
    },
  });
}
export async function getUsersService(
  firmId: string,
) {
  return prisma.user.findMany({
    where: {
      firmId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      firmId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function updateUserRoleService(
  userId: string,
  firmId: string,
  role: UserRole,
) {
  const user =
    await prisma.user.findFirst({
      where: {
        id: userId,
        firmId,
      },
    });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      firmId: true,
      updatedAt: true,
    },
  });
}