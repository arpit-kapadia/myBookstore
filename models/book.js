var mongoose = require('mongoose');

//creating Book Schemas 
var bookSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		default: Date.now
	},
	author: {
		type: String,
		required: true
	},
	description:{
		type: String
	},
	genre: {
		type: String,
		required: true
	},
	image_url: {
		type: String
	},
	buy_url: {
		type: String
	} 
});

//creating model

var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
};

module.exports.getBookById = function(id, callback){
	Book.findById(id, callback);
};

//add new book
module.exports.addBook = function(book, callback){
	Book.create(book, callback);
};

//update Book
module.exports.updateBook = function(id, book, options, callback){
	var query = {
		"_id": id
	};
	var update = {
		"name": book.name,
		"author": book.author,
		"genre": book.genre,
		"description": book.description,
		"image_url":book.image_url
	};
	Book.findOneAndUpdate(query, update, options, callback);
};

//delete book
module.exports.removeBook = function(id, callback){
	var query = {
		"_id": id
	}
	Book.remove(query, callback);
};

