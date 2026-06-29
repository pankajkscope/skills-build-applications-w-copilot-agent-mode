import { Router } from "express";
import { Workout } from "../models/Workout";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Failed to load workouts", error });
  }
});

export default router;
