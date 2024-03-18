// ES6 import
import mongoose from 'mongoose';

// 数据库 URL
const dbUrl = 'mongodb://localhost:27017/hw05';

mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
