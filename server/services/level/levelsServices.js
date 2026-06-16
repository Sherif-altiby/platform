import { Level } from "../../models/levelModel.js";
import { AppError } from "../../utils/appError.js";


export const getLevelsService = async (q) => {
    const filter = {};
  
    if (!q) {
      filter.name = { $ne: "عام" };
    }
  
    const levels = await Level.find(filter).sort({ createdAt: 1 });
  
    return levels;
  };
  
  export const createLevelService = async (name) => {
    const existingLevel = await Level.findOne({
      name: name.trim(),
    });
  
    if (existingLevel) {
      throw new AppError("هذا المستوى موجود بالفعل", 400);
    }
  
    const level = await Level.create({
      name: name.trim(),
    });
  
    return level;
  };