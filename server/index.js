import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import rateLimit from 'express-rate-limit';
import paymentRouter from "./routes/paymentRoutes.js";


dotenv.config();

const app = express();


app.use(
  cors({
    origin: [
      "https://platform-mu-steel.vercel.app",
      "https://platform-db7k.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "platform-git-main-sherif-altibys-projects.vercel.app",
      "platform-kvh641tih-sherif-altibys-projects.vercel.app",
      "https://teacher-dashboard-taupe.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());


app.use(express.json({
  limit: "20kb"
}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('combined'))
app.use(helmet({
  crossOriginResourcePolicy: false,
}));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to all requests
// app.use(limiter);


app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/payment', paymentRouter)



const PORT = 8081;

connectDB().then(() => {

  app.listen(PORT, () => {
    console.log('The server is running in port : ', PORT)
  })

})