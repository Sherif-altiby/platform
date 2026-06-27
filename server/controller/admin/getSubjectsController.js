import { asyncHandler } from "../../utils/asyncHandler.js"
import { AppError } from "../../utils/appError.js"
import { createSubjectService, getAllSubjectsService, updateSubjectService } from "../../services/admin/getSubjectsServices.js";

export const getAllSubjectsController = asyncHandler(async (req, res) => {
  const { page, limit, search,  } = req.query;

  const result = await getAllSubjectsService({
    page,
    limit,
    search,
  });

  if (!result) {
    throw new AppError("Failed to fetch users", 500);
  }

  res.status(200).json({
    status: true,
    data: result.subjects,
    pagination: result.pagination,
  });
});

export const createSubject = asyncHandler(async (req, res) => {

  const subject = await createSubjectService({ subjectName: req.body.subjectName, file: req.file, });

  res.status(201).json({ message: "Subject created successfully", status: true, error: false, data: subject, });
});


export const updateSubject = asyncHandler(async (req, res) => {
  const subject = await updateSubjectService({
    subId: req.body.subId,
    name: req.body.name,
    file: req.file,
  });

  res.json({
    message: "Subject updated successfully",
    status: true,
    error: false,
    data: subject,
  });
});