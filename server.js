
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const controllers = require('./Server/controllers/postItController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
controllers(app);
app.listen(port, () => {
  console.log(`we are live on ${port}`);
});
