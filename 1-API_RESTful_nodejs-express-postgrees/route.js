// const express = require('express')
// const route = express.Router()

// const homeControler  = require('./src/controllers/homeControllers')


// route.get('/users', homeControler.getAll)
// route.get('/users/:id', homeControler.get)
// route.post('/users', homeControler.create)
// route.put('/users/:id', homeControler.update)
// route.delete('/users/:id', homeControler.deleted)
// route.delete('/users', homeControler.deletedAll)



// module.exports = route



const express = require('express');
const router = express.Router();
const UserController = require('./src/controllers/homeControllers');

// Rotas de usuário
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);

module.exports = router;
