import { List } from "../models/listModel.js";
import { Course } from "../models/model.js";

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
            return res.status(404).json({ message: "Course not found in database" });
        }


        const existingEntry = await List.findOne({ user: userId, course: courseId });
        if (existingEntry) {
            return res.status(400).json({ message: "Course already in the list" });
        }


        const newEntry = await List.create({
            user: userId,
            course: courseId
        });

        res.status(201).json(newEntry);
    } catch (error) {

        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ message: error.message });
    }
};


export const removeFromList = async (req, res) => {
    const { listId } = req.body;  

    if (!listId) {
        return res.status(400).json({ message: "List Item ID is required in the body" });
    }

    try {

        const deletedItem = await List.findOneAndDelete({ _id: listId});

        if (!deletedItem) {
            return res.status(404).json({ 
                message: "Item not found or you are not authorized to remove it" 
            });
        }

        res.status(200).json({ 
            message: "Item removed successfully",
            deletedId: deletedItem._id 
        });

    } catch (error) {

        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ message: error.message });
    }
};