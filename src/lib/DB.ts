import { PrismaClient } from "@/generated/prisma";
import {DATABASE} from "@/lib/ENV";

export const DB = new PrismaClient({
    datasources: {
        db: {
            url: DATABASE.URL,
        }
    }
});
