import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User, Subject } from "./models/model.js";
import { Teacher } from "./models/teacherModel.js";
import { VideoModel } from "./models/videoModel.js";
import { PdfModel } from "./models/pdfModel.js";
import { Quizz } from "./models/quizzModel.js";
import { Comment } from "./models/commentsModel.js";

const MONGO_DB = process.env.MONGO_DB || "mongodb://localhost:27017/education_db";

async function seed() {
  await mongoose.connect(MONGO_DB);
  console.log("✅ Connected to MongoDB");

  // Clear existing data
  await Promise.all([
    User.deleteMany(),
    Teacher.deleteMany(),
    Subject.deleteMany(),
    VideoModel.deleteMany(),
    PdfModel.deleteMany(),
    Quizz.deleteMany(),
    Comment.deleteMany(),
  ]);
  console.log("🗑️  Cleared existing data");

  // ── Subjects ──────────────────────────────────────────────
  const subjects = await Subject.insertMany([
    { name: "Mathematics",  image: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" },
    { name: "Physics",      image: "https://cdn-icons-png.flaticon.com/512/2906/2906274.png" },
    { name: "Chemistry",    image: "https://cdn-icons-png.flaticon.com/512/3141/3141631.png" },
    { name: "Biology",      image: "https://cdn-icons-png.flaticon.com/512/3774/3774278.png" },
    { name: "English",      image: "https://cdn-icons-png.flaticon.com/512/323/323329.png"   },
  ]);
  console.log("📚 Subjects seeded");

  // ── Teachers ──────────────────────────────────────────────
  const hashedPw = await bcrypt.hash("password123", 10);

  const teachers = await Teacher.insertMany([
    {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@school.com",
      password: hashedPw,
      phone: 1001000001,
      about: "Math teacher with 10 years of experience in secondary education.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      subjects: [subjects[0]._id],   // Mathematics
    },
    {
      name: "Sara Ali",
      email: "sara.ali@school.com",
      password: hashedPw,
      phone: 1001000002,
      about: "Physics and Chemistry specialist, passionate about lab experiments.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      subjects: [subjects[1]._id, subjects[2]._id],   // Physics + Chemistry
    },
    {
      name: "Mohamed Youssef",
      email: "mohamed.youssef@school.com",
      password: hashedPw,
      phone: 1001000003,
      about: "Biology and English teacher focused on interactive learning.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      subjects: [subjects[3]._id, subjects[4]._id],   // Biology + English
    },
  ]);

  // Push teachers into their respective subjects
  await Subject.findByIdAndUpdate(subjects[0]._id, { $push: { teachers: teachers[0]._id } });
  await Subject.findByIdAndUpdate(subjects[1]._id, { $push: { teachers: teachers[1]._id } });
  await Subject.findByIdAndUpdate(subjects[2]._id, { $push: { teachers: teachers[1]._id } });
  await Subject.findByIdAndUpdate(subjects[3]._id, { $push: { teachers: teachers[2]._id } });
  await Subject.findByIdAndUpdate(subjects[4]._id, { $push: { teachers: teachers[2]._id } });
  console.log("👩‍🏫 Teachers seeded");

  // ── Students ──────────────────────────────────────────────
  const students = await User.insertMany([
    {
      name: "Omar Khaled",
      email: "omar.khaled@student.com",
      password: hashedPw,
      phone: 2001000001,
      level: "first",
      subscribedTeachers: [teachers[0]._id],
    },
    {
      name: "Nour Ibrahim",
      email: "nour.ibrahim@student.com",
      password: hashedPw,
      phone: 2001000002,
      level: "second",
      subscribedTeachers: [teachers[1]._id],
    },
    {
      name: "Layla Mostafa",
      email: "layla.mostafa@student.com",
      password: hashedPw,
      phone: 2001000003,
      level: "third",
      subscribedTeachers: [teachers[0]._id, teachers[2]._id],
    },
    {
      name: "Youssef Adel",
      email: "youssef.adel@student.com",
      password: hashedPw,
      phone: 2001000004,
      level: "first",
      subscribedTeachers: [teachers[2]._id],
    },
  ]);

  // Push students into teachers' myStudents
  await Teacher.findByIdAndUpdate(teachers[0]._id, { $push: { myStudents: { $each: [students[0]._id, students[2]._id] } } });
  await Teacher.findByIdAndUpdate(teachers[1]._id, { $push: { myStudents: students[1]._id } });
  await Teacher.findByIdAndUpdate(teachers[2]._id, { $push: { myStudents: { $each: [students[2]._id, students[3]._id] } } });
  console.log("🎓 Students seeded");

  // ── Videos ────────────────────────────────────────────────
  await VideoModel.insertMany([
    {
      teacher: teachers[0]._id,
      title: "Introduction to Algebra",
      level: "first",
      link: "https://www.youtube.com/watch?v=algebra_intro",
      description: "Basic concepts of algebra for first-level students.",
    },
    {
      teacher: teachers[0]._id,
      title: "Quadratic Equations Explained",
      level: "second",
      link: "https://www.youtube.com/watch?v=quadratic_eq",
      description: "Step-by-step solving of quadratic equations.",
    },
    {
      teacher: teachers[1]._id,
      title: "Newton's Laws of Motion",
      level: "first",
      link: "https://www.youtube.com/watch?v=newtons_laws",
      description: "Understanding Newton's three laws with real-world examples.",
    },
    {
      teacher: teachers[1]._id,
      title: "Periodic Table Overview",
      level: "second",
      link: "https://www.youtube.com/watch?v=periodic_table",
      description: "A complete walkthrough of the periodic table of elements.",
    },
    {
      teacher: teachers[2]._id,
      title: "Cell Structure and Function",
      level: "third",
      link: "https://www.youtube.com/watch?v=cell_structure",
      description: "Deep dive into eukaryotic and prokaryotic cells.",
    },
  ]);
  console.log("🎬 Videos seeded");

  // ── PDFs ──────────────────────────────────────────────────
  await PdfModel.insertMany([
    {
      teacher: teachers[0]._id,
      title: "Algebra Practice Sheet",
      level: "first",
      pdf: "https://example.com/pdfs/algebra_practice.pdf",
    },
    {
      teacher: teachers[0]._id,
      title: "Calculus Notes",
      level: "third",
      pdf: "https://example.com/pdfs/calculus_notes.pdf",
    },
    {
      teacher: teachers[1]._id,
      title: "Physics Formula Sheet",
      level: "second",
      pdf: "https://example.com/pdfs/physics_formulas.pdf",
    },
    {
      teacher: teachers[2]._id,
      title: "English Grammar Guide",
      level: "first",
      pdf: "https://example.com/pdfs/english_grammar.pdf",
    },
  ]);
  console.log("📄 PDFs seeded");

  // ── Quizzes ───────────────────────────────────────────────
  await Quizz.insertMany([
    {
      teacher: teachers[0]._id,
      title: "Algebra Basics Quiz",
      level: "first",
      questions: [
        {
          title: "What is 2x + 3 = 7? Solve for x.",
          answers: ["1", "2", "3", "4"],
          correctAnswer: "2",
        },
        {
          title: "Which of the following is a linear equation?",
          answers: ["x² + 1 = 0", "2x + 5 = 11", "x³ = 8", "√x = 4"],
          correctAnswer: "2x + 5 = 11",
        },
        {
          title: "Simplify: 3(x + 4) - 2x",
          answers: ["x + 12", "5x + 4", "x + 4", "3x + 12"],
          correctAnswer: "x + 12",
        },
      ],
    },
    {
      teacher: teachers[1]._id,
      title: "Physics Motion Quiz",
      level: "second",
      questions: [
        {
          title: "What is the unit of force?",
          answers: ["Joule", "Newton", "Watt", "Pascal"],
          correctAnswer: "Newton",
        },
        {
          title: "According to Newton's 2nd law, F = ?",
          answers: ["m/a", "m + a", "m × a", "m - a"],
          correctAnswer: "m × a",
        },
        {
          title: "Which law explains why we wear seatbelts?",
          answers: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Law of Gravity"],
          correctAnswer: "Newton's 1st Law",
        },
      ],
    },
    {
      teacher: teachers[2]._id,
      title: "Biology Cell Quiz",
      level: "third",
      questions: [
        {
          title: "What is the powerhouse of the cell?",
          answers: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
          correctAnswer: "Mitochondria",
        },
        {
          title: "Which organelle contains DNA?",
          answers: ["Vacuole", "Nucleus", "Cell membrane", "Lysosome"],
          correctAnswer: "Nucleus",
        },
        {
          title: "What controls what enters and exits the cell?",
          answers: ["Cell wall", "Cytoplasm", "Cell membrane", "Nucleus"],
          correctAnswer: "Cell membrane",
        },
      ],
    },
  ]);
  console.log("📝 Quizzes seeded");

  // ── Comments ──────────────────────────────────────────────
  await Comment.insertMany([
    { user: students[0]._id, comment: "Ahmed's math lessons are very clear and well-structured!", rate: 5, show: true  },
    { user: students[1]._id, comment: "Physics videos helped me a lot before my exams.",           rate: 4, show: true  },
    { user: students[2]._id, comment: "I love the PDF summaries, very concise and useful.",        rate: 5, show: true  },
    { user: students[3]._id, comment: "The biology quiz was challenging but educational.",         rate: 4, show: false },
    { user: students[0]._id, comment: "Would love more practice problems in the quizzes.",        rate: 3, show: true  },
  ]);
  console.log("💬 Comments seeded");

  console.log("\n🌱 Seed completed successfully!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  mongoose.disconnect();
  process.exit(1);
});