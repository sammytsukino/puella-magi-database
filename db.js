const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/madokadb')
    .then(() => console.log('Connected!'))
    .catch((err) => console.log(err))
}

module.exports = {connectDB};
