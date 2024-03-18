// ES6 import
import mongoose from 'mongoose';

// 连接到MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // 我们已连接到数据库
  console.log('Connected to the database');

  // 获取数据库列表
  const adminDb = db.db.admin();
  console.log(adminDb);
  adminDb.listDatabases(function(err, result) {
    if (err) {
        console.error("Error listing databases:", err);
        return;
    }
    console.log('Databases:', result.databases);
    mongoose.connection.close(); // 关闭连接
  });
});
