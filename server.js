require('dotenv').config();

const config = require('config');
const app = require('./app');
const mongoose = require('mongoose');

const dbPassword = process.env.DATABASE_PASSWORD;
const dbUrl = process.env.DATABASE_URL.replace('<password>', dbPassword);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connected'))
  .catch(console.error);

const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});
