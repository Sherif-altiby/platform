import { User } from "../../models/model.js";

export const getAllUsersService = async ({
    page = 1,
    limit = 10,
    search = "",
    levelId,
}) => {
    const skip = (page - 1) * limit;

    const query = {};

    //   Search (name, email, phone, parentName)
    if (search) {
        query.name = { $regex: search, $options: "i" };
        
    }

    //  Filter by level
    if (levelId) {
        query.level = levelId;
    }

    const [users, total] = await Promise.all([
        User.find(query)
            .select("name email phone parentPhone level")
            .populate("level", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)),

        User.countDocuments(query),
    ]);

    return {
        users,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
        },
    };
};