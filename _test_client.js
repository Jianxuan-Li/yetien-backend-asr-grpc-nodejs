import path from 'path';
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const __dirname = path.resolve();
let packageDefinition = protoLoader.loadSync(path.join(__dirname, "server", "asrserver.proto"));
let asrProto = grpc.loadPackageDefinition(packageDefinition).asrserver;

let client = new asrProto.Asr(
  "localhost:9000",
  grpc.credentials.createInsecure()
);

function main() {
  let request = {
    speakingId: "testetstet",
    objectId: "sample1.flac",
  }

  const successed = (err, resp) => {
    console.log("Error:", err);
    console.log("Greeting:", resp);
  }

  client.runAsr(request, successed);
}

main();