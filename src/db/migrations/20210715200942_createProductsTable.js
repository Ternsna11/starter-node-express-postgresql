exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("product_id").primary(); // sets product_id as the primary key
    table.string("product_sku");
    table.string("product_name");
    table.text("product_description");
    table.integer("product_quantity_in_stock");
    table.decimal("product_weight_in_lbs");
    table.integer("supplier_id").unsigned().notNullable();
    table
      .foreign("supplier_id")
      .references("supplier_id")
      .inTable("suppliers")
      .onDelete("cascade");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};

// exports.up notes

// Notice that you can chain unsigned() to table.integer("supplier_id") to prevent negative values from being inserted into the supplier_id column. Chaining notNullable() ensures that supplier_id cannot be null.

//The line (12-15) table.foreign("supplier_id").references("supplier_id").inTable("suppliers"); creates a foreign key constraint called supplier_id, which references the primary key of the suppliers table. Chaining onDelete("cascade") means that if a supplier is deleted, then all the products related to the supplier will be deleted from the database as well.


// exports.down notes

//When you undo the migration, exports.down will get invoked, which will call the knex.schema.dropTable() method to drop the products table.

