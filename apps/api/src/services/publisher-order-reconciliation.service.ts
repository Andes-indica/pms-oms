import {
  prisma,
} from "@pms-oms/db";

import {
  syncOrderService,
} from "./order-sync.service";

type ReconciliationStatus =
  | "SUBMITTED"
  | "OPEN"
  | "PARTIALLY_FILLED"
  | "FILLED"
  | "CANCELLED"
  | "REJECTED";

const RECONCILABLE_STATUSES: readonly ReconciliationStatus[] = [
  "SUBMITTED",
  "OPEN",
  "PARTIALLY_FILLED",
  "FILLED",
  "CANCELLED",
  "REJECTED",
];

type ReconcilePublisherOrderInput = {
  orderId: string;
  firmId: string;
  actorUserId: string;
  brokerOrderId: unknown;
  status: unknown;
  filledQuantity: unknown;
  averageFillPrice: unknown;
  rejectionReason?: unknown;
  notes?: unknown;
};

function normalizeRequiredText(
  value: unknown,
  error: string,
  maxLength: number,
) {
  if (
    typeof value !== "string" ||
    !value.trim() ||
    value.trim().length > maxLength
  ) {
    throw new Error(error);
  }

  return value.trim();
}

function normalizeOptionalText(
  value: unknown,
  maxLength: number,
) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return undefined;
  }

  if (
    typeof value !== "string" ||
    value.trim().length > maxLength
  ) {
    throw new Error(
      "INVALID_RECONCILIATION_NOTES",
    );
  }

  return value.trim() || undefined;
}

export async function reconcilePublisherOrderService(
  input: ReconcilePublisherOrderInput,
) {
  const order =
    await prisma.order.findFirst({
      where: {
        id: input.orderId,
        portfolio: {
          client: {
            firmId:
              input.firmId,
          },
        },
      },
      include: {
        clientConfirmation: true,
      },
    });

  if (!order) {
    throw new Error(
      "ORDER_NOT_FOUND",
    );
  }

  if (
    order.executionMode !==
      "CLIENT_CONFIRMATION" ||
    order.clientConfirmation
      ?.status !== "CONFIRMED"
  ) {
    throw new Error(
      "PUBLISHER_ORDER_NOT_CONFIRMED",
    );
  }

  if (
    [
      "FILLED",
      "CANCELLED",
      "REJECTED",
    ].includes(order.status)
  ) {
    throw new Error(
      "ORDER_ALREADY_TERMINAL",
    );
  }

  const brokerOrderId =
    normalizeRequiredText(
      input.brokerOrderId,
      "INVALID_BROKER_ORDER_ID",
      100,
    );

  if (
    order.brokerOrderId &&
    order.brokerOrderId !==
      brokerOrderId
  ) {
    throw new Error(
      "BROKER_ORDER_ID_MISMATCH",
    );
  }

  const duplicate =
    await prisma.order.findFirst({
      where: {
        brokerOrderId,
        id: {
          not: order.id,
        },
      },
      select: {
        id: true,
      },
    });

  if (duplicate) {
    throw new Error(
      "BROKER_ORDER_ID_ALREADY_LINKED",
    );
  }

  if (
    typeof input.status !==
      "string" ||
    !RECONCILABLE_STATUSES.includes(
      input.status as ReconciliationStatus,
    )
  ) {
    throw new Error(
      "INVALID_RECONCILIATION_STATUS",
    );
  }

  const status =
    input.status as ReconciliationStatus;
  const filledQuantity =
    Number(input.filledQuantity);

  if (
    !Number.isInteger(
      filledQuantity,
    ) ||
    filledQuantity <
      order.filledQuantity ||
    filledQuantity >
      order.quantity
  ) {
    throw new Error(
      "INVALID_FILL_QUANTITY",
    );
  }

  if (
    status === "PARTIALLY_FILLED" &&
    (
      filledQuantity <= 0 ||
      filledQuantity >= order.quantity
    )
  ) {
    throw new Error(
      "INVALID_FILL_QUANTITY",
    );
  }

  if (
    status === "FILLED" &&
    filledQuantity !== order.quantity
  ) {
    throw new Error(
      "INVALID_FILL_QUANTITY",
    );
  }

  if (
    ["SUBMITTED", "OPEN"].includes(
      status,
    ) &&
    filledQuantity > 0
  ) {
    throw new Error(
      "INVALID_FILL_QUANTITY",
    );
  }

  const averageFillPrice =
    filledQuantity > 0
      ? Number(
          input.averageFillPrice,
        )
      : null;

  if (
    filledQuantity > 0 &&
    (
      !Number.isFinite(
        averageFillPrice,
      ) ||
      averageFillPrice === null ||
      averageFillPrice <= 0
    )
  ) {
    throw new Error(
      "INVALID_FILL_PRICE",
    );
  }

  const rejectionReason =
    status === "REJECTED"
      ? normalizeRequiredText(
          input.rejectionReason,
          "REJECTION_REASON_REQUIRED",
          1_000,
        )
      : normalizeOptionalText(
          input.rejectionReason,
          1_000,
        );

  const notes =
    normalizeOptionalText(
      input.notes,
      2_000,
    );

  return syncOrderService(
    order.id,
    input.firmId,
    input.actorUserId,
    {
      brokerUpdate: {
        brokerOrderId,
        status,
        filledQuantity,
        averageFillPrice,
        statusMessage:
          rejectionReason,
      },
      brokerExecutions: null,
      source:
        "MANUAL_PUBLISHER_RECONCILIATION",
      reconciliationNotes:
        notes,
    },
  );
}
