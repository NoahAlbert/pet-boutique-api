const express = require('express')
const cors = require('cors')
const { getCustomers, getCustomerByID, getCustomerByQuery, createCustomer, getCustomersNotMia,
    deleteCustomer }
= require('./src/customers')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/customers/notMia', getCustomersNotMia)
app.get('/customers/search', getCustomerByQuery)
app.get('/customers/:id', getCustomerByID)
app.get('/customers', getCustomers)

app.post('/customers', createCustomer)
app.delete('/customers/:id', deleteCustomer)

app.listen(3000, () => console.log('listening to 3000'))