import express from 'express';
import mongoose from 'mongoose';
import usersRouter from "./api/users";
import teamsRouter from "./api/teams";
import activitiesRouter from "./api/activities";
import leaderboardRouter from "./api/leaderboard";
import workoutsRouter from "./api/workouts";

const app = express();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/workouts", workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get("/", (_req, res) => {
  res.send("OctoFit backend is running!");
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`OctoFit backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
