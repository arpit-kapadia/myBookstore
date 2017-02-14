var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//loading models
Genre = require('./models/genre');
Book = require('./models/book');

//initialising app
var app = express();


//seting MW
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

//connecting to the databse
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

//routes
app.get('/', (req, res)=>{
	res.send('Please use api/books or api/genres to get apis...');
});

app.get('/api/genres', (req, res)=>{
	Genre.getGenres((err, genres)=>{
		if(err){
			throw err;
		}
		res.json(genres);	
	});
});
app.post('/api/genres', (req, res)=>{
	var genre = req.body;
	Genre.addGenre(genre, (err, addedGenre)=>{
		if(err) throw err;
		res.json(addedGenre);
	});
});
app.put('/api/genres/:id', (req, res)=>{
	var id = req.params.id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, updatedGenre)=>{
		if(err) throw err;
		res.json(updatedGenre);
	});
});
app.delete('/api/genres/:id', (req, res)=>{
	var id = req.params.id;
	Genre.removeGenre(id, (err, result)=>{
		if(err) throw err;
		res.json(result);
	});
});

app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});
app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, addedBook){
		if(err) throw err;
		res.json(addedBook);
	});
});
app.put('/api/books/:id', (req, res)=>{
	var id = req.params.id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, updatedBook)=>{
		if(err) throw err;
		res.json(updatedBook);
	});
});
app.delete('/api/books/:id', (req, res)=>{
	var id = req.params.id;
	Book.removeBook(id, (err, result)=>{
		if(err) throw err;
		res.json(result);
	});
});

app.get('/api/books/:id', (req, res)=>{
	Book.getBookById(req.params.id, (err, book)=>{
		if(err) throw err;
		res.json(book);
	});
});


//initialising the server
app.listen(3001);

console.log('server is running on port : 3001....');