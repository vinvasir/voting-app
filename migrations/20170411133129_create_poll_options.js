
exports.up = function(knex, Promise) {
  return knex.schema.createTable('poll_options', tbl => {
  	tbl.increments('id').primary();
  	tbl.integer('poll_id')
  		 .references('id')
  		 .inTable('polls');  	
  	tbl.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('poll_options');
};
