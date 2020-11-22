const db = require('./queries.js')
const express = require('express')
const bodyParser = require('body-parser')
const { request, response } = require('express')
const app = express()
const port = 3000

app.use(function(req,res,next){
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Conrol-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","*");
		// res.setHeader("Content-Type", "application/json;charset=utf-8"); // Opening this comment will cause problems
    next();
})


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
app.get('/users/search',db.getUserByName)
app.get('/users/:id', db.getUserById)
app.post('/users',bodyParser.json(),db.createUser)
app.put('/user/:id',db.updateUser)
app.delete('/user/:id',db.deleteUser)

app.listen(port, ()=> {
    console.log(`App running on port ${port}`)
})