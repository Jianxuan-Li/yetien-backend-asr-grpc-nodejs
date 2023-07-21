import server from "./server/server.js";

const port = process.env.PORT || 9000;
const address = `0.0.0.0:${port}`;
server(address);