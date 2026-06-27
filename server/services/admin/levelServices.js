import { Level } from "../../models/levelModel.js";
import { User } from "../../models/model.js";

 export const getAllLevelsService = async ({
    page = 1,
    limit = 10,
    search = "",
}) => {
    const skip = (page - 1) * limit;
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    const query = {};

    if (search) {
        query.name = { $regex: search, $options: "i" };
    }

    const [levels, total] = await Promise.all([
        Level.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parsedLimit),

        Level.countDocuments(query),
    ]);

    const levelIds = levels.map((l) => l._id);

    // ── Debug: verify User model is hitting the right collection ──
    const totalUsers = await User.countDocuments({});
    console.log("Total users in DB:", totalUsers);
    console.log("Level IDs to match:", levelIds);

    const userCounts = await User.aggregate([
    {
        $match: {
            level: { $exists: true, $ne: null },
        },
    },
    {
        $group: {
            _id: { $toString: "$level" }, // normalize to string
            count: { $sum: 1 },
        },
    },
]);

// countMap keys are already strings now
const countMap = Object.fromEntries(
    userCounts.map(({ _id, count }) => [_id, count])
);

const levelsWithCount = levels.map((level) => ({
    ...level.toObject(),
    userCount: countMap[level._id.toString()] ?? 0,
}));

    const totalPages = Math.ceil(total / parsedLimit);
    const hasNextPage = parsedPage < totalPages;

    return {
        levels: levelsWithCount,
        pagination: {
            total,
            page: parsedPage,
            limit: parsedLimit,
            totalPages,
            nextPage: hasNextPage ? parsedPage + 1 : null,
            hasNextPage,
        },
    };
};