import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

export const server = app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

server.ref();

// Bun 1.3 can unref node:http servers used by Express and exit immediately.
// Keep one referenced handle until that runtime issue is fixed.
export const serverKeepAlive = setInterval(() => {}, 2_147_483_647);
