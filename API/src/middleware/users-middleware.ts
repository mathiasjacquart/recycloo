import { NextFunction, Response, Request } from "express";
import { z } from "zod";
// name      String
// email     String   @unique
// password  String
// role      Role     @default(CLIENT)
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// orders    Order[]
// reviews   Review[]
const userSchema = z.object({
  email: z.string().email(),
  firstname: z.string().max(12).default(""),
  surname: z.string().max(12).default(""),
  password: z.string().min(8),
  role: z.enum(["CLIENT", "ADMIN"]).default("CLIENT"),
  orders: z.array(z.string()).optional().default([]),
  reviews: z.array(z.string()).optional().default([]),
});

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(req.body);
  try {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ errors: result.error.errors });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur" });
    return;
  }
};
export const validateSignIn = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(req.body);
  try {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ errors: result.error.errors });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Erreur interne du serveur" });
    return;
  }
};
