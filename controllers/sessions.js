const sessionsService = require('../services/sessions');

module.exports.getSessions = async (req, res) => {
    try {
        const sessions = await sessionsService.findAllSessions();
        res.send({ sessions });
    } catch (err) {
        res.status(500);
        res.send({
            error: err
        })
    }
}