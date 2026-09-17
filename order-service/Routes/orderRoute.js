import express from "express";
import { createOrderController,getAllOrderControllers,getByIdOrderControllers,updateOrderControllers,deleteOrderControllers } from "../Controllers/orderControllers.js";

const router = express.Router();

router.post("/", createOrderController);
router.get("/",getAllOrderControllers);
router.get("/:id",getByIdOrderControllers);
router.patch("/:id",updateOrderControllers);
router.get("/:id",deleteOrderControllers)

export default router;