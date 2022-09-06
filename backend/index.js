require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const api = require('./api');

app.use('/api', api);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`\n[server] runnning on http://localhost:${port}\n`);
});
