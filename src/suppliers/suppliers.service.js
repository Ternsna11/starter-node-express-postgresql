const knex = require("../db/connection");

function create(supplier) {
  return knex("suppliers")
    .insert(supplier)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

//The code above looks and functions very similarly to categories.service.js and products.service.js. The create() function creates a Knex query that inserts a new supplier into the suppliers table while returning all columns from the newly inserted row (because of returning(*)). The .insert() method of Knex can be used to insert more than one record, so it returns an array of the records inserted. For this API, only one supplier will ever be inserted at a time so you chain .then((createdRecords) => createdRecords[0]); } onto the query to return only the one inserted record

function read(supplier_id) {
  return knex("suppliers").select("*").where({ supplier_id }).first();
}

function update(updatedSupplier) {
  return knex("suppliers")
    .select("*")
    .where({ supplier_id: updatedSupplier.supplier_id })
    .update(updatedSupplier, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

//The .update() method of Knex can be used to update more than one record, so it returns an array of the records updated

//The update() method in knex accepts as its argument an object that contains the data for updating the existing supplier.

//f a returning array is passed (for example, ["supplier_id", "supplier_name"] as the second argument, it resolves the promise with an array of all the updated rows with specified columns. That's like a shortcut for the returning() method. You can also pass "*" as the second argument to return all of the columns of the updated rows.

function destroy(supplier_id) {
  return knex("suppliers").where({ supplier_id }).del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
