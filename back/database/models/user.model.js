const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    kanbanCreated: { type: Number, default: 0 },
    listCreated: { type: Number, default: 0 },
    taskCreated: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() }
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;