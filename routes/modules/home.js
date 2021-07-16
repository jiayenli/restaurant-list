// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

// 搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurant => {
      restaurant = restaurant.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurant, keyword })
    })
    .catch(error => console.log(error))
})

// 篩選餐廳
router.post('/', (req, res) => {
  let keyword = req.body.sort
  let order = ''
  if (keyword.includes('reverse')) {
    order = 'desc'
    keyword = keyword.split('reverse')[0]
  } else {
    order = 'asc'
  }
 
  Restaurant.find()
    .lean()
    .sort({ [keyword]: [order]})
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})
// 匯出路由模組
module.exports = router
