import express from 'express';
import bodyParser from 'body-parser';
import controllers from './controllers/postItController';

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

controllers(app);
app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
