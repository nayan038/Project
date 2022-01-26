// var http=require("http");

// var server=http.createServer(function (res,req){

//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.write("Hello India ");

//     res.end();
// }).listen(7979);

// console.log("Server listen 7979");
var express = require('express');  
var app = express(); 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db1', { useNewUrlParser: true } );
//var id='5d5cd7c1e282c10ff3d4d6f5';
var db = mongoose.connection;
db.on('error', (e)=>{
	console.log(e)
});

var BookSchema = mongoose.Schema({
	  name: String,
	  price: Number,
	  quantity: Number
	}); 
var Book = mongoose.model('Book', BookSchema, "books"); 

app.get("/",function(req,res){
	//INSERT	
	var book1 = new Book({ name: 'Mongoose', price: 1000, quantity: 25 }); 
	book1.save(function (err, book) {
	      if (err) return console.error(err);
	      id=book._id;
		  console.log(book._id + " saved to books collection.");
			      
	      res.send(book.name + " saved to books collection.")
	    }); 	
})


app.get("/getall",function(req,res){
	//Get all
	Book.find(function (err, books) {
  		if (err) return console.error(err);
  		console.log(books);
  		res.send(books);
	})
	
});
app.listen(8000);

//change with app.post app.get . test with postman
// make another application with model route and controller separate