import express from 'express';
const router = express.Router();

import { getAllUsers, createUser, getUserById, updateUser, deleteUser, deleteAll} from '../controllers/userController.js';
import * as auth from '../middlewares/auth.js'
import validator from '../utils/validator.js';

// Private routes
router.get('/users', auth.authMiddleware, getAllUsers);
router.get('/users/:id', auth.authMiddleware, getUserById);
router.put('/users/:id', auth.authMiddleware, updateUser);
router.delete('/users/:id', auth.authMiddleware, deleteUser);
router.delete('/users/', auth.authMiddleware, deleteAll);

// Public routes
router.post('/users', validator, createUser);

export default router;