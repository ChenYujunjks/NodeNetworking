// db.mjs
import mongoose from 'mongoose';
// connect to the database
mongoose.connect(process.env.DSN);

//My schema goes here!
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  year: Number,
});

mongoose.model('Movie', movieSchema);
