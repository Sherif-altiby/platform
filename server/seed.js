import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Course, Subject, User } from './models/model.js';
import { Lesson } from './models/lessonCourse.js';
import { Level } from './models/levelModel.js';
import { Rating } from './models/ratingModel.js';
import { PdfModel } from './models/pdfModel.js';
import { Quizz } from './models/quizzModel.js';
import { Subscription } from './models/subscriptionModel.js';
import { Comment } from './models/commentsModel.js';



dotenv.config();

const MONGO_URI = process.env.MONGO_DB  

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to database for seeding...");

        // 1. تنظيف قاعدة البيانات (اختياري)
        await Promise.all([
            User.deleteMany(), Subject.deleteMany(), Course.deleteMany(),
            Level.deleteMany(), Lesson.deleteMany(), Quizz.deleteMany(),
            PdfModel.deleteMany(), Comment.deleteMany(), Subscription.deleteMany(),
            Rating.deleteMany()
        ]);

        // 2. إنشاء المستويات (Levels)
        const levels = await Level.insertMany([
            { name: "الصف الأول الثانوي" },
            { name: "الصف الثاني الثانوي" },
            { name: "الصف الثالث الثانوي" }
        ]);

        // 3. إنشاء المعلمين (Teachers) - افترضنا وجود موديل Teacher
        // إذا لم يكن موجوداً، يتم التعامل معه كمستخدم برتبة معينة
        const teacher1Id = new mongoose.Types.ObjectId();
        const teacher2Id = new mongoose.Types.ObjectId();

        // 4. إنشاء المواد الدراسية (Subjects)
        const subjects = await Subject.insertMany([
            { name: "الفيزياء", image: "physics.png", teachers: [teacher1Id] },
            { name: "الكيمياء", image: "chemistry.png", teachers: [teacher2Id] }
        ]);

        // 5. إنشاء المستخدمين (طلاب)
        const students = await User.insertMany([
            {
                name: "أحمد محمد",
                email: "ahmed@example.com",
                password: "password123", // يجب تشفيره في الحقيقة
                level: levels[0].name,
                phone: 0o1000000001,
                parentPhone: 0o1100000001,
                role: "student"
            },
            {
                name: "سارة علي",
                email: "sara@example.com",
                password: "password123",
                level: levels[2].name,
                phone: 0o1000000002,
                parentPhone: 0o1100000002,
                role: "student"
            }
        ]);

        // 6. إنشاء الكورسات (Courses)
        const courses = await Course.insertMany([
            {
                title: "دورة الفيزياء الكهربية",
                subject: subjects[0]._id,
                price: 200,
                level: levels[0].name,
                status: "active",
                image: "elec.png"
            },
            {
                title: "أساسيات الكيمياء العضوية",
                subject: subjects[1]._id,
                price: 150,
                level: levels[2].name,
                status: "active",
                image: "organic.png"
            }
        ]);

        // تحديث المواد لتشمل الكورسات
        subjects[0].courses.push(courses[0]._id);
        subjects[1].courses.push(courses[1]._id);
        await subjects[0].save();
        await subjects[1].save();

        // 7. إنشاء الدروس (Lessons)
        await Lesson.insertMany([
            {
                course: courses[0]._id,
                title: "المقدمة وقانون أوم",
                videoUrl: "https://video.com/1",
                description: "شرح مبسط لقانون أوم"
            },
            {
                course: courses[1]._id,
                title: "تركيب ذرة الكربون",
                videoUrl: "https://video.com/2",
                description: "مدخل للكيمياء العضوية"
            }
        ]);

        // 8. إنشاء الاختبارات (Quizzes)
        const quiz = await Quizz.create({
            teacher: teacher1Id,
            subject: subjects[0]._id,
            course: courses[0]._id,
            title: "اختبار الفيزياء الأسبوعي",
            level: levels[0].name,
            duration: 30,
            questions: [
                {
                    title: "ما هي وحدة قياس التيار؟",
                    answers: ["أوم", "فولت", "أمبير", "وات"],
                    correctAnswer: "أمبير"
                }
            ]
        });

        // ربط الاختبار بالكورس
        courses[0].quizzes = quiz._id;
        await courses[0].save();

        // 9. إنشاء المذكرات (PDFs)
        await PdfModel.create({
            teacher: teacher1Id,
            subject: subjects[0]._id,
            course: courses[0]._id,
            title: "ملخص قوانين الكهرباء",
            level: levels[0].name,
            pdf: "file_url_path.pdf"
        });

        // 10. إنشاء اشتراكات وتعليقات (Subscriptions & Comments)
        await Subscription.create({
            studentId: students[0]._id,
            teacherId: teacher1Id
        });

        await Comment.create({
            user: students[0]._id,
            comment: "شرح ممتاز جداً!",
            rate: 5,
            show: true
        });

        await Rating.create({
            user: students[0]._id,
            teacher: teacher1Id,
            rating: 5
        });

        console.log("Database seeded successfully! 🌱");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();