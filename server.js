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

fastify.get('/', async (req, res) => {
  res.code(200).send('helloworld/');
});
const client = redis.createClient('redis://5.135.156.184:6379');

client.on('connect', () => {
  console.log('redis connected');
});
const port = process.env.PORT || 8080;
fastify.listen(port, (err) => {
  console.log('port d ecoute sur heroku', port);
  if (err) {
    console.log('error log:', err);
    console.log('fastify server log:', fastify.server.address());
    client.set('task', err, (error) => {
      throw error;
    });
  }
  console.log(`server listening on ${fastify.server.address().port}`);
});
