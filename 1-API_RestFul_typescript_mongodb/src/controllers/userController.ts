// import { Request, Response } from "express"
// const User = require('../models/userModel.js')
// import User, { IUser } from "../models/userModel.ts"

// exports.getUsersAll = async (req: Request, res: Response) => {
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
// exports.getUser = async (req, res) => {
//     try {
//         const userId = req.params.id
//         const user = await User.findById(userId)

//         if (!user) {
//             res.status(400).json({ message: 'user not found' });
//         }

//         res.status(200).json(user);
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
// exports.createUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body
//         const user = await User.create({
//             name,
//             email,
//             password
//         })
//         res.status(201).json(user)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
// exports.updateUser = async (req, res) => {
//     try {
//         const userId = req.params.id
//         const updateUser = req.body
//         const user = await User.findByIdAndUpdate(userId, updateUser, {new: true })

//         if (!user) {
//             res.status(400).json({ message: 'user not found' });
//         }

//         res.status(200).json(user);
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
// exports.deleteUser = async (req, res) => {
//     try {
//         const userId = req.params.id
//         const user = await User.findOneAndDelete(userId)

//         if (!user) {
//             res.status(400).json({ message: 'user not found' });
//         }

//         res.status(200).json(user);
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
// exports.deleteUsersAll = async (req, res) => {
//     try {
//         const user = await User.deleteMany()
//         if (!user) {
//             return res.status(404).json({ message: 'user not found' });
//         }
//         res.status(200).json({ message: 'All users have been deleted.'  });
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

// Listar todos os usuários
export const getUsersAll = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Buscar um usuário por ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Criar um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Atualizar um usuário
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Deletar um usuário
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Deletar todos os usuários
export const deleteUsersAll = async (req: Request, res: Response) => {
  try {
    const result = await User.deleteMany();
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No users found to delete' });
    }
    res.status(200).json({ message: 'All users have been deleted.' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};