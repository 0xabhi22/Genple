"use server";
import { prisma } from "@/lib/prisma";

export default async function getSummary(recordingId: string) {
    try {
        const magicRecaps = await prisma.magicRecaps.findFirstOrThrow({
            where: {
                recordingId
            }
        });
        console.log(magicRecaps)
        return magicRecaps;
    } catch (error) {
        console.error(error);
        return null;
    }
}