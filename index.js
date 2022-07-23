import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from 'cors';

const PORT = 3000;
const app = express();
const token = '';




app.use(cors())
app.use(bodyParser.json())






app.get('/callback', (req, res) => {
    const _code = req.query.code;


    if (_code) {
        // const _value = fetchToken(_code).then((resp) => resp.json()).then((result) => {
        //     return result;
        //     // res.send({
        //     //     'data': JSON.stringify(result)
        //     // });

        //     // res.json(JSON.parse(result));
        // });
        // console.log(_value);

        let events = [{
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.5112"
        }, {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.5112"
        }, {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.5112"
        }, {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.5112"
        }, ];
        // res.json(events);


        // const res = fetchToken(_code)
        //     .then((resp) => resp.json())
        //     .then((result) => {
        //         const {
        //             status,
        //             access_token
        //         } = result;
        //         token = access_token;
        //         if (status !== 200) {
        //             return res.status(status).json(result);
        //         }
        //         return res.status(status).json(result);
        //     });

        // console.log(res);

        fetchToken(_code)
            .then((resp) => resp.json())
            .then((result) => {
                // res.json({
                //     'data': result
                // });
                res.json(result);
                // var stringified = JSON.stringify(result);
                // var parsedObj = JSON.parse(stringified);
                // console.log(parsedObj);
                // res.json(events);
                // return result;
                // const {
                //     status,
                //     access_token
                // } = result;
                // token = access_token;
                // if (status !== 200) {
                //     return res.status(status).json(result);
                // }
                // return res.status(status).json(result);
            });
        // res.send({
        //     'data': 'have code'
        // });
    } else {
        res.send({
            'data': 'not have code'
        });
    }

});


function fetchToken(code) {
    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    formData.append("redirect_uri", "http://localhost:4200/callback");
    formData.append("client_id", "jGoREF5Y5mgX9DSLnBEOAz");
    formData.append(
        "client_secret",
        "bNbO9SFsYbuSss3VT5AMdgFL9wKo4vEabH1AY92FlOi"
    );

    return fetch("https://notify-bot.line.me/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
    });
}






app.listen(PORT, () => {
    console.log('Listen on ' + PORT);
});