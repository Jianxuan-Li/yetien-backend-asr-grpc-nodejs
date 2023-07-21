import { config } from "../config.js";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const download = async (objectId) => {
  const s3Client = new S3Client({
    region: config.aws.region,
    credentials: {
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    },
  });

  const command = new GetObjectCommand({
    Bucket: config.aws.bucket,
    Key: objectId,
  });

  try {
    const response = await s3Client.send(command);
    const buffer = await new Promise((resolve, reject) => {
      const chunks = [];
      response.Body.on("data", (chunk) => chunks.push(chunk));
      response.Body.on("error", reject);
      response.Body.on("end", () => resolve(Buffer.concat(chunks)));
    });
    return buffer;
  } catch (error) {
    return { error: error };
  }
};
