const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

(async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  await Product.insertMany(data.map(p => ({
    name: p.title,
    category: p.category,
    price: p.price,
    description: p.description,
    image: p.image
  })));
  console.log('Dummy data added');
  process.exit();
})();
