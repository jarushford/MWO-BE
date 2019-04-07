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

const validateNewsParams = (req, res, next) => {
  const newItem = {
    title: req.body.title,
    body: req.body.body,
    link: req.body.link,
    image_url: req.body.image_url
  }

  for (let requiredParam of ['title', 'body', 'link', 'image_url']) {
    if (!newItem[requiredParam]) {
      return res.status(422)
        .json({ message: `Expected format: { title: <String>, body: <String>, link: <String>, image_url: <String> }. You are missing a ${requiredParam}.` })
    }
  }

  next()
}

const validatePhotoParams = (req, res, next) => {
  const newPhoto = {
    link: req.body.link,
    description: req.body.description
  }

  for (let requiredParam of ['link', 'description']) {
    if (!newPhoto[requiredParam]) {
      return res.status(422)
        .json({ message: `Expected format: { link: <String>, description: <String> }. You are missing a ${requiredParam}.` })
    }
  }

  next()
}

const validateVideoParams = (req, res, next) => {
  const newVideo = {
    link: req.body.link,
    title: req.body.title
  }

  for (let requiredParam of ['link', 'title']) {
    if (!newVideo[requiredParam]) {
      return res.status(422)
        .json({ message: `Expected format: { link: <String>, title: <String> }. You are missing a ${requiredParam}.` })
    }
  }

  next()
}

const validateContactParams = (req, res, next) => {
  const newContact = {
    email: req.body.email,
  }

  for (let requiredParam of ['email']) {
    if (!newContact[requiredParam]) {
      return res.status(422)
        .json({ message: `Expected format: { email: <String> }. You are missing a ${requiredParam}.` })
    }
  }

  next()
}

module.exports = {
  validateTourDateParams,
  validateNewsParams,
  validatePhotoParams,
  validateVideoParams,
  validateContactParams
}