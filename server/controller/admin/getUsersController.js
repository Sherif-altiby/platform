import { getAllUsersService } from "../../services/admin/getUsersServices.js";
import { asyncHandler } from "../../utils/asyncHandler.js"
import { AppError } from "../../utils/appError.js"
import { getAllTeachersService } from "../../services/admin/teacherServices.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const { page, limit, search, levelId } = req.query;

  const result = await getAllUsersService({
    page,
    limit,
    search,
    levelId,
  });

  if (!result) {
    throw new AppError("Failed to fetch users", 500);
  }

  res.status(200).json({
    status: true,
    data: result.users,
    pagination: result.pagination,
  });
});


export const getAllTeachers = asyncHandler(async (req, res) => {
  const { page, limit, search, levelId } = req.query;

  const result = await getAllTeachersService({
    page,
    limit,
    search,
    levelId,
  });

  if (!result) {
    throw new AppError("Failed to fetch users", 500);
  }

  res.status(200).json({
    status: true,
    data: result.teachers,
    pagination: result.pagination,
  });
});