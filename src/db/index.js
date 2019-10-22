const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const db = MongoClient.connect(url);
