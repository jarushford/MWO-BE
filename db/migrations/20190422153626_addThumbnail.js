
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('videos', function(table) {
      table.string('thumbnail')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('videos', function(table) {
      table.dropColumn('thumbnail')
    })  
  ])
}

