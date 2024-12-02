const express = require('express')
const { createTodo, deleteToDo, getAllToDo, updateToDo } = require("../Controllers/todoCtrl");

const todoRouter = express.Router()



todoRouter.get('/getall',getAllToDo)
todoRouter.post('/',createTodo)
todoRouter.put('/updateToDo/:id', updateToDo)
todoRouter.delete('/deleteToDo/:id',deleteToDo)

module.exports = todoRouter;