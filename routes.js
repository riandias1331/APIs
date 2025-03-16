const express = require('express')
const route = express.Router()
const controller = require('./src/controlles/controller.js')
const authMiddleware = require('./src/middleware/auth.js')


// Private routes
route.put('/users/:id', authMiddleware, controller.updateUser);
route.delete('/users/:id', authMiddleware, controller.deletedUser);
route.delete('/users', authMiddleware, controller.deletedUserAll);


// Public routes
route.get('/users', authMiddleware, controller.getUsers);
route.get('/users/:id', controller.getUser);
route.post('/users', controller.createUser);


module.exports = route