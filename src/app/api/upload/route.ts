import { NextRequest } from "next/server";
import {bucketName, ensureBucketExists, minioClient} from "@/lib/MiniO";
import {DB} from "@/lib/DB";

export async function POST(req: NextRequest) {
    try {
        await ensureBucketExists();

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return new Response("Error: No file uploaded", { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const objectName = file.name;
        await minioClient.putObject(bucketName, objectName, buffer);


        const url = await minioClient.presignedGetObject(bucketName, objectName, 60 * 60 * 24 * 7); // 7 dni

        const song = await DB.song.create({
            data: {
                file: file.name,
                url: url,
            }
        })

        if (!song) {
            return new Response("Error: Song data not inserted", { status: 400 });
        }

        return new Response(
            JSON.stringify({
                success: true,
                filename: file.name,
                uploadedAs: objectName,
                size: file.size,
                type: file.type,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("MinIO Upload Error:", error);
        return new Response("Error uploading file", { status: 500 });
    }
}
