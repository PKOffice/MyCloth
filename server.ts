
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Fixed: Explicitly cast express.json() to any to avoid "NextHandleFunction not assignable to PathParams" error 
// caused by type definition mismatches in some Express environments.
app.use(express.json() as any);

// --- MONGODB CONNECTION ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mycloth';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✓ Connected to Atelier Database (MongoDB)'))
  .catch((err) => console.error('✗ MongoDB Connection Error:', err));

// --- PRODUCT SCHEMA & MODEL ---
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Mens', 'Womens', 'Active', 'Sleepwear'], required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  badges: [String],
  stock: { type: Number, default: 0 },
  offerPrice: Number
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productSchema);

// --- ROUTES ---

/** @route GET /api/products - Get all artifacts */
app.get('/api/products', async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/** @route POST /api/products - Archive a new artifact */
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Product Data' });
  }
});

/** @route PUT /api/products/:id - Update artifact details */
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
});

/** @route DELETE /api/products/:id - Remove from archive */
app.delete('/api/products/:id', async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Artifact purged from archive' });
  } catch (error) {
    res.status(400).json({ message: 'Delete failed' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✓ Atelier Server active on port ${PORT}`);
});
