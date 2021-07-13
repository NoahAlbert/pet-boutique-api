const admin = require('firebase-admin')
const creds = require('../credentials.json')

function connectDB() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds),
    })
  }
  return admin.firestore()
}

exports.getCustomers = (req, res) => {
  const db = connectDB()
  db.collection('customers')
    .get()
    .then(customerCollection => {
      const allCustomers = customerCollection.docs.map(doc => {
        let customer = doc.data()
        customer.id = doc.id
        return customer
      })
      res.send(allCustomers)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
}

exports.getCustomerByID = (req, res) => {
  if (!req.params.id) {
    res.status(400).send('No customer found')
    return
  }
  const db = connectDB()
  db.collection('customers')
    .doc(req.params.id)
    .get()
    .then(doc => {
      const customer = doc.data()
      customer.id = doc.id
      res.send(customer)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err)
    })
}

exports.getCustomerByQuery = (req, res) => {
  const { fname } = req.query
  const db = connectDB()
  db.collection('customers')
    .where('firstName', '==', fname)
    .get()
    .then(customerCollection => {
      const matches = customerCollection.docs.map(doc => {
        let customer = doc.data()
        customer.id = doc.id
        return customer
      })
      res.send(matches)
    })
    .catch(err => res.status(500).send(err))
}

exports.createCustomer = (req, res) => {
  const db = connectDB()
  db.collection('customers')
    .add(req.body)
    .then(docRef => {
      res.send(docRef.id)
    })
    .catch(err => res.status(500).send('Customer could not be created:', err))
}

exports.getCustomersNotMia = (req, res) => {
  const db = connectDB()
  db.collection('customers')
    .where('firstName', '!=', 'Mia')
    .get()
    .then(customerCollection => {
      const matches = customerCollection.docs.map(doc => {
        let customer = doc.data()
        customer.id = doc.id
        return customer
      })
      res.send(matches)
    })
    .catch(err => res.status(500).send(err))
}