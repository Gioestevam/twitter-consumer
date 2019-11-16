/**
 * Express
 */
const express = require('express');
const router = express.Router();

/**
 * Controllers
 */
const { searchTweet, retweet, twitterBot } = require('../controllers/twitterController');

router.get('/retweets/:id', (req, res) => retweet(req, res)); //Rota para retweetar um tweet
router.post('/search_tweets', (req, res) => searchTweet(req, res)); //Rota para buscar tweets
router.post('/twitter_bot/tweets', (req, res) =>  twitterBot(req, res)); //Rota para retweetar tweets automático

module.exports = router; //Exportando rotas