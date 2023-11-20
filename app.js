const express = require('express');
const dotenv = require('dotenv');


const initiateConnection = require('./config/db')
dotenv.config({
    path: './config/.env'
})

const accountsRouter = require('./routes/accounts')
const sessionsRouter = require('./routes/sessions')
const usersRouter = require('./routes/users')
const VTRouter = require('./routes/verificationTokens')

const PORT = process.env.PORT;

const app = express();

app.use('/accounts', accountsRouter)
app.use('/sessions', sessionsRouter)
app.use('/users', usersRouter)
app.use('/VT', VTRouter)
app.listen(PORT, async () => {
    console.log(`Server started on this dick ${PORT}`)
    await initiateConnection();
})