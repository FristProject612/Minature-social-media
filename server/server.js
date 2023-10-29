const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const postRoute = require('./src/routes/postRoute');

const userRoute = require('./src/routes/userRoute');
app.use(cors());

const port = 4000;

// may be important...
// app.use(
//   express.urlencoded(),
//   cors({
//       origin: 'http://localhost:3000'
//   })
// );

app.use(morgan('dev'));
app.use(express.json());

app.use("/post", postRoute);
app.use("/", userRoute);
app.use(express.static('public'));


const data = {
  username: "vjapoor",
  password: "ddRT##4304",
  email: "aproov2@hot.com",
  first_name: "Aproov",
  last_name: "Jain",
  dob: "2003-11-04"
}
const post = {
  userId: 1,
  title: "mysql",
  text: "Mysql is a opensource sql software."
}

// app.post('/', signup);
// app.post('/login', login);
// app.post('/logout', logout);
// app.get('/', authenticateUser, (req, res) => {
//   res.json(req.userData);
// })
// app.post('/refresh', refresh);

// const uploads = multer({ dest: './uploads'})
// app.post('/avtar', authenticateUser, uploads.single('avtar'), uploadAvtar);

app.listen(port);