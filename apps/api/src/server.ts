import {
  prisma,
} from "@pms-oms/db";
import app from "./app";
import {
  startOrderMonitor,
  stopOrderMonitor,
} from "./services/order-monitor.service";
import {
  startOrderExecutionWorker,
  stopOrderExecutionWorker,
} from "./services/order-execution-worker.service";
import {
  closeLiveUpdateStreams,
} from "./services/live-update.service";
import {
  validateRuntimeConfig,
} from "./services/runtime-config.service";

import {
  validateRuntimeDependencies,
} from "./services/runtime-readiness.service";

validateRuntimeConfig();

await validateRuntimeDependencies();

const PORT = Number(process.env.PORT) || 3000;

export const server = app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`,
); 
if (
  process.env
    .ORDER_EXECUTION_WORKER_ENABLED !==
  "false"
) {
  startOrderExecutionWorker();

  console.log(
    "Order execution worker started",
  );
}

if(process.env.ORDER_MONITOR_ENABLED !=="false"){
  startOrderMonitor();
  console.log("Order moniter started",

  );
}
});
server.ref();

// Bun 1.3 can unref node:http servers used by Express and exit immediately.
// Keep one referenced handle until that runtime issue is fixed.
export const serverKeepAlive = setInterval(() => {}, 2_147_483_647);

let shuttingDown = false;

function getShutdownTimeoutMs() {
  const configured =
    Number(
      process.env
        .SHUTDOWN_TIMEOUT_MS,
    );

  return Number.isInteger(
    configured,
  ) && configured >= 5_000 &&
    configured <= 120_000
    ? configured
    : 30_000;
}

async function shutdown(
  signal: string,
) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  console.log(
    `Received ${signal}; shutting down safely`,
  );

  clearInterval(
    serverKeepAlive,
  );

  const forceTimer =
    setTimeout(
      () => {
        console.error(
          "Graceful shutdown timed out",
        );

        process.exit(1);
      },
      getShutdownTimeoutMs(),
    );

  const serverClosed =
    new Promise<void>(
      (resolve, reject) => {
        server.close(
          (error?: Error) => {
            if (error) {
              reject(error);

              return;
            }

            resolve();
          },
        );
      },
    );

  closeLiveUpdateStreams();

  let shutdownFailed =
    false;

  try {
    await Promise.all([
      stopOrderExecutionWorker(),
      stopOrderMonitor(),
      serverClosed,
    ]);
  } catch (error) {
    shutdownFailed = true;

    console.error(
      "Graceful shutdown failed:",
      error,
    );
  }

  try {
    await prisma.$disconnect();
  } catch (error) {
    shutdownFailed = true;

    console.error(
      "Database disconnect failed:",
      error,
    );
  }

  process.exitCode =
    shutdownFailed ? 1 : 0;

  clearTimeout(
    forceTimer,
  );
}

process.on(
  "SIGTERM",
  () => {
    void shutdown(
      "SIGTERM",
    );
  },
);

process.on(
  "SIGINT",
  () => {
    void shutdown(
      "SIGINT",
    );
  },
);
