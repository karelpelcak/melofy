import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return new Response("Error: No file uploaded", { status: 400 });
        }

        console.log(JSON.stringify({
            name: file.name,
            size: file.size,
            type: file.type,
            }));

        return new Response(
            JSON.stringify({
                success: true,
                filename: file.name,
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
        console.error(error);
        return new Response("Error uploading file", { status: 500 });
    }
}
