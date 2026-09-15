import { prisma } from "@pms-oms/db";
import { createAuditLog } from "./audit.service";

export async function cancelOrderService(
  orderId: string,
) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  if (order.status === "FILLED") {
    throw new Error("ORDER_ALREADY_FILLED");
  }

  if (order.status === "CANCELLED") {
    throw new Error("ORDER_ALREADY_CANCELLED");
  }

  if (order.status === "REJECTED") {
    throw new Error("ORDER_ALREADY_REJECTED");
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      status: "CANCELLED",
    },
  });

  await createAuditLog({
    action: "ORDER_CANCELLED",
    entityType: "ORDER",
    entityId: order.id,
    message: "Order cancelled",
    metadata: {
      previousStatus: order.status,
    },
  });

  return updatedOrder;
}