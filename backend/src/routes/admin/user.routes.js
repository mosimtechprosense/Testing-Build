import express from "express";
import { auth } from "../../middlewares/admin/auth.middleware.js";
import { onlyAdmin } from "../../middlewares/admin/user.middleware.js";
import { createUserController, listUsersController, updateUserController, deleteUserController, adminResetPasswordController } from "../../controllers/admin/user.controller.js";

const router = express.Router();

router.use(auth, onlyAdmin); // Protected for ADMIN only

router.post("/", createUserController);
router.get("/", listUsersController);
router.put("/:id", updateUserController);
router.put("/:id/reset-password", adminResetPasswordController);
router.delete("/:id", deleteUserController);

export default router;