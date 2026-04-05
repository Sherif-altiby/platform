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
import path from "path"
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';


dotenv.config();

const app = express();  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  app.use(
    cors({
      origin: [
        "https://platform-mu-steel.vercel.app",
        "https://platform-db7k.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001"
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.options("*", cors());

 
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('combined'))
app.use(helmet({
    crossOriginResourcePolicy: false,
}));   


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10000, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to all requests
app.use(limiter);


app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/teacher', teacherRouter)



const PORT = 8080;

connectDB().then(() => {
 
    app.listen(PORT, () => {
        console.log('The server is running in port : ', PORT)
    })

})