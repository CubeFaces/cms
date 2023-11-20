const tokensServices = require('../services/verificationTokens');

module.exports.getTokens = async (req, res) => {
    try {
        const tokens = await tokensServices.findAllTokens();
        res.send({ tokens });
    } catch (err) {
        res.status(500);
        res.send({
            error: err
        })
    }
}