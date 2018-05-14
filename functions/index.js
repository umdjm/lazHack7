'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
admin.initializeApp(functions.config().firebase);

exports.games = functions.https.onRequest(function(req, res){
    var options = {
        url: "https://lichess.org/games/export/" + req.query.username,
        headers: {
            'Accept': 'application/x-ndjson'
        }
    };
    request(options, function(error, response, body) {
        if (error || response.statusCode != 200) {
            return res.status(response.statusCode);
        }

        res.status(200)
            .set('Access-Control-Allow-Origin', "*")
            .set('Access-Control-Allow-Methods', 'GET, POST')
            .type('text/plain')
            .send(body)
    });
});





