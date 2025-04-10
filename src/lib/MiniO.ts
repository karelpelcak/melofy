import { Client as MinioClient } from "minio";
import {MINIO} from "@/lib/ENV";

const minioClient = new MinioClient({
    endPoint: MINIO.SERVER,
    port: MINIO.PORT,
    useSSL: false,
    accessKey: MINIO.USERNAME,
    secretKey: MINIO.PASSWORD,
});

const bucketName = "uploads";

async function ensureBucketExists() {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
        await minioClient.makeBucket(bucketName, "us-east-1"); // Region doesn't really matter in local MinIO
        console.log(`Bucket "${bucketName}" created.`);
    } else {
        console.log(`Bucket "${bucketName}" already exists.`);
    }
}

export { minioClient, bucketName, ensureBucketExists };
