import { Teacher } from "../models/teacherModel.js";

const isTeacher = async (req, res, next) => {
    try {
        const teacherId = req.userId; 

        const teacher = await Teacher.findById(teacherId);
        if (!teacher || teacher.role !== "teacher") {
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

export default isTeacher