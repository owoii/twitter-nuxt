import { Prisma } from "@prisma/client";
import prisma from ".";
export const createMediaFile = (mediaFile: Prisma.MediaFileCreateInput) => {
	return prisma.mediaFile.create({
		data: mediaFile
	})
}