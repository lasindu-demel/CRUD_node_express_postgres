// const { Pool } = require('pg')
const { response, request } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

// GET all users
const getUsers = (request, response) =>{
    pool.query('select * from users order by id',(error,results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// GET a single user by id
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
pool.query('select * from users where id = $1', [id], (error,results) =>{
    if(error){
        throw error
    }
    response.status(200).json(results.rows)
})
}

// POST create user
const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
     [name, email],
      (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send({
        status: "success",  
        message:`User added with ID: ${results.rows[0].id}`})
    })
  }

// PUT update existing user
const updateUser = (requeset,response) => {
    const id = parseInt(requeset,params.id)
    const {name,email} =requeset.body

    pool.query(
        'update users set name = $1, email = $2 where id = $3',
        [name,email,id],
        (error,results) => {
            if(error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

// DELETE a user
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

pool.query('delete from users where id =$1', [id],(error ,results) =>{
if (error) {
    throw error
}
response.status(200).send(`User deleted with ID ${id}`)
})
}

//GET search users
const getUserByName = (request,response) => {
    const key = request.query.key
pool.query('select * from users where name ilike $1',['%'+key+'%'],(error,results) => {
    if(error){
      throw error
    }
    response.status(200).json(results.rows)
  })
  }



module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByName
}