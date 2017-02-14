// var myApp = angular.module('myApp');

myApp.controller('BooksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('BooksController loaded...');
	
	$scope.getBooks = function(){
		$http.get('/api/books/').then(function(success){
			$scope.books = success.data;
			console.log($scope.books);
		}, function(err){
			throw err;
		});
	}
	$scope.getBook = function(){
		var id = $routeParams.id;
		$http.get('api/books/'+id).then(function(success){
			$scope.book = success.data;
			console.log($scope.book);
		},function(err){throw err;});
	}
	$scope.form = {};
	$scope.addBook = function(){
		$http.post('api/books/', $scope.form).then(function(success){
			$scope.book = success.data;
			console.log($scope.book);
			window.location.href = '#/';
		},function(err){
			throw err;
		});
		$scope.form = {};
	}

}]);

