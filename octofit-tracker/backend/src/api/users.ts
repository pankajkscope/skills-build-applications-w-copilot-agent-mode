import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Users API working!" });
});

export default router;
