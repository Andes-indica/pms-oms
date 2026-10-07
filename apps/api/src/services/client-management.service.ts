import {
  prisma,
} from "@pms-oms/db";

type ClientInput = {
  name: string;
  email?: string | null;
};

function normalizeClientInput(
  input: ClientInput,
) {
  const name =
    input.name
      ?.trim();

  const email =
    input.email
      ?.trim() ||
    null;

  if (!name) {
    throw new Error(
      "CLIENT_NAME_REQUIRED",
    );
  }

  return {
    name,
    email,
  };
}

export async function createClientService(
  firmId: string,
  input: ClientInput,
) {
  const data =
    normalizeClientInput(
      input,
    );

  return prisma.client.create({
    data: {
      firmId,
      ...data,
    },
  });
}

export async function updateClientService(
  clientId: string,
  firmId: string,
  input: ClientInput,
) {
  const existing =
    await prisma.client.findFirst({
      where: {
        id: clientId,
        firmId,
      },
      select: {
        id: true,
      },
    });

  if (!existing) {
    throw new Error(
      "CLIENT_NOT_FOUND",
    );
  }

  const data =
    normalizeClientInput(
      input,
    );

  return prisma.client.update({
    where: {
      id: clientId,
    },
    data,
  });
}

export async function deleteClientService(
  clientId: string,
  firmId: string,
) {
  const client =
    await prisma.client.findFirst({
      where: {
        id: clientId,
        firmId,
      },
      include: {
        brokerAccounts: {
          select: {
            id: true,
          },
        },
        portfolios: {
          select: {
            id: true,
          },
        },
      },
    });

  if (!client) {
    throw new Error(
      "CLIENT_NOT_FOUND",
    );
  }

  if (
    client.brokerAccounts.length >
      0 ||
    client.portfolios.length >
      0
  ) {
    throw new Error(
      "CLIENT_NOT_EMPTY",
    );
  }

  await prisma.client.delete({
    where: {
      id: client.id,
    },
  });

  return {
    id: client.id,
    deleted: true,
  };
}
