angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

var endpoint = 'https://super-crud.herokuapp.com/books';

BooksShowController.$inject=['$http', '$routeParams', '$location'];
function BooksShowController($http, $routeParams, $location) {
  var vm = this;
  $http({
    method: 'GET',
    url: endpoint + '/' + $routeParams.id,
  }).then(function successCallback(response) {
    vm.book = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.editBook = function (book) {
  $http({
    method: 'PUT',
    url: endpoint + '/' + $routeParams.id,
    data: book
  }).then(function successCallback() {
    console.log("successfully edited book");
  }, function errorCallback(response) {
    console.log('There was an error editing the data', response);
  });
};

vm.deleteBook = function(book){
  console.log("DELETING: "+ $routeParams.id);
  $http({
    method: 'DELETE',
    url: endpoint + '/' + $routeParams.id,
  }).then(function successCallback(response) {
    console.log("response",response.data);
    $location.path('/');
  }, function errorCallback(response) {
    console.log('There was an error removing the book:', response);
  });
};

}
