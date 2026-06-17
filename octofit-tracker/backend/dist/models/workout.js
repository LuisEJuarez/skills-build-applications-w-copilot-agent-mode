"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const WorkoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true },
    muscleGroup: { type: String, required: true },
    tags: [{ type: String }],
    suggestedFor: [{ type: String }],
    createdAt: { type: Date, default: () => new Date() },
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', WorkoutSchema);
