import { asyncHandler } from "../../utils/asyncHandler.js"
import { AppError } from "../../utils/appError.js"
import { getAllLevelsService } from "../../services/admin/levelServices.js";

export const getAllLevels = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;

  const result = await getAllLevelsService({
    page,
    limit,
    search,
   });

  if (!result) {
    throw new AppError("Failed to fetch users", 500);
  }

  res.status(200).json({
    status: true,
    data: result.levels,
    pagination: result.pagination,
  });
});
