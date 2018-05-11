'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
admin.initializeApp(functions.config().firebase);

exports.games = functions.https.onRequest(function(req, res){
    var options = {
        url: "https://lichess.org/games/export/" + req.query.username,
        headers: {
            'Authorization': 'Bearer sX0DkQk9aKvyCJjf',
            'Accept': 'application/json'
        }
    };
    return request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.status(200).send(info);
        }
    });
});





