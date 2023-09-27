import Product from '../models/productSchema.js';
import data from '../data.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      message: 'success',
      text: 'All products in payload.',
      payload: { products }
    });
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Internal Server Error.',
      payload: { error }
    });
  }
};

const seedProducts = async (req, res) => {
  try {
    const createdProducts = await Product.insertMany(data.products);
    res.json({
      message: 'success',
      text: 'Products created.',
      payload: { createdProducts }
    });
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Internal Server Error.',
      payload: { error }
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json({
        message: 'success',
        text: 'Product found.',
        payload: { product }
      });
    } else {
      res.status(404).json({
        message: 'falt',
        text: 'Product was not found.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Internal Server Error.',
      payload: { error }
    });
  }
};

const createProduct = async (req, res) => {
  const newProduct = new Product({
    name: 'product ' + Date.now(),
    descr: 'sample description',
    shortDescr: 'short description',
    image: 'no-path',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    instock: true,
    countInStock: 0,
    raiting: 3,
    numReviews: 0
  });

  try {
    const createdProduct = await newProduct.save();
    res.json({
      message: 'success',
      text: 'Product created.',
      payload: {
        product: createdProduct
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Internal Server Error.',
      payload: { error }
    });
  }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.descr = req.body.descr;
        product.shortDescr = req.body.shortDescr;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.instock = req.body.instock;
        product.countInStock = req.body.countInStock;
  
        const updatedProduct = await product.save();
        res.json({
          message: 'success',
          text: 'Product updated.',
          payload: {
            product: updatedProduct
          }
        });
      } else {
        res.status(404).json({
          message: 'falt',
          text: 'Product was not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'falt',
        text: 'Internal Server Error.',
        payload: { error }
      });
    }
  };
  
  const deleteProduct = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findById(productId);
      if (product) {
        await product.remove();
        res.json({
          message: 'success',
          text: 'Product deleted.',
          payload: { product }
        });
      } else {
        res.status(404).json({
          message: 'falt',
          text: 'Product was not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'falt',
        text: 'Internal Server Error.',
        payload: { error }
      });
    }
  };
  
  export {
    getAllProducts,
    seedProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  };