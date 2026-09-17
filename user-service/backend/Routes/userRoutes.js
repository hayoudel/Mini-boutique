import express from "express";
import {createUserControllers,getAllUsersControllers,getUserByIdController,updateUserController,deleteUserController} from "../Controllers/userControllers.js";
const router = express.Router();

router.post("/", createUserControllers);
router.get("/",getAllUsersControllers);
router.get("/:id",getUserByIdController);
router.put("/:id",updateUserController);
router.delete("/:id",deleteUserController);


export default router;