import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}
//vou usar para chamar meu banco de dados
export const db = prisma;

//aqui garante que sempre vai ter 1 conexão com o banco de dados
//se não tiver ele cria uma nova conexão, mesmo em desenvolvimento
//se tiver ele usa a conexão que já existe
