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
}
