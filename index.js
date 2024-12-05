const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Add an item to the cart
function addItemToCart(cart, productId, name, price, quantity) {
  const newItem = {
    productId: parseInt(productId, 10),
    name,
    price: parseFloat(price),
    quantity: parseInt(quantity, 10),
  };
  cart.push(newItem);
  return cart;
}

// Edit the quantity of an item in the cart
function editCartItemQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === parseInt(productId, 10)) {
      cart[i].quantity = parseInt(quantity, 10);
      break;
    }
  }
  return cart;
}

// Delete an item from the cart
function deleteCartItem(cart, productId) {
  return cart.filter((item) => item.productId !== parseInt(productId, 10));
}

// Calculate total quantity of items in the cart
function calculateTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

// Calculate total price of items in the cart
function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

// Endpoints

// Add an item to the cart
app.get('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.query;
  cart = addItemToCart(cart, productId, name, price, quantity);
  res.json({ cartItems: cart });
});

// Edit the quantity of an item in the cart
app.get('/cart/edit', (req, res) => {
  const { productId, quantity } = req.query;
  cart = editCartItemQuantity(cart, productId, quantity);
  res.json({ cartItems: cart });
});

// Delete an item from the cart
app.get('/cart/delete', (req, res) => {
  const { productId } = req.query;
  cart = deleteCartItem(cart, productId);
  res.json({ cartItems: cart });
});

// Read the current state of the cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Calculate total quantity of items in the cart
app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = calculateTotalQuantity(cart);
  res.json({ totalQuantity });
});

// Calculate total price of items in the cart
app.get('/cart/total-price', (req, res) => {
  const totalPrice = calculateTotalPrice(cart);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
