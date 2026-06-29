import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Workouts API working!" });
});

export default router;
