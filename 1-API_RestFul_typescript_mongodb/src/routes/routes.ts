import { Router } from "express"
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';

const route: Router = Router()

// private routes
route.get('/users', authMiddleware, userController.getUsersAll)
route.get('/users/:id', authMiddleware, userController.getUser)
route.put('/users/:id', authMiddleware,  userController.updateUser)
route.delete('/users', authMiddleware,  userController.deleteUsersAll)
route.delete('/users/:id', authMiddleware, userController.deleteUser)

// pulic routes
route.post('/users', userController.createUser)



export default route