const config = require('config');
const app = require('./app');

app.listen(config.port, () => {
  console.log(`Server Started at port ${config.port}`);
});
