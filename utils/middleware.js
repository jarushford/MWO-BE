const validateTourDateParams = (req, res, next) => {
  const newDate = {
    day_of_week: req.body.day_of_week,
    date: req.body.date,
    city: req.body.city,
    venue: req.body.venue,
    ticket_link: req.body.ticket_link,
    venue_link: req.body.venue_link
  }

  for (let requiredParam of ['day_of_week', 'date', 'city', 'venue', 'ticket_link', 'venue_link']) {
    if (!newDate[requiredParam]) {
      return res.status(422)
        .json({ message: `Expected format: { day_of_week: <String>, date: <String>, city: <String>, venue: <String>, ticket_link: <String>, venue_link: <String> }. You are missing a ${requiredParam}.` })
    }
  }

  next()
}

module.exports = {
  validateTourDateParams
}