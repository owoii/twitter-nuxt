import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 暴露 prisma 的客户端
export { prisma };
export default prisma;
