angular.module('libraryApp')
  .controller('BooksIndexController', BooksIndexController);

var endpoint = 'https://super-crud.herokuapp.com/books';

BooksIndexController.$inject=['$http'];
function BooksIndexController( $http ) {
  var vm = this;

  vm.newBook = {};
  vm.newBook = {
    title: "How To Avoid Big Ships [2nd ed.]",
    author: "Cpt. John W. Trimmer",
    image: "http://www.derekhaines.ch/vandal/wp-content/uploads/2012/02/a251_t4.jpg",
    releaseDate: "August 21, 1993"
  };

  $http({
      method: 'GET',
      url: endpoint,
    }).then(function successCallback(response) {
      vm.books = response.data.books;
    }, function errorCallback(response) {
      console.log('There was an error getting the data', response);
    }
  );

  vm.createBook = function () {
    $http({
      method: 'POST',
      url: endpoint,
      data: vm.newBook
    }).then(function successCallback(response) {
      vm.books.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error creating the book', response);
    });
  };
  vm.deleteBook = function(book){
    console.log("DELETING: "+ book._id);
    $http({
      method: 'DELETE',
      url: endpoint + '/' + book._id,
    }).then(function successCallback(response) {
      var index = vm.books.indexOf(book);
      vm.books.splice(index, 1);
    }, function errorCallback(response) {
      console.log('There was an error removing the book:', response);
    });
  };



}//end BooksShowController
