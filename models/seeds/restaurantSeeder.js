const Restaurant = require('../restaurant')
const restaurantdata = require('./restaurant.json')
const restaurantList = restaurantdata.results
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurantList.forEach(restaurant => {
    Restaurant.create({
      name: restaurant.name,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('done')
})
