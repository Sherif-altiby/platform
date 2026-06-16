import { createLevelService, getLevelsService } from "../services/level/levelsServices.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getLevels = asyncHandler(async (req, res) => {
  const { q } = req.query;

  const levels = await getLevelsService(q);

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
