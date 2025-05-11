import express from 'express';
import { pharmacyLogin, pharmacyLogout, pharmacyRegister } from '../../controllers/auth/pharmacistauthController.js';
 


const pharmacistauthRoutes = express.Router();    
pharmacistauthRoutes.post('/login',pharmacyLogin);
pharmacistauthRoutes.post('/register',pharmacyRegister);
pharmacistauthRoutes.post('/logout',pharmacyLogout);

export default pharmacistauthRoutes;