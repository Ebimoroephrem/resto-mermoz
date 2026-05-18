import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


dotenv.config();



const app = express();
const PORT = 4000;

// meddleware

app.use(express.json());
app.use(cors());

// connection a la base de donnée
connectDB();

//points de terminaison d’API
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order',orderRouter);




app.listen(
    PORT, ()=>{
        console.log(`Le serveur va demarré sur le port ${PORT}`);   
    }
)