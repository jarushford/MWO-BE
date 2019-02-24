
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary()
      table.string('email')
      table.string('password')
      table.timestamps(true, true)
    }),

    knex.schema.createTable('tour_dates', function(table) {
      table.increments('id').primary()
      table.string('day_of_week')
      table.string('date')
      table.string('city')
      table.string('venue')
      table.string('ticket_link')
      table.string('venue_link')
      table.timestamps(true, true)
    }),

    knex.schema.createTable('news', function(table) {
      table.increments('id').primary()
      table.string('title')
      table.string('body')
      table.string('link')
      table.string('image_url')
      table.timestamps(true, true)
    }),

    knex.schema.createTable('photos', function(table) {
      table.increments('id').primary()
      table.string('link')
      table.string('description')
      table.timestamps(true, true)
    }),

    knex.schema.createTable('videos', function(table) {
      table.increments('id').primary()
      table.string('link')
      table.string('title')
      table.timestamps(true, true)
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('tour_dates'),
    knex.schema.dropTable('news'),
    knex.schema.dropTable('photos'),
    knex.schema.dropTable('videos')
  ])
}
