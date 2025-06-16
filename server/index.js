import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js'; 
import { connect } from 'mongoose';
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import jobRoutes from './routes/job.route.js';
import applicationRoutes from './routes/application.route.js';
import isAuthenticated from './middlewares/isAuthenticated.js';

dotenv.config({});
const app = express();
// //api:
app.get('/api', (req, res) => {
    res.json({ message:'Hello from the API!'});
    success:true
});

//def middleware:
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true,
};
app.use(cors(corsOptions));
 //ports and routes
const PORT = process.env.PORT || 3000;

//apis"
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/company",companyRoutes);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
}) 