import type {
  Response,
} from "express";

export type LiveUpdateEvent = {
  type: string;
  entityType: string;
  entityId: string;
  occurredAt?: string;
};

const clientsByFirm =
  new Map<
    string,
    Set<Response>
  >();

function writeEvent(
  response: Response,
  event: LiveUpdateEvent,
) {
  const payload = {
    ...event,
    occurredAt:
      event.occurredAt ??
      new Date().toISOString(),
  };

  response.write(
    `event: ${event.type}\n`,
  );

  response.write(
    `data: ${JSON.stringify(
      payload,
    )}\n\n`,
  );
}

export function publishLiveUpdate(
  firmId: string,
  event: LiveUpdateEvent,
) {
  const clients =
    clientsByFirm.get(
      firmId,
    );

  if (!clients) {
    return;
  }

  for (
    const response of clients
  ) {
    if (
      response.writableEnded ||
      response.destroyed
    ) {
      clients.delete(
        response,
      );

      continue;
    }

    writeEvent(
      response,
      event,
    );
  }

  if (
    clients.size === 0
  ) {
    clientsByFirm.delete(
      firmId,
    );
  }
}

export function subscribeLiveUpdates(
  firmId: string,
  response: Response,
) {
  response.status(200);

  response.set({
    "Content-Type":
      "text/event-stream",

    "Cache-Control":
      "no-cache, no-transform",

    Connection:
      "keep-alive",

    "X-Accel-Buffering":
      "no",
  });

  response.flushHeaders();

  let clients =
    clientsByFirm.get(
      firmId,
    );

  if (!clients) {
    clients =
      new Set<Response>();

    clientsByFirm.set(
      firmId,
      clients,
    );
  }

  clients.add(
    response,
  );

  writeEvent(
    response,
    {
      type:
        "stream.connected",

      entityType:
        "FIRM",

      entityId:
        firmId,
    },
  );

  const heartbeat =
    setInterval(
      () => {
        if (
          response.writableEnded ||
          response.destroyed
        ) {
          return;
        }

        response.write(
          ": heartbeat\n\n",
        );
      },

      25_000,
    );

  const cleanup = () => {
    clearInterval(
      heartbeat,
    );

    const currentClients =
      clientsByFirm.get(
        firmId,
      );

    currentClients?.delete(
      response,
    );

    if (
      currentClients?.size ===
      0
    ) {
      clientsByFirm.delete(
        firmId,
      );
    }
  };

  response.on(
    "close",
    cleanup,
  );
}
