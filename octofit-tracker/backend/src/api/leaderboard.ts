import { Router } from "express";
import { LeaderboardEntry } from "../models/LeaderboardEntry";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Failed to load leaderboard", error });
  }
});

export default router;
