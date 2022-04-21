const mongoose = require('mongoose');
const { Schema } = mongoose;

require('dotenv').config();

const connection = mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new Schema({
  _id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  created_at: String,
  updated_at: String,
  related: [{ type: Number }],
  features: {
    feature: String,
    value: String
  }
});

const Product = mongoose.model('Product', productSchema);

const styleSchema = new Schema({
  _id: Number,
  product_id: Number,
  name: String,
  original_price: Number,
  sale_price: Number,
  'default?': Boolean,
  skus: {
    id: Number,
    quantity: Number,
    size: String
  },
  photos: Array
});

const Style = mongoose.model('Style', stylesSchema);

exports.connection = connection;
exports.Product = Product;
exports.Style = Style;