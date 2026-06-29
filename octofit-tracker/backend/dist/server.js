"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const users_1 = __importDefault(require("./api/users"));
const teams_1 = __importDefault(require("./api/teams"));
const activities_1 = __importDefault(require("./api/activities"));
const leaderboard_1 = __importDefault(require("./api/leaderboard"));
const workouts_1 = __importDefault(require("./api/workouts"));
const config_1 = require("./config");
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const expectedCodespacesUrl = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : undefined;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/users", users_1.default);
app.use("/api/teams", teams_1.default);
app.use("/api/activities", activities_1.default);
app.use("/api/leaderboard", leaderboard_1.default);
app.use("/api/workouts", workouts_1.default);
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.get("/", (_req, res) => {
    res.json({ message: "OctoFit backend is running!", apiBaseUrl: config_1.API_BASE_URL });
});
async function startServer() {
    try {
        await (0, database_1.connectDB)();
        app.listen(config_1.PORT, () => {
            console.log(`OctoFit backend running on port ${config_1.PORT}`);
            console.log(`API base URL: ${config_1.API_BASE_URL}`);
            if (expectedCodespacesUrl && expectedCodespacesUrl !== config_1.API_BASE_URL) {
                console.log(`Expected Codespaces URL: ${expectedCodespacesUrl}`);
            }
        });
    }
    catch (error) {
        console.error("Failed to start backend:", error);
        process.exit(1);
    }
}
void startServer();
