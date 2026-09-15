const express=require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB=require("./configs/DB");
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkwebhook';

const app=express();

connectDB();
app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/clerk',clerkWebhooks);

app.use(cors());
app.get('/',(req,res)=>{
    res.json("Api is Workingg");
});


const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
