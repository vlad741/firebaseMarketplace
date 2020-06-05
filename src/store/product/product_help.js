// Helped class for Product
// var Count only for cart
export default class Product {
  constructor (id, category, description, name, path, photos, price, count) {
    this.id = id
    this.category = category
    this.description = description
    this.name = name
    this.path = path
    this.photos = photos
    this.price = price
    this.count = count
    this.isInCart = false
  }
}
