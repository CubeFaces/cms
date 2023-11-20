const mongoose = require('mongoose');

const initiateConnection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);
        console.log('fucking finally')
    } catch (error) {
        console.log(error);
    }
}
module.exports = initiateConnection;