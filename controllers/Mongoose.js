const MongooseService = require('../services/MongooseService');

module.exports = class Mongoose {
  constructor(data) {
    this.data = { ...data };
  }

  async connect(res) {
    const mongooseService = new MongooseService(this.data);
    try {
      await mongooseService.connect();
      res.code(200).send('ok');
    } catch (e) {
      res.code(401).send('unable to connect');
    }
  }

  static close(res) {
    MongooseService.close()
      .then(() => {
        res.code(200).send('ok');
      })
      .catch(() => {
        res.code(500);
      });
  }

  static async getCollections(res) {
    const collections = [];

    const data = await MongooseService.getCollections().catch(error => res.code(401).send(error));
    data.forEach((s) => {
      collections.push(s.s.name);
      return collections;
    });
    res.code(200).send(collections);
  }

  static async getData(collection, res) {
    const data = await MongooseService.getData(collection).catch(err => console.log(err));
    res.code(200).send(data);
  }
};
