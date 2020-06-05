export default class Order {
  constructor (documentId, address, amount, name, orderDate, phone, products, status, userId, waybill, deliveryPrice) {
    this.documentId = documentId
    this.address = address
    this.amount = amount
    this.name = name
    this.orderDate = orderDate
    this.phone = phone
    this.products = products
    this.status = status
    this.userId = userId
    this.waybill = waybill
    this.deliveryPrice = deliveryPrice
  }
}
