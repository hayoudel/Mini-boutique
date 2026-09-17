import express from "express";

import { createOrderItemController,getAllOrderItemsController,getOrderItemByIdController,updateOrderItemController,deleteOrderItemController} from "../Controllers/orderItemControllers.js";

const router = express.Router();



router.post( "/:orderId",createOrderItemController);
router.get( "/:orderId",getAllOrderItemsController);
router.get("/:id", getOrderItemByIdController);
router.patch("/:id",updateOrderItemController);
router.delete("/:id", deleteOrderItemController);


export default router;