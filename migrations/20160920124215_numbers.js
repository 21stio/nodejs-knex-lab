exports.up = function(knex, Promise) {
  return knex.schema.withSchema("public").createTable("numbers", function (table) {
        table.increments("id").primary();
        table.integer("number").notNullable();
        table.boolean("locked").notNullable().defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
  
};
