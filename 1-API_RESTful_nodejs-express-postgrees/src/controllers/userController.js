import UserModel from '../models//userModels.js'

const UserController = {
  async createUser(req, res) {
    try {
      const usuario = await UserModel.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUsers(req, res) {
    try {
      const usuarios = await UserModel.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserId(req, res) {
    try {
      const usuario = await UserModel.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const usuario = await UserModel.update(req.params.id, req.body);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      await UserModel.delete(req.params.id);
      res.status(204).json({ message: "user deleted" }).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteUserAll(req, res) {
    try {
    //   // Antes de deletar, cria backup
    // await backupService.createBackup('users_pre_delete');

      if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ 
          error: "This operation is not allowed in production" 
        });
      }
      const result = await UserModel.deleteAll();
      res.status(200).json({
        message: `All users (${result.count}) were deleted successfully`,
        deletedCount: result.count
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default UserController;