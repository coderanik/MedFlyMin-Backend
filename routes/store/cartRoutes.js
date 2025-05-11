import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  checkout
} from '../controllers/cartController.js';

import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate); // Applies to all routes below

router.get('/cart', getCart);
router.post('/cart', addToCart);
router.put('/cart', updateCartItem);
router.delete('/cart/:productId', removeFromCart);
router.post('/checkout', checkout);

export default router;
