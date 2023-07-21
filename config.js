import dotenv from "dotenv";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

export const config = {
    basepath: path.join(__dirname),
    model0: {
        url: process.env.YETIEN_DEV_MODEL_0_ADDR,
        user: process.env.YETIEN_DEV_MODEL_0_USER,
        pwd: process.env.YETIEN_DEV_MODEL_0_PWD,
    },
    aws: {
        bucket: process.env.AWS_STORAGE_BUCKET_NAME,
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        endpoint: process.env.AWS_S3_ENDPOINT_URL,
        region: process.env.AWS_S3_REGION_NAME,
    }
};