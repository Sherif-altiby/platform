import { List } from "../models/listModel.js";
import { Course, User } from "../models/model.js";

export const getList = async (req, res) => {
    try {
        const list = await List.find({}).populate('user', "name email level").populate('course', "title image");
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addToList = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.userId; 

    if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
    }

    try {

        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({ message: "Course not found" });
        }

        const existingEntry = await List.findOne({ user: userId, course: courseId });
        if (existingEntry) {
            return res.status(400).json({ message: "Course already in the list" });
        }

        const newEntry = await List.create({
            user: userId,
            course: courseId
        });

        await User.findByIdAndUpdate(userId, {
            $addToSet: { 
                accessedCourses: { 
                    course: courseId, 
                    status: "pending" 
                } 
            }
        });

        res.status(201).json({
            message: "Course added and access opened",
            entry: newEntry
        });

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ message: error.message });
    }
};

export const userAccessCourse = async (req, res) => {
    const { listId, userId } = req.body; 

    if (!listId || !userId) {
        return res.status(400).json({ message: "List Item ID and User ID are required" });
    }

    try {
        
        const deletedItem = await List.findOneAndDelete({ _id: listId, user: userId });

        if (!deletedItem) {
            return res.status(404).json({ 
                message: "Item not found or you are not authorized to remove it" 
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            { 
                _id: userId, 
                "accessedCourses.course": deletedItem.course 
            },
            { 
                $set: { "accessedCourses.$.status": "open" }  
            },
            { new: true }  
        );

        res.status(200).json({ 
            message: "Item removed and course status updated to open",
            deletedId: deletedItem._id,
            courseId: deletedItem.course
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ message: error.message });
    }
};