const knex = require("../db/connection");

function list() {
  return knex("products").select("*");
}
//Update the list() function to call the productsService.list() method and return a JSON response to the client on successful promise resolution, as follows:

function read(product_id) {
  return knex("products").select("*").where({ product_id }).first();
}
// This read() function creates a Knex query that selects all columns from the products table where the product_id column matches the argument passed to the read() function. The first() method returns the first row in the table as an object

module.exports = {
  list,
  read,
};
