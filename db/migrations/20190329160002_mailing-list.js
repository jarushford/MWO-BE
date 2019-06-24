
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mailing', function(table) {
      table.increments('id').primary()
      table.string('email')
      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mailing')
  ])
};
