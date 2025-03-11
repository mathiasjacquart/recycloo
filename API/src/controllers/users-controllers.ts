import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { z } from "zod";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { log } from "console";
import {
  sendValidationAccount,
  sendInvalidToken,
  sendConfirmationEmail,
} from "../email/email";

const prisma = new PrismaClient();

//TOKENS

const createTokenEmail = (email: string) => {
  if (!process.env.SECRET) {
    throw new Error("SECRET key is not defined in environment variables");
  }
  return jwt.sign({ email }, process.env.SECRET, {
    expiresIn: "300s",
  });
};
const createTokenLogin = (id: string) => {
  if (!process.env.SECRET) {
    throw new Error("SECRET key is not defined in environment variables");
  }
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "600s",
  });
};

// SIGNUP CONTROLLER
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      const token = createTokenEmail(email);
      await sendConfirmationEmail(email, token);
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(password, salt);
      await prisma.user.create({
        data: {
          email,
          password: hashpwd,
          token: token,
        },
      });
      res.status(200).json({
        message: "Veuillez confirmez votre inscription dans votre boite mail",
        status: 200,
      });
      return;
    } else {
      res.status(400).json({ message: "Email déjà utilisé" });
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({
        message: "erreur serveur",
        error: error.message,
      });
    }
  }
};

export const verifyMail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    console.log(token);
    if (!process.env.SECRET) {
      throw new Error("Secret key is not defined");
    }
    const user = await prisma.user.findFirst({
      where: { token },
    });
    if (!user) {
      res.status(400).json({
        message: "Token déjà validé ou inexistant.",
        status: 400,
      });
      return;
    }
    const decoded = jwt.verify(token, process.env.SECRET, {
      ignoreExpiration: true,
    }) as { email: string; exp: number };

    if (decoded.exp * 1000 > Date.now()) {
      // Token valide → on valide le compte
      await prisma.user.update({
        where: { email: decoded.email },
        data: { token: null, isVerified: true },
      });

      await sendValidationAccount(decoded.email);
      res.redirect("http://localhost:5173/");
      return;
    } else {
      // Token expiré → suppression de l'utilisateur
      await prisma.user.delete({
        where: { email: decoded.email },
      });
      await sendInvalidToken(decoded.email);
      res.status(400).json({
        message: "Token non valide ou expiré",
        status: 400,
      });
      return;
    }
  } catch (error) {
    console.error("Erreur dans verifyMail:", error);
    res.status(500).json({
      message: "Erreur interne du serveur",
      status: 500,
    });
    return;
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      if (user.isVerified) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = createTokenLogin(user.id);
          res.status(200).json({ user, token });
        } else {
          res
            .status(400)
            .json({ message: "Mauvaise adresse e-mail ou mot de passe" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Vous n'avez pas validé votre compte" });
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
