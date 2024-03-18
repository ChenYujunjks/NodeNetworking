import mongoose from 'mongoose';

// 定义用户模型
const { Schema } = mongoose;
const userSchema = new Schema({
  name: String, // 定义一个名为name的字段，类型为String
  age: Number,  // 定义一个名为age的字段，类型为Number
});
const User = mongoose.model('User', userSchema);

// 连接到MongoDB数据库
mongoose.connect('mongodb://localhost:27017/hw05')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// 创建和保存新用户
const newUser = new User({
  name: 'Alice',
  age: 30
});
newUser.save()
  .then(() => console.log('User saved'))
  .catch(err => console.error(err));
  
// 查询所有年龄大于20岁的用户
User.find({ age: { $gt: 20 } })
  .then(users => console.log(users))
  .catch(err => console.error(err));

// 更新用户信息
User.updateOne({ name: 'Alice' }, { age: 31 })
