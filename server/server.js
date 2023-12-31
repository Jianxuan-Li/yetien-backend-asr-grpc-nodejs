import path from "path";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import moment from "moment";

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
  
  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(`Task: ${call.request.speakingId} ${call.request.objectId} ${currentTime}`);

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
    resp.duration = (etime - stime) / 1000;
    resp.duration = Math.round(resp.duration * 100) / 100;
    console.log(`Task completed. Duration: ${resp.duration} seconds`);
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

export default function main(address) {
  var server = new grpc.Server();
  server.addService(asrProto.Asr.service, {
    runAsr: runAsr,
  });
  server.bindAsync(
    address,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("Server running at " + address);
    }
  );
}
