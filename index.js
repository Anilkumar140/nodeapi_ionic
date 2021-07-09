const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users', db.getUsers)
app.get('/login', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

var server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is started on 127.0.0.1:' + (process.env.PORT || 3000))
})