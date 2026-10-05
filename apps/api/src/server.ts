import app from "./app";
import {
  startOrderMonitor,
  stopOrderMonitor,
} from "./services/order-monitor.service";
import {
  startOrderExecutionWorker,
  stopOrderExecutionWorker,
} from "./services/order-execution-worker.service";

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

function shutdown() {
  stopOrderExecutionWorker();
  stopOrderMonitor();

  clearInterval(
    serverKeepAlive,
  );

  server.close(() => {
    process.exit(0);
  });
}

process.on(
  "SIGTERM",
  shutdown,
);

process.on(
  "SIGINT",
  shutdown,
);
