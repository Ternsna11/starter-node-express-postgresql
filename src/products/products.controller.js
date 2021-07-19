const productsService = require("./products.service");

async function productExists(req, res, next) {
  const data = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

async function list(req, res, next){
  const data = await productsService.list()
  res.json({ data })
}

function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}



module.exports = {
  read: [productExists, read],
  list,
};

//function productExists(req, res, next) {
// .read(req.params.productId)
// .then((product) => {
//   if (product) {
//     res.locals.product = product;
//     return next();
//   }
// Chaining then() to productsService.read(productId) will execute the Knex query that you defined previously to retrieve a product given an id. The query returns a promise, which is handled in the then() function.
//   // If the product exists, it is stored in res.locals.product so that it can be readily accessed in the rest of the middleware pipeline. Otherwise, next() is called with an error
//   next({ status: 404, message: `Product cannot be found.` });
// })
// .catch(next);


// function list(req, res, next) {
//   productsService
//     .list()
//     .then((data) => res.json({ data }))
//     .catch(next);
// }