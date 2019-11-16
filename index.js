const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

/**
 * Parser em dados JSON;
 */
app.use(bodyParser.json());

/**
 * Twitter Routes
 */
const twitterRoute = require('./src/routes/twitterRoute');

/**
 * Setando rotas com prefixos
 */
app.use('/api/v1/', twitterRoute);

/**
 * Iniciando o serviço
 */
app.listen(port, () => {
    console.log(`Connect on port ${port}`)
});
