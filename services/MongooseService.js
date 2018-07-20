const mongoose = require('mongoose');

module.exports = class MongooseService {
  constructor(data) {
    this.host = data.host || 'localhost';
    this.port = data.port || '27017';
    this.database = data.database || '';
  }

  connect() {
    mongoose.Promise = global.Promise;
    return mongoose.connect(`mongodb://${this.host}:${this.port}/${this.database}`);
  }

  static close() {
    return mongoose.connection.close();
  }

  static getCollections() {
    return mongoose.connection.db.collections();
  }

  static async getData(collection) {
    if (mongoose.connection.models[collection]) {
      delete mongoose.connection.models[collection];
    }
    const schema = new mongoose.Schema({});
    const model = await mongoose.model(collection, schema, collection);
    const data = await model.find({});

    return data;
  }
};
