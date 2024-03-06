import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
// import connectDB from './configs/db';

// initialisation App
const app = express();

// apply Middlewares
app.use(express.json())

app.use(express.urlencoded({extended: true})) // parse data formulaire 
app.use(cors())

app.get("",async (req: Request, res: Response)=> {
        res.json({ message: "Hello from express endpoint"})
    }
 )

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{console.log("server ranning on localhost:5000")})

// connectDB()