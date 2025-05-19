import { User } from "../models/model.js";

const isAdmin = async (req, res, next) => {
    try {
        const userId = req.userId; 

        const user = await User.findById(userId);
        if (!user || user.role !== "admin") {
            return res.status(401).json({
                message: "You are not authorized to perform this action",
                error: true,
                status: false,
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
};

export default isAdmin