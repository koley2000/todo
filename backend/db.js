const mongoose = require('mongoose');

const connectToMongo = () =>{
    mongoose.connect('mongodb+srv://pravat123:koleyp123@admin.dje3pnr.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('MongoDb Connected!'));
}

module.exports = connectToMongo;