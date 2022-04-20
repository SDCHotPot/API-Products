const mongoose = require('mongoose');
const { Schema } = mongoose;

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
})

const stylesSchema = new Schema({
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
})

const Product = mongoose.model('Product', productSchema);
const Styles = mongoose.model('Styles', stylesSchema);

