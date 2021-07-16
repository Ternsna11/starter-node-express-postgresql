const productsService = require("./products.service");

function productExists(req, res, next) {
  productsService
    .read(req.params.productId)
    // Chaining then() to productsService.read(productId) will execute the Knex query that you defined previously to retrieve a product given an id. The query returns a promise, which is handled in the then() function.
    .then((product) => {
      if (product) {
        res.locals.product = product;
        return next();
      }
      // If the product exists, it is stored in res.locals.product so that it can be readily accessed in the rest of the middleware pipeline. Otherwise, next() is called with an error
      next({ status: 404, message: `Product cannot be found.` });
    })
    .catch(next);
}
// 


function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

function list(req, res, next) {
  productsService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  read: [productExists, read],
  list,
};

