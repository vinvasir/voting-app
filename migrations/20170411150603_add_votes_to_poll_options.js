
exports.up = function(knex, Promise) {
  return knex.schema.table('poll_options', tbl => {
  	tbl.integer('votes').notNullable().defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('poll_options', tbl => {
  	tbl.dropColumn('votes');
  });
};
