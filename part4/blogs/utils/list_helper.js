const _ = require('lodash')

const totalLikes = array => {
    const counter = (sum, item) => {
      return sum + item.likes
    }
    return array.length === 0 
      ? 0
      : array.reduce(counter, 0)
}

const favoriteBlog = array => {
  const topLikes = Math.max(...array.map(object => object.likes))
  return array.find(object => object.likes === topLikes)
}

const mostBlogs = array => {
  const counting = _.countBy(array, 'author')
  const mostBlogs = _.maxBy(Object.keys(counting))
  const result = {
    'author': mostBlogs,
    'blogs': counting[mostBlogs]
  }
  return result
}

const mostLikes = array => {
  const group = _.groupBy(array, 'author')

  const counting = []
  _.forEach(group, function(value, key) {
    counting.push({
      author: key,
      likes: _.reduce(value, function(sum,n){
        return sum + n.likes
      }, 0)
    })
  })

  return _.maxBy(counting, 'likes')
  
}

module.exports = {
totalLikes, favoriteBlog, mostBlogs, mostLikes
}