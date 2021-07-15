
exports.up = function(knex) {
    return knex.schema.table("products", (table) => {
        table.renameColumn("product_name", "product_title");
        table.decimal("product_price");  // Add a new column
      });
};

exports.down = function(knex) {
    return knex.schema.table("products", (table) => {
        table.renameColumn("product_title", "product_name");
        table.dropColumn("product_price");
      });
};


// // to undo a migration individually you would:
// npx knex migrate:down migration_file_name
// ie for this npx knex migrate:down productsAddPriceAndChangeProductNameToProductTitle


// to redo a migration individually you would:
// npx knex migrate:up migration_file_name
// npx knex migrate:up productsAddPriceAndChangeProductNameToProductTitle