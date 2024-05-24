import { Router } from "express";

const router = new Router();

router.get("/", (req, res) => {
  return res.json({ Messege: "Hello world" });
});

export default router;
