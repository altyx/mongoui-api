const fastify = require('fastify')({
  logger: {
    prettyPrint: true,
  },
});
const Mongoose = require('./controllers/Mongoose');


const cors = require('cors');

fastify.use(cors());

fastify.post('/', (req, res) => {
  const db = new Mongoose(req.body);
  db.connect(res);
});

fastify.get('/close', (req, res) => {
  Mongoose.close(res);
});

fastify.get('/collections', (req, res) => {
  Mongoose.getCollections(res);
});

fastify.get('/data/:id', (req, res) => {
  Mongoose.getData(req.params.id, res);
});

const port = process.env.PORT || 8080;
fastify.listen(port, (err) => {
  if (err) throw err;

  console.log(`server listening on ${fastify.server.address().port}`);
});
