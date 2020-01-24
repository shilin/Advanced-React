require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const server = createServer();

//TODO use express middleware to handle cookies (JWT)

server.express.use(cookieParser());



//TODO use express middleware to populate currrent user

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    req.userId =  userId;
    // console.log('userId', userId);
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port 
    http://localhost:${deets.port}`);
  }
);
