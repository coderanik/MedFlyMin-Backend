import express from 'express';
import { adminLogin } from '../controllers/admin/adminauthController.js';
import { trackOrder } from '../controllers/admin/orderController.js';

const adminRoutes = express.Router();
adminRoutes.post('/login',adminLogin)
adminRoutes.get('/orders/:orderId/track',trackOrder)

export default adminRoutes;