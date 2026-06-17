"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardEntry = void 0;
const mongoose_1 = require("mongoose");
const LeaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 1 },
    updatedAt: { type: Date, default: () => new Date() },
}, { timestamps: true });
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', LeaderboardEntrySchema);
