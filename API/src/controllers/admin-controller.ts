import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdminTokenLogin = (id: string) => {
  if (!process.env.SECRET) {
    throw new Error("SECRET key is not defined in environment variables");
  }
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "1500s",
  });
};

export const signInAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      if (user.role === "ADMIN") {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = createAdminTokenLogin(user.id);
          res.status(200).json({ user, token });
        } else {
          res
            .status(400)
            .json({ message: "Mauvaise adresse e-mail ou mot de passe" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Vous n'avez pas accès à l'espace administrateur" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Mauvaise adresse e-mail ou mot de passe" });
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({
        message: "erreur serveur",
        error: error.message,
      });
    }
  }
};
