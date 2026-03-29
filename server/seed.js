import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User, Subject, Course } from "./models/model.js";
import { Teacher } from "./models/teacherModel.js";
import { VideoModel } from "./models/videoModel.js";
import { PdfModel } from "./models/pdfModel.js";
import { Quizz } from "./models/quizzModel.js";
import { Comment } from "./models/commentsModel.js";

dotenv.config();

const MONGO_DB = process.env.MONGO_DB || "mongodb://localhost:27017/education_db";

async function seed() {
  try {
    await mongoose.connect(MONGO_DB);
    console.log("✅ Connected to MongoDB");

    // 1. Clear existing data
    await Promise.all([
      User.deleteMany(),
      Teacher.deleteMany(),
      Subject.deleteMany(),
      Course.deleteMany(),
      VideoModel.deleteMany(),
      PdfModel.deleteMany(),
      Quizz.deleteMany(),
      Comment.deleteMany(),
    ]);
    console.log("🗑️  Cleared existing data");

    // 2. Seed Subjects
    const subjects = await Subject.insertMany([
      { name: "Mathematics", image: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" },
      { name: "Physics",     image: "https://cdn-icons-png.flaticon.com/512/2906/2906274.png" },
      { name: "Chemistry",   image: "https://cdn-icons-png.flaticon.com/512/3141/3141631.png" },
      { name: "Biology",     image: "https://cdn-icons-png.flaticon.com/512/3774/3774278.png" },
      { name: "English",     image: "https://cdn-icons-png.flaticon.com/512/323/323329.png"   },
    ]);
    console.log("📚 Subjects seeded");

    // 3. Seed Courses (Standalone Model)
    const coursesData = [
      { title: "Algebra Basics", subject: subjects[0]._id, price: 100, image: "algebra.png" },
      { title: "Calculus I", subject: subjects[0]._id, price: 150, image: "calculus.png" },
      { title: "Quantum Mechanics", subject: subjects[1]._id, price: 200, image: "quantum.png" },
      { title: "Organic Chemistry", subject: subjects[2]._id, price: 120, image: "organic.png" },
      { title: "Cell Biology", subject: subjects[3]._id, price: 90, image: "cells.png" },
      { title: "Shakespeare Literature", subject: subjects[4]._id, price: 80, image: "english.png" },
    ];
    const seededCourses = await Course.insertMany(coursesData);
    console.log("🎓 Courses seeded");

    // 4. Update Subjects with the embedded courses array (keeping them in sync)
    for (const sub of subjects) {
      const relatedCourses = seededCourses
        .filter(c => c.subject.toString() === sub._id.toString())
        .map(c => ({
          title: c.title,
          description: `Mastering ${c.title} for the ${sub.name} curriculum.`,
          price: c.price,
        }));
      
      await Subject.findByIdAndUpdate(sub._id, { $set: { courses: relatedCourses } });
    }
    console.log("🔗 Courses linked to Subjects");

    // 5. Seed Teachers
    const hashedPw = await bcrypt.hash("password123", 10);
    const teachers = await Teacher.insertMany([
      {
        name: "Ahmed Hassan",
        email: "ahmed.hassan@school.com",
        password: hashedPw,
        phone: 1001000001,
        about: "Math teacher with 10 years of experience.",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        subjects: [subjects[0]._id],
      },
      {
        name: "Sara Ali",
        email: "sara.ali@school.com",
        password: hashedPw,
        phone: 1001000002,
        about: "Physics and Chemistry specialist.",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        subjects: [subjects[1]._id, subjects[2]._id],
      },
    ]);
    console.log("👩‍🏫 Teachers seeded");

    // 6. Seed Students with Course Permissions
    const students = await User.insertMany([
      {
        name: "Omar Khaled",
        email: "omar.khaled@student.com",
        password: hashedPw,
        phone: 2001000001,
        level: "first",
        subscribedTeachers: [teachers[0]._id],
        // Access granted to Algebra Basics only
        permittedCourses: [seededCourses[0]._id] 
      },
      {
        name: "Nour Ibrahim",
        email: "nour.ibrahim@student.com",
        password: hashedPw,
        phone: 2001000002,
        level: "second",
        subscribedTeachers: [teachers[1]._id],
        // Access granted to Quantum Mechanics
        permittedCourses: [seededCourses[2]._id]
      }
    ]);
    console.log("🎓 Students seeded with permissions");

    // 7. Seed Videos, PDFs, and Quizzes (using seeded subjects/teachers)
    await VideoModel.create({
      teacher: teachers[0]._id,
      title: "Introduction to Algebra",
      level: "first",
      link: "https://youtube.com/...",
      description: "Basic concepts.",
    });

    await Quizz.create({
      teacher: teachers[0]._id,
      title: "Algebra Basics Quiz",
      level: "first",
      questions: [{ title: "Solve 2x=4", answers: ["1", "2"], correctAnswer: "2" }],
    });

    console.log("✅ Seed completed successfully!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();