-- dropdb productsdb

createdb productsdb;

CREATE TABLE products (
  id              int,
  name            varchar(20),
  slogan          varchar(100),
  description     varchar(200),
  category        varchar(20),
  default_price   varchar(6),
  created_at      char(24),
  updated_at      char(24),
);

CREATE TABLE productStyles (
  style_id        int,
  product_id      int,
  name            varchar(25),
  original_price  varchar(6),
  sale_price      varchar(6),
);

CREATE TABLE skus (
  id              int,
  style_id        int,
  quantity        int,
  size            varchar(3)
);

CREATE TABLE photos (
  id              int,
  style_id        int,
  thumbnail_url   varchar(50),
  url             varchar(50)
)