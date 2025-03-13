import express from "express";
import { signInAdmin } from "../controllers/admin-controller";
import { validateAdminSignIn } from "../middleware/users-middleware";
import exp from "constants";

const router = express.Router();

router.post("/signin", validateAdminSignIn, signInAdmin);

export default router;
