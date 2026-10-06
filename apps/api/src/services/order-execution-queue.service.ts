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

  const existingJob =
    await prisma.executionJob
      .findUnique({
        where: {
          orderId,
        },
      });

  if (existingJob) {
    if (
      existingJob.status ===
      "FAILED"
    ) {
      return prisma.executionJob
        .update({
          where: {
            id: existingJob.id,
          },

          data: {
            status: "PENDING",
            attempts: 0,
            lastError: null,
            availableAt:
              new Date(),
            lockedAt: null,
          },
        });
    }

    return existingJob;
  }

  return prisma.executionJob.create({
    data: {
      orderId,
      status: "PENDING",
    },
  });
}