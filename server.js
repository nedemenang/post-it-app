
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

//const routes = require('./Server/Routes/postItRoutes');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//routes(app);

app.listen(port, () => {
  console.log('we are live on '+ port);
});
