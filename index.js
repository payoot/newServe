import {
    Express
} from "express";
import {
    bodyParser
} from "body-parser";

const app = Express();

app.listen(3000, () => {
    console.log('Listen on 3000');
});