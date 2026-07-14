import mongoose from "mongoose";
import { Level } from "../../models/levelModel.js";
import { User } from "../../models/model.js";
import { AppError } from "../../utils/appError.js";

export const getAllLevelsService = async ({ q = false }) => {
    const query = {};

    if (!q) {
        query.name = { $ne: "عام" };
    }

    const [levels, userCounts] = await Promise.all([
        Level.find(query).sort({ createdAt: -1 }),

        User.aggregate([
            {
                $match: {
                    level: { $exists: true, $ne: null },
                },
            },
            {
                $group: {
                    _id: { $toString: "$level" },
                    count: { $sum: 1 },
                },
            },
        ]),
    ]);

    const countMap = Object.fromEntries(
        userCounts.map(({ _id, count }) => [_id, count])
    );

    const levelsWithCount = levels.map((level) => ({
        ...level.toObject(),
        userCount: countMap[level._id.toString()] ?? 0,
    }));

    return levelsWithCount;
};

export const createLevelService = async (data) => {
    const { name } = data;

    if (!name || !name.trim()) {
        throw new AppError("Level name is required", 400);
    }

    const existing = await Level.findOne({
        name: { $regex: `^${name.trim()}$`, $options: "i" },
    });

    if (existing) {
        throw new AppError("A level with this name already exists", 409);
    }

    const level = await Level.create({ ...data, name: name.trim() });

    return level;
};


export const updateLevelService = async (id, data) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new AppError("Invalid level id", 400);
    }

    if (data.name) {
        const existing = await Level.findOne({
            _id: { $ne: id },
            name: { $regex: `^${data.name.trim()}$`, $options: "i" },
        });

        if (existing) {
            throw new AppError("A level with this name already exists", 409);
        }

        data.name = data.name.trim();
    }

    const level = await Level.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
    );

    if (!level) {
        throw new AppError("Level not found", 404);
    }

    return level;
};