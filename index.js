const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
var cors = require('cors');
require('dotenv').config()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/api/users', db.getUsers)
app.post('/api/login', db.getUserById)
app.post('/api/createinfo', db.createAddInfo)
app.post('/api/users', db.createUser)
app.put('/api/users/:id', db.updateUser)
app.delete('/api/users/:id', db.deleteUser)

var server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is started on 127.0.0.1:' + (process.env.PORT || 3000))
})