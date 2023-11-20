const SessionsModel = require('../models/sessions')

module.exports.findAllSessions = async () => {
    try {
        const sessions = await SessionsModel.find();
        return sessions;
    } catch (err) {
        throw new Error('Could not retrieve sessions')
    }
};