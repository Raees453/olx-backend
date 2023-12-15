require('dotenv').config();

const config = require('config');
const app = require('./app');
const mongoose = require('mongoose');

const dbPassword = process.env.DATABASE_PASSWORD;
const dbUrl = process.env.DATABASE_URL.replace('<password>', dbPassword);

// TODO Integrate Mail (Email Services for Forget & Reset Password)
// TODO Have some routes to fetch user addresses as well, one of them should be a default address also
// TODO Always return basic user details like name, created at, id, image
// TODO Have a separate api for uploading user profile image (it will sharpen or resize the image only)
// TODO For Search Products using Query Params, if find any category, update it's score as well
// TODO Work on Location based filter for products which was not working
// TODO Work & Sort Product's Custom BSON Data
// TODO Remove all the log/print commands
// TODO Always sanitise any object before sending it (remove __v, password, some private inner fields, _id to id, etc)
// TODO Check for Unique Email should return proper message for deleted user

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
