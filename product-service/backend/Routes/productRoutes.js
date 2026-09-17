import express from "express";
import {creatProductsControllers,getAllProductsControllers,getByIdProductsControllers,updateProductsControllers,deleteProductsControllers,decreaseStockController} from "../Controllers/productControllers.js";
const router = express.Router();

router.post("/", creatProductsControllers);
router.get("/",getAllProductsControllers);
router.get("/:id",getByIdProductsControllers);
router.put("/:id",updateProductsControllers);
router.delete("/:id",deleteProductsControllers);
router.patch("/stock/:id",decreaseStockController);

export default router;