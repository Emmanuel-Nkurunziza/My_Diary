import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import router from './routes/challenge3/index';
const app = express();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
dotenv.config();
app.get('/', (req,res) => {
    return res.status(200).send({
        status: 200,
        message: 'Welcome to My_Diary'
    })
});

const port = process.env.PORT || 3000;

app.listen(port,console.log(`app is listening on port ${port}`));