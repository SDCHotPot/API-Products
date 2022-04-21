const { connection, Product, Style } = require('./mongo.js');

//

const addProduct = ({
  id, name, slogan, description, category, default_price, related, features,
}) => {
  const newProduct = new Product({
    _id: id,
    name,
    slogan,
    description,
    category,
    default_price,
    created_at: new Date(),
    updated_at: new Date(),
    related,
    features,
  });
  return newProduct.save()
};

const addStyle = ({
  style_id, product_id, name, original_price, sale_price, default,
  skus, photos,
}) = {
  const newStyle = new Style({
    _id: style_id,
    product_id,
    name,
    original_price,
    sale_price,
    'default?': default,
    skus,
    photos
  })
}