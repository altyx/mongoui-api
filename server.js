const fastify = require('fastify')();
const cors = require('cors');
const redis = require('redis');
// const Users = require('./controller/Users');


// const Mongoose = require('./db/mongoose');

fastify.use(cors());

fastify.get('/signin', async (req, res) => {
  // const db = new Mongoose(req.body.db);
  // db.connect(res);
  // const users = new Users(req.body);
  // users.signin(res);
  res.code(200).send('helloWorld');
});

const client = redis.createClient('redis://5.135.156.184:6379');

client.on('connect', () => {
  console.log('redis connected');
});

fastify.listen(4000, (err) => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
