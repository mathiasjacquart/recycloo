import express from "express";
import { signInUser, signupUser } from "../controllers/users-controllers";
signInUser;
import { verifyMail } from "../controllers/users-controllers";
import { validateSignIn, validateSignUp } from "../middleware/users-middleware";
const router = express.Router();

// Routes d'authentification

router.post("/signup", validateSignUp, signupUser);
router.post("/signin", validateSignIn, signInUser);
// router.post("/forgotten-password", forgottenPassword)
router.get("/verifyMail/:token", verifyMail);
// router.get("/resetPassword/:token" , verifyResetPassword)
// router.put("/resetPassword/:id", resetPassword)

// Routes CRUD USER

// router.get("/", getUsers); // GET all users
// router.get("/:id", getUser); // GET single user by ID
// router.put("/:id", updateUser); // UPDATE user by ID
// router.delete("/:id", deleteUser); // DELETE user by ID
// router.post("/", createUser);
export default router;
