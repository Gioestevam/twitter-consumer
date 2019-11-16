/**
 * Package Twitter
 */
const Twitter = require('twit');
const config = require('../config/twitter_config'); //Configuração de autenticação
const T = new Twitter(config); //Instancio a classe Twitter passando a configuração;

/**
 * @param {object} req request
 * @param {object} res response
 */
exports.searchTweet = (req, res) => {
    const { hashtag, count } = req.body;

    let params = { 
        q: hashtag,
        count: count
    };

    T.get('search/tweets', params, (err, data) => {
        if (err) {
            const errResult = {
                code: err.stack,
                message: err.message
            }

            return res.status(500).send(errResult);
        }

        return res.status(200).send(data);
    });
}

/**
 * @param {object} req request
 * @param {object} res response
 */
exports.retweet = (req, res) => {
    const { id } = req.params;

    let params = { 
        id: id
    };

    T.post(`statuses/retweet/:id`, params, (err, data) => {
        if (err) {
            const errResult = {
                code: err.stack,
                message: err.message
            }

            return res.status(500).send(errResult);
        }
    
        const result = {
            message: data.text
        }

        return res.status(200).send(result);
    });
}

/**
 * @param {object} req request
 * @param {object} res response
 */
exports.twitterBot = (req, res) => {
    const { hashtag } = req.body;

    let params = { 
        q: hashtag
    };

    T.get('search/tweets', params, (err, data) => {
        if (err) {
            const errResult = {
                code: err.stack,
                message: err.message
            }

            return res.status(500).send(errResult);
        }

        const tweets = data.statuses;

        tweets.forEach(element => {
            let params = {
                id: element.id_str
            };

            T.post(`statuses/retweet/:id`, params, (err, data) => {
                if (err) {
                    const errResult = {
                        message: err.message
                    }
        
                    return res.status(500).send(errResult);
                }
            }); 
        });

        return res.status(200).send({
            'message': 'Retweets successfully'
        });
    });
};