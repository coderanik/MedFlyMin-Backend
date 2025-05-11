import express from 'express';
import { login, logout, register } from '../../controllers/auth/authControllers.js';
 


const authRoutes = express.Router();    
authRoutes.post('/login',login);
authRoutes.post('/register',register);
authRoutes.post('/logout',logout);

export default authRoutes;