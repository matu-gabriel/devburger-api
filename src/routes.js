import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";
import multer from "multer";
import multerConfig from "./config/multer";
import authMiddleware from "./app/middlewares/auth";
import CategoryController from "./app/controllers/CategoryController";
import OrderController from "./app/controllers/OrderController";

const router = new Router();
const upload = multer(multerConfig);

router.post("/users", UserController.store);
router.post("/session", SessionController.store);

router.use(authMiddleware);

router.post("/product", upload.single("file"), ProductController.store);
router.get("/product", ProductController.index);

router.post("/categories", CategoryController.store);
router.get("/categories", CategoryController.index);

router.post("/orders", OrderController.store);

export default router;
