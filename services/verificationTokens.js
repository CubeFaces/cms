const VTModel = require('../models/verificationTokens')

module.exports.findAllTokens = async () => {
    try {
        const tokens = await VTModel.find();
        return tokens;
    } catch (err) {
        throw new Error('Could not retrieve accounts')
    }
};