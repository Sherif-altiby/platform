import { Level } from "../models/levelModel.js";

export const getLevels = async (req, res) => {
  try {
    const levels = await Level.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: levels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createLevel = async (req, res) => {
  try {
    const { name } = req.body;
    const existingLevel = await Level.findOne({ name });

    if (existingLevel) {
      return res
        .status(400)
        .json({ success: false, message: "هذا المستوى موجود بالفعل" });
    }

    const level = await Level.create({ name });
    res.status(201).json({ success: true, data: level });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
