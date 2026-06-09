import { Subject, User } from "../models/model.js";
import { Teacher } from "../models/teacherModel.js";
import { hashPassword } from "../utils/hashPassword.js";
import mongoose from "mongoose";
import uploadImageClodinary from "../utils/uploadImages.js";


export const updateSubjectName = async (req, res) => {
    try {

        const {subId, name} = req.body;

        if (!mongoose.Types.ObjectId.isValid(subId)) {
            return res.status(400).json({
              message: "Invalid Subject ID format",
              error: true,
              status: false,
            });
        }

        if(!name){
            return res.status(400).json({
                message: "the name is required",
                error: true,
                status: false,
              });
        }

        const subject = await Subject.findById(subId);
        if(!subject){
            return res.status(400).json({
                message: "the subject not found",
                error: true,
                status: false,
              });
        }

        subject.name = name;
        await subject.save()

        return res.json({
            message: "the subject name is updated",
            error: false,
            status: true,
          });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
}

export const addTeacherToSubject = async (req, res) => {
    try {

        const {subId, teacherId} = req.body;

        if (!mongoose.Types.ObjectId.isValid(subId)) {
            return res.status(400).json({
              message: "Invalid Subject ID format",
              error: true,
              status: false,
            });
        }

        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).json({
              message: "Invalid teacher ID format",
              error: true,
              status: false,
            });
        }

        const subject = await Subject.findById(subId);
        if(!subject){
            return res.status(400).json({
                message: "subject not found",
                error: true,
                status: false,
              });
        }

        const teacher = await Teacher.findById(teacherId);
        if(!teacher){
            return res.status(400).json({
                message: "teacher not found",
                error: true,
                status: false,
              });
        }

        const isTeacherExist = subject.teachers.find((item) => item._id.equals(teacherId))
        if(isTeacherExist){
            return res.status(400).json({
                message: "Teacher is exist",
                error: true,
                status: false,
            });
        }

        subject.teachers.push(teacher)
        await subject.save();

        teacher.subjects.push(subject)
        await teacher.save();

        return res.json({
            message: "teacher added to subject successfully",
            error: false,
            status: true,
          });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
}

export const removeTeacherFromSubject = async (req, res) => {
    try {

        const {subId, teacherId} = req.body;

        if (!mongoose.Types.ObjectId.isValid(subId)) {
            return res.status(400).json({
              message: "Invalid Subject ID format",
              error: true,
              status: false,
            });
        }

        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).json({
              message: "Invalid teacher ID format",
              error: true,
              status: false,
            });
        }

        const subject = await Subject.findById(subId);
        if(!subject){
            return res.status(400).json({
                message: "subject not found",
                error: true,
                status: false,
              });
        }

        const teacher = await Teacher.findById(teacherId);
        if(!teacher){
            return res.status(400).json({
                message: "teacher not found",
                error: true,
                status: false,
              });
        }

        subject.teachers = subject.teachers.filter((item) => item._id.toString() !== teacherId.toString());
        await subject.save()

        teacher.subjects = teacher.subjects.filter((item) => item._id.toString() !== subId.toString())
        await teacher.save()


        return res.status(200).json({
            message: "Teacher removed from subject successfully",
            error: false,
            status: true,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
}


export const createTeacher = async (req, res) => {
    try {

        const { name, email, password, phone, subId, about, instaPay, vCash} = req.body;

        if(!subId){
            return res.status(400).json({
                message: "provide subjcet id",
                error: true,
                status: false,
            });
        }

        if (!mongoose.Types.ObjectId.isValid(subId)) {
            return res.status(400).json({
              message: "Invalid Subject ID format",
              error: true,
              status: false,
            });
        }

        const subject = await Subject.findById(subId);
        if(!subject){
            return res.status(400).json({
                message: "Subject not found",
                error: true,
                status: false,
            });
        }

        const isTeacherExist = await Teacher.findOne({email})
        if(isTeacherExist){
            return res.status(400).json({
                message: "teacher is already exist",
                error: true,
                status: false,
                isTeacherExist
            });
        }

        const hashedPass = await hashPassword(password)

        const uploaded = await uploadImageClodinary(req.file.buffer)

        const teacher = new Teacher({
            name,
            email,
            phone,
            vCash,
            instaPay,
            avatar: uploaded.secure_url ,
            password: hashedPass,
            subjects: [subject._id],
            about
        })

        await teacher.save()

        subject.teachers.push(teacher._id); 
        await subject.save();

        return res.json({
            message: "Teacher created successfully",
            error: false,
            status: true,
            data: teacher
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
}

export const blockUser = async (req, res) => {
    try {

        const { userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
              message: "Invalid ID format",
              error: true,
              status: false,
            });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found",
                error: true,
                status: false,
              });
        }

        user.isBlocked = true;
        await user.save();

        return res.status(200).json({
            message: "User blocked successfully",
            error: false,
            status: true,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }

}

export const unBlockUser = async (req, res) => {
    try {

        const { userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
              message: "Invalid ID format",
              error: true,
              status: false,
            });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found",
                error: true,
                status: false,
              });
        }

        user.isBlocked = false;
        await user.save();

        return res.status(200).json({
            message: "User un blocked successfully",
            error: false,
            status: true,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
}

export const blockTeacher = async (req, res) => {
    try {

        const { teacherId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).json({
              message: "Invalid ID format",
              error: true,
              status: false,
            });
        }

        const teacher = await Teacher.findById(teacherId);
        if(!teacher){
            return res.status(400).json({
                message: "teacher not found",
                error: true,
                status: false,
              });
        }

        teacher.isBlocked = true;
        await teacher.save();

        return res.status(200).json({
            message: "teacher blocked successfully",
            error: false,
            status: true,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }

}

export const unBlockTeacher = async (req, res) => {
    try {

        const { teacherId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).json({
              message: "Invalid ID format",
              error: true,
              status: false,
            });
        }

        const teacher = await Teacher.findById(teacherId);
        if(!teacher){
            return res.status(400).json({
                message: "teacher not found",
                error: true,
                status: false,
              });
        }

        teacher.isBlocked = false;
        await teacher.save();

        return res.status(200).json({
            message: "teacher un blocked successfully",
            error: false,
            status: true,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            status: false,
        });
    }
}

