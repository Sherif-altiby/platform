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

dotenv.config();

const app = express();  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEMD_URL
}));
 
app.use(express.json()) 
app.use(cookieParser())
app.use(morgan('combined'))
app.use(helmet({
    crossOriginResourcePolicy: false,
}));   

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/teacher', teacherRouter)

const PORT = 8080;

connectDB().then(() => {
 
    app.listen(PORT, () => {
        console.log('The server is running in port : ', PORT)
    })

})