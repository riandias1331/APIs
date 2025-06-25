// const User = require('../models/User.js')

// const bcrypt = require('bcrypt')


// exports.getAll = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }

// }

// exports.get = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({ message: 'user not found' });
//         }

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// }

// exports.create = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const salt = await bcrypt.genSalt(10)
//         const hashPassword = await bcrypt.hash(password, salt)
//         const user = await User.create({
//             name,
//             email,
//             password: hashPassword
//         });
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// exports.update = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const updatedData = req.body;
//         const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
//         if (!user) {
//             return res.status(404).json({ message: 'user not foundo' });
//         } res.status(200).json(user);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// exports.deleted = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const user = await User.findByIdAndDelete(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'user not found' });
//         } res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }


// exports.deletedAll =  async (req, res) => {
//     try {
//         const user = await User.deleteMany();
//         if (!user) {
//             return res.status(404).json({ message: 'user not found' });
//         } res.status(200).json({ message: 'All users have been deleted.'  });
        
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error when deleting users.' });
//     }
// };



const pool = require('../models/dbSql');
const bcrypt = require('bcrypt');

// Registrar um novo usuário
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Verificar se o e-mail já existe
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email já está em uso' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserir usuário no banco
        const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const newUser = await pool.query(query, [name, email, hashedPassword]);

        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login de um usuário
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Comparar senha
        const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Senha inválida' });
        }

        res.status(200).json({ message: 'Login bem-sucedido', user: user.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT id, name, email FROM users');
        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
