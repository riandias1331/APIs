import { Router } from "express"
import * as userController from './src/controllers/userController';

const route: Router = Router()


route.get('/users', userController.getUsersAll)
route.get('/users/:id', userController.getUser)
route.post('/users', userController.createUser)
route.put('/users/:id', userController.updateUser)
route.delete('/users/:id', userController.deleteUser)
route.delete('/users', userController.deleteUsersAll)

export default route