import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';


// set up the express app
const app = express();

app.use(bodyParser.json());// in a json format

app.use('/api/v1', router);

app.get('/', (req, res) => res.status(200).send({
  status: 200,
  message: 'Welcome to my Diary',
}));
const port = process.env.PORT || 3000;
app.listen(port, console.log(`app is listening on port ${port}`));

export default app;
