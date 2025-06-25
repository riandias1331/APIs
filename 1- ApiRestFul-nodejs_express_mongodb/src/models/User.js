const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        Select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10); // Gera o salt
        this.password = await bcrypt.hash(this.password, salt); // Hash da senha
        next();
    } catch (error) {
        next(error);
    }
});

// Middleware para atualizar o campo updatedAt
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);