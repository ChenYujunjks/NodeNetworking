import './config.mjs';
import './db.mjs'  //connect database
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
const app = express();
const port = process.env.PORT || 3000;
//set hbs render
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your secret key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

const Movie = mongoose.model('Movie');

app.get('/movies', async (req, res) => {
    let query = {};
    if (req.query.director) {
        query.director = req.query.director;
    }
    let directorFilter= req.query.director;
    try {
        const movies = await Movie.find(query);
        //console.log(directorFilter); testing directorFilter
        res.render('movies', { movies, directorFilter });
    } catch(e) {
        res.status(500).send(e.message);
    }
});

// get add form
app.get('/movies/add', (req, res) => {
    res.render('addMovie');
});

// deal with post add form
app.post('/movies/add', async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        if (!req.session.movies) {
            req.session.movies=[];
        }
        // save movie to session
        req.session.movies.push(movie);
        res.redirect('/movies');
    } catch (e) {
        res.status(500).send(e.message);
    }
});
app.get('/mymovies', (req,res)=>{
    res.render('myMovies', { movies: req.session.movies || [] });
});


app.listen(port, ()=>{
    console.log(`Server is listening on port ${process.env.PORT ?? 3000}`)
});
