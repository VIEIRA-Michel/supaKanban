const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    username: { type: String, required: true },
    kanbanCreated: { type: Number, default: 0 },
    listCreated: { type: Number, default: 0 },
    taskCreated: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() }
});

userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    } catch (e) {
        throw e
    }
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.local.password);
}

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;