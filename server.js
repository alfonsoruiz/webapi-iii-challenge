const express = require('express');
const server = express();
server.use(express.json());
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

//Custom middleware. Request handler functions are also part of the middlware chain.
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  // Run next middlware function
  next();
}

// Sets logger custom middlware globally to run on all request
server.use(logger);

server.use('/posts', postRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
