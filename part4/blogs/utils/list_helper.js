const dummy = (blogs) => {
    return 1
  }

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

module.exports = {
dummy, totalLikes, favoriteBlog
}