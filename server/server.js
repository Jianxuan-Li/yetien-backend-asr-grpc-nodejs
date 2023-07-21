import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

import { runTask } from "./task.js";

// current directory
const __dirname = path.resolve();
let packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "server", "asrserver.proto"),
  { keepCase: true, defaults: true, oneofs: true }
);
let asrProto = grpc.loadPackageDefinition(packageDefinition).asrserver;

async function runAsr(call, callback) {
  let stime = performance.now(); // start time
  console.log("Asr task received from client: ");
  console.log("speaking id", call.request.speakingId);
  console.log(call.request.objectId);

  try {
    let result = await runTask(call.request.objectId);
    console.log("result", result.data)

    let resp = {
      status: true,
      text: result.data,
      duration: 0,
      error: "",
    };

    let etime = performance.now(); // end time
    console.log("Asr task completed");
    resp.duration = (etime - stime) / 1000;
    console.log("duration", resp.duration);
    callback(null, resp);
  } catch (error) {
    let resp = {
      status: false,
      text: "",
      duration: 0,
      error: error,
    };
    callback(error, resp);
  }
}

export default function main() {
  var server = new grpc.Server();
  server.addService(asrProto.Asr.service, {
    runAsr: runAsr,
  });
  server.bindAsync(
    "0.0.0.0:9000",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("Server running at 0.0.0.0:9000");
    }
  );
}
