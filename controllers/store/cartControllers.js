import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

// Use real user ID from authenticated request
export const getCart = async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId });
  res.json(cart?.items || []);
};

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, name, price, quantity } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, quantity });
  }

  await cart.save();
  res.json({ message: 'Item added to cart', cart });
};

export const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(item => item.productId === productId);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  item.quantity = quantity;
  await cart.save();

  res.json({ message: 'Cart updated', cart });
};

export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item => item.productId !== productId);
  await cart.save();

  res.json({ message: 'Item removed', cart });
};

export const checkout = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = new Order({
    userId,
    items: cart.items,
    total,
  });

  await order.save();
  cart.items = [];
  await cart.save();

  res.json({ message: 'Checkout successful', order });
};
