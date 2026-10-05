import {
  prisma,
} from "@pms-oms/db";

export async function enqueueOrderExecution(
  orderId: string,
  firmId: string,
) {
  const order =
    await prisma.order.findFirst({
      where: {
        id: orderId,

        portfolio: {
          client: {
            firmId,
          },
        },
      },
    });

  if (!order) {
    throw new Error(
      "ORDER_NOT_FOUND",
    );
  }

  if (
    order.status !== "PENDING" &&
    order.status !== "SUBMITTED"
  ) {
    throw new Error(
      "ORDER_NOT_PENDING",
    );
  }

  return prisma.executionJob.upsert({
    where: {
      orderId,
    },

    update: {},

    create: {
      orderId,
      status: "PENDING",
    },
  });
}