const express = require('express');
const morgan = require('morgan');
const app = express();
const user = require('./src/database/user')
const { signup, login, logout, authenticateUser, refresh } = require('./src/middleWares/userAuth')

const port = 4000;
app.use(morgan('dev'));
app.use(express.json());

const data = {
  username: "vjapoor",
  password: "ddRT##4304",
  email: "aproov2@hot.com",
  first_name: "Aproov",
  last_name: "Jain",
  dob: "2003-11-04"
}

app.post('/', signup);
app.post('/login', login);
app.post('/logout', logout);
app.get('/', authenticateUser, (req, res) => {
  res.json(req.userData);
})
app.post('/refresh', refresh);
app.listen(port);