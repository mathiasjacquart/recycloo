import { PrismaClient } from "@prisma/client"; // Si tu utilises Prisma
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("Klomat204*", 10);

    const adminUser = await prisma.user.create({
      data: {
        email: "admin@admin.fr",
        firstname: "Admin",
        surname: "User",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Administrateur créé avec succès :", adminUser);
  } catch (error) {
    console.error("Erreur lors de la création de l'administrateur :", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
