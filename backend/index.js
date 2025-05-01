import express from 'express';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import cors from "cors"
import connectDB from './utils/mongodb.js';
import userRoute from './routes/userRoutes.js';
dotenv.config()

const app=express();



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



const corsOptions={
    origin: [process.env.VITE_FRONTEND_URL],    
    credentials: true,
}
app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log(`server is listening on port ${PORT}`)  
})
connectDB();

//apis
app.use('/user',userRoute)




//checking request
app.get('/',(req,res)=>{
  res.send("Working")
})