import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";
import multer from "multer";
import multerConfig from "./config/multer";

const router = new Router();
const upload = multer(multerConfig);

router.post("/users", UserController.store);
router.post("/session", SessionController.store);
router.post("/product", upload.single("file"), ProductController.store);

export default router;
