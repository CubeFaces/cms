const AccountModel = require('../models/accounts')

module.exports.findAllAccounts = async () => {
    try {
        const accounts = await AccountModel.find();
        return accounts;
    } catch (err) {
        throw new Error('Could not retrieve accounts')
    }
};