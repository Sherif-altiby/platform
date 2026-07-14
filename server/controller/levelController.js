import { createLevelService, getAllLevelsService } from "../services/level/levelsServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getLevels = asyncHandler(async (req, res) => {
  let { q } = req.query;

  if(!q){
    q=false;
  }

  const levels = await getAllLevelsService({ q });

  res.status(200).json({
    success: true,
    data: levels,
  });
});


export const createLevel = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name?.trim()) {
    throw new AppError("اسم المستوى مطلوب", 400);
  }

  const level = await createLevelService(name);

  res.status(201).json({
    success: true,
    data: level,
    message: "تم إنشاء المستوى بنجاح",
  });
});
