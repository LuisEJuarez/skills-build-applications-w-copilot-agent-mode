"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'member' },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    joinedAt: { type: Date, default: () => new Date() },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', UserSchema);
