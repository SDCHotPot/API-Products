const { dbms } = require('./db.js');

const productQuery = (id) => (
  dbms.query(
    `SELECT p.*,
    (SELECT json_agg(
      json_build_object(
        "feature", f.feature,
        "value", f.value))
      FROM features f
      WHERE f.product_id = ${id}) features
    FROM products p
    WHERE p.id = ${id}`
  ).then((results) => results.rows)
)

const relatedQuery = (id) => (
  dbms.query(
    `SELECT array(
      SELECT r.rel_prod_id
      FROM related r
      WHERE r.curr_prod_id = ${id}
    )`
  )
    .then((results) => {
      return results.rows[0].array;
    })
);

const stylesQuery = (id) => (
  dbms.query(`
  SELECT
    s.style_id,
    s.name,
    s.sale_price,
    s.original_price,
    default_style AS "default?",
    (SELECT json_agg(
      json_build_object(
        'url', p.url,
        'thumbnail_url', p.thumbnail_url
        )
      )
      FROM photos p
      WHERE p.style_id = s.style_id) photos,
    (SELECT json_object_agg(
      sk.id, json_build_object(
        'size', sk.size,
        'quantity', sk.quantity
        )
      )
      FROM skus sk
      WHERE sk.style_id = s.style_id
    ) skus
  FROM product_styles s
  WHERE s.style_id IN (
    SELECT s.style_id
    FROM product_styles s
    WHERE s.product_id = ${id}
  )
  GROUP BY s.style_id;
  `)
  .then((results) => (
    {
      product_id: id,
      results: results.rows
    }
  ))
);

exports.productQuery = productQuery;
exports.relatedQuery = relatedQuery;
exports.stylesQuery = stylesQuery;

// `
//   SELECT
//     s.style_id,
//     s.name,
//     s.sale_price,
//     s.original_price,
//     default_style AS "default?",
//     (SELECT json_agg(
//       json_build_object(
//         'url', p.url,
//         'thumbnail_url', p.thumbnail_url
//         )
//       )
//       FROM photos p
//       WHERE p.style_id = s.style_id) photos,
//     (SELECT json_object_agg(
//       sk.id, json_build_object(
//         'size', sk.size,
//         'quantity', sk.quantity
//         )
//       )
//       FROM skus sk
//       WHERE sk.style_id = s.style_id
//     ) skus
//   FROM product_styles s,
//   skus sk
//   WHERE s.style_id IN (
//     SELECT s.style_id
//     FROM product_styles s
//     WHERE s.product_id = ${id}
//   )
//   GROUP BY s.style_id;
//   `