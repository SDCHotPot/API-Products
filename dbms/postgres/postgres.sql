\c api_product;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_styles;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS related;

CREATE TABLE products (
  id              int PRIMARY KEY,
  name            varchar(255),
  slogan          varchar(255),
  description     text,
  category        varchar(255),
  default_price   int,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

\COPY products (id, name, slogan, description, category, default_price) FROM 'dbms/data/product.csv' delimiter ',' csv header;

CREATE TABLE product_styles (
  style_id        int PRIMARY KEY,
  product_id      int,
  name            varchar(255),
  original_price  varchar(255),
  sale_price      varchar(255),
  default_style   boolean
);

CREATE INDEX style_idx ON product_styles (product_id);

\COPY product_styles FROM 'dbms/data/styles.csv' WITH (FORMAT CSV, HEADER, DELIMITER ',', FORCE_NULL (original_price));

CREATE TABLE skus (
  id              int PRIMARY KEY,
  style_id        int,
  size            varchar(20),
  quantity        int
);

CREATE INDEX sku_idx ON skus (style_id) INCLUDE (size, quantity);

\COPY skus FROM 'dbms/data/skus.csv' delimiter ',' csv header;

CREATE TABLE photos (
  id              int PRIMARY KEY,
  style_id        int,
  thumbnail_url   text,
  url             text
);

CREATE INDEX photos_idx ON photos (style_id) INCLUDE (thumbnail_url, url);

\COPY photos FROM 'dbms/data/photos.csv' delimiter ',' csv header;

CREATE TABLE features (
  id              int PRIMARY KEY,
  product_id      int,
  features        varchar(255),
  value           varchar(255)
);

CREATE INDEX feat_idx ON features (product_id) INCLUDE (features, value);

\COPY features FROM 'dbms/data/features.csv' delimiter ',' csv header;

CREATE TABLE related (
  id              int PRIMARY KEY,
  curr_prod_id    int,
  rel_prod_id     int
);

CREATE INDEX rel_idx ON related (
  curr_prod_id
) INCLUDE (rel_prod_id);

\COPY related FROM 'dbms/data/related.csv' delimiter ',' csv header;