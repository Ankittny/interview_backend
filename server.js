const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());



app.use('/uploads', express.static('uploads'));


app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    return res.status(400).json({ message: 'Validation Error', errors });
  }

  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`port ${PORT}`));
