import { post } from "./request.js";
import { download } from "./s3.js";
import { config } from "../config.js";

export const asrRequest = async (objectId) => {
  const buffer = await download(objectId);
  const fileBlob = new Blob([buffer]);
  try {
    return await post(fileBlob, objectId, { ...config.model0 });
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const runTask = async (objectId) => {
  const result = await asrRequest(objectId);
  return result;
};
