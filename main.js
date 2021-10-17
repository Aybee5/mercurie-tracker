const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const routes = require('./routes');
const {auth} = require('./middlewares/auth');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use(auth);
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;