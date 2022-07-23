import express, {
    json
} from "express";
import bodyParser from "body-parser";
import fetch, {
    Headers
} from "node-fetch";
import cors from 'cors';
const PORT = 3000;
const app = express();


app.use(cors())
app.use(bodyParser.json())


app.get('/callback', (req, res) => {
    const _code = req.query.code;
    if (_code) {
        fetchToken2(_code)
            .then((resp) => resp.json())
            .then((result) => {
                _chexkStatus(result['access_token']).then(response => response.text())
                    .then((respon) => {
                        res.send({
                            token: result['access_token'],
                            value: JSON.parse(respon)
                        })
                    }).catch(error => console.log('error', error));
            });
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


function fetchToken2(code) {
    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    formData.append("redirect_uri", "http://localhost:4200/callback");
    formData.append("client_id", "jSjjh1k9G1NRcnBunJCu1n");
    formData.append(
        "client_secret",
        "AB3wcbVasm4U7YVPQUTIqy020k41OVrydQSJ0YI7hMt"
    );

    return fetch("https://notify-bot.line.me/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
    });
}

function _chexkStatus(_token) {
    const meta = {
        'Content-Type': 'text/xml',
        'Authorization': 'Bearer ' + _token
    };
    const head = new Headers(meta);
    var requestOptions = {
        method: 'GET',
        headers: head,
        redirect: 'follow'
    };
    return fetch("https://notify-api.line.me/api/status", requestOptions);

}



app.listen(PORT, () => {
    console.log('Listen on ' + PORT);
});