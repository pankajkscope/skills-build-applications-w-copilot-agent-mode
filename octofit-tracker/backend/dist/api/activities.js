"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get("/", async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find().sort({ completedAt: -1 });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to load activities", error });
    }
});
exports.default = router;
