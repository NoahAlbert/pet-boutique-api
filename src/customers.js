const admin = require('firebase-admin')
const creds = require('../credentials.json')


function connectDB(){
    if(!admin.apps.length){
        admin.initializeApp({
          credential: admin.credential.cert(creds)
        })
    }
    return admin.firestore()
}

exports.getCustomers = (req, res) => {
    const db = connectDB()
    db.collection('customers').get()
    .then(customerCollection => {
        const allCustomers = customerCollection.docs.map(doc => doc.data())
        res.send(allCustomers)
    })
    .catch(err => {
        console.error(err)
        res.status(500).send(err)
    })

}

exports.getCustomerByID = (req, res) => {
    const db = connectDB()
    if(!req.params.id){
        res.status(400).send('No customer found')
        return
    }
    db.collection('customers').doc(req.params.id).get()
    .then( doc => {
        const customer = doc.data()
        customer.id = doc.id
        res.send(customer)
    })
    .catch(err => {
        console.error(err)
        res.status(500).send(err)
    })
}