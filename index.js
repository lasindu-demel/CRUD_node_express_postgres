const db = require('./queries.js')
const express = require('express')
const bodyParser = require('body-parser')
const { request, response } = require('express')
const app = express()
const port = 3000

app.unsubscribe(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Note.js, Express, and Postgres API '})
})

app.get('/users',db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users',bodyParser.json(),db.createUser)
app.put('/user/:id',db.updateUser)
app.delete('/user/:id',db.deleteUser)

app.listen(port, ()=> {
    console.log(`App running on port ${port}`)
})