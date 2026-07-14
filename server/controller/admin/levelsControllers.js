import { asyncHandler } from "../../utils/asyncHandler.js"
import { AppError } from "../../utils/appError.js"
import { createLevelService, getAllLevelsService, updateLevelService } from "../../services/level/levelsServices.js";
 
export const getAllLevels = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const result = await getAllLevelsService({ q });

  if (!result) {
    throw new AppError("Failed to fetch users", 500);
  }

  res.status(200).json({
    status: true,
    data: result.levels,
    pagination: result.pagination,
  });
});


export const createLevel = asyncHandler(async (req, res) => {
  const level = await createLevelService(req.body);

  if (!level) {
      throw new AppError("Failed to create level", 500);
  }

  res.status(201).json({
      status: true,
      message: "Level created successfully",
      data: level,
  });
});

export const updateLevel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const level = await updateLevelService(id, req.body);

  res.status(200).json({
      status: true,
      message: "Level updated successfully",
      data: level,
  });
});