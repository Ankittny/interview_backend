const Product = require('../models/Product');
exports.getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, search = '', category = '', sort = 'name' } = req.query;
    const query = {
      name: { $regex: search, $options: 'i' },
      ...(category && { category })
    };
    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Product.countDocuments(query);
    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      products
    });
  } catch (err) {
    next(err);
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required' });
    }
    const { name, category, price, description } = req.body;
    const product = new Product({
      name,
      category,
      price,
      description,
      image: req.file.path
    });
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
