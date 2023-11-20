const usersServices = require('../services/users');

module.exports.getUsers = async (req, res) => {
    try {
        const users = await usersServices.findAllUsers();
        res.send({ users });
    } catch (err) {
        res.status(500);
        res.send({
            error: err
        })
    }
}