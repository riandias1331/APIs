import { Router } from "express"
import * as userController from './src/controllers/userController';
import { authMiddleware } from './src/middlewares/auth';

const route: Router = Router()

// private routes
route.get('/users', userController.getUsersAll)
route.get('/users/:id', userController.getUser)
route.put('/users/:id', userController.updateUser)
route.delete('/users', userController.deleteUsersAll)
route.delete('/users/:id', userController.deleteUser)

// pulic routes
route.post('/users', userController.createUser)



export default route