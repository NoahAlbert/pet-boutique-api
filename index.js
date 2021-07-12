const express = require('express')
const cors = require('cors')
const { getCustomers, getCustomerByID, getCustomerByQuery, createCustomer } = require('./src/customers')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/customers/search', getCustomerByQuery)
app.get('/customers/:id', getCustomerByID)
app.get('/customers', getCustomers)

app.post('/customers', createCustomer)


app.listen(3000, () => console.log('listening to 3000'))