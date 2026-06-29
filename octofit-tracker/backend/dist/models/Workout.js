"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    focus: { type: String, enum: ['cardio', 'strength', 'mobility', 'recovery'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    suggestedFor: { type: String, required: true },
}, { timestamps: true });
exports.Workout = mongoose_1.models.Workout || (0, mongoose_1.model)('Workout', workoutSchema);
