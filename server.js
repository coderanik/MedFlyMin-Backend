import express from "express"
import db from "./config/db.js";
import 'dotenv/config';
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/auth/authRoutes.js";
import pharmacistauthRoutes from "./routes/auth/pharmacistauthRoutes.js";

//App Config
const app = express();
const port = process.env.PORT || 3000;
db();

//Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // frontend port
  credentials: true,
}));

//Api Endpoints
app.use('/admin',adminRoutes)
app.use('/auth',authRoutes)
app.use('/pharmacistAuth',pharmacistauthRoutes)

//Default Route
app.get('/',(req,res)=>{
  res.send("Backend is Working");
})

app.listen(port,()=>{
   console.log(`Server is working on port ${port}`);
})
