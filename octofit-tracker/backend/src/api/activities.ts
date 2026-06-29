import { Router } from "express";
import { Activity } from "../models/Activity";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ completedAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Failed to load activities", error });
  }
});

export default router;
