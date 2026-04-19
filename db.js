const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/madokadb';
  await mongoose.connect(uri)
    .then(() => console.log('Connected!'))
    .catch((err) => console.log(err))
}

module.exports = {connectDB};
