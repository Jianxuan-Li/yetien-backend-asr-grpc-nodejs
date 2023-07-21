import { post } from "../server/request.js";
import { config } from "../config.js";
import { download } from "../server/s3.js";
import { runTask } from "../server/task.js";

test("download file and post to ASR model", async () => {
  const buffer = await download("sample1.flac");
  expect(buffer).not.toBeNull();
  expect(buffer.length).toBeGreaterThan(0);

  const fileBlob = new Blob([buffer]);

  const result = await post(fileBlob, "sample1.flac", { ...config.model0 });
  expect(result.status).toBe(200);
  expect(result.data).not.toBeNull();
  expect(result.data).toMatch(/^going/);
}, 600000);

test("run task", async () => {
  const result = await runTask("sample1.flac");
  expect(result.status).toBe(200);
  expect(result.data).not.toBeNull();
  expect(result.data).toMatch(/^going/);
}, 900000);
