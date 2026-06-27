import { getDashboardStatsService } from "../../services/admin/dashboardStaticsServices.js";
import { AppError } from "../../utils/appError.js";
import { asyncHandler } from "../../utils/asyncHandler.js"

export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStatsService();

  if (!stats) {
    throw new AppError("Failed to load dashboard statistics", 500);
  }

  res.status(200).json({
    status: true,
    data: stats,
  });
});