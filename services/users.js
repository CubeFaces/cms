const UserModel = require('../models/users')

module.exports.findAllUsers = async () => {
    try {
        const users = await UserModel.find();
        return users;
    } catch (err) {
        throw new Error('Could not retrieve accounts')
    }
};