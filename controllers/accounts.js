const accountsService = require('../services/accounts');

module.exports.getAccounts = async (req, res) => {
    try {
        const accounts = await accountsService.findAllAccounts();
        res.send({ accounts });
    } catch (err) {
        res.status(500);
        res.send({
            error: err
        })
    }
}