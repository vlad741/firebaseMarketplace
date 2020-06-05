// Helped class for User
export default class User {
  constructor (id, name, email, photoUrl, address, dateOfBirth, gender, phone) {
    this.id = id
    this.name = name
    this.email = email
    this.photoUrl = photoUrl
    // this fields from collection user>id>info
    this.address = address
    this.dateOfBirth = dateOfBirth
    this.gender = gender
    this.phone = phone
  }
}
