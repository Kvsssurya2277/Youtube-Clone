import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();
const connect = () => {
mongoose
.connect(process.env.MONGO)
.then(() => {
console.log("connected to db");
})
.catch((err) => {
throw err;
});
};
app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)
app.use((err, req, res, next) => {
const status = err.status || 500;
const message = err.message || "Something went wrong";
return res.status(status).json({
success: false,
status,
message,
});
});
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
const PORT=8800 || process.env.PORT;
app.listen(PORT, () => {
connect();
console.log("Connection done"+process.env.PORT)
});
