import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/index';

console.log(process.env.NODE_ENV);


const app = express();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

dotenv.config();
app.get('/', (req, res) => res.status(200).send({
  status: 200,
  message: 'Welcome to My_Diary',
}));

const port = process.env.PORT || 3000;

app.listen(port, process.stdout.write(`app is listening on port ${port}`));

export default app;
