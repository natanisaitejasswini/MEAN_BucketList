var app = angular.module('app', [])
app.factory('productFactory','$http', function($http) {
  var factory = {};
  var products = [];
  factory.index = function(callback){
    //callback is the function that is passed to the productIndex by the controller, in this caseP: setProducts.
    callback(products);
  }
  factory.create = function(product, callback){
    if(product.price && Number(parseFloat(product.price))==product.price){
      products.push(product);
      callback(products);
    }
  }
  factory.delete = function(id, callback){
    products.splice(id,1);
    callback(products);
  }
  return factory;
});

app.controller('productController', ['productFactory', productController]);

function productController(productFactory){
  // callback, but not as an anonymous function, rather a named function!
  var _this = this;
  function setProducts(data){
    _this.products = data;
    _this.product = {};
  }
  this.product = {};
  this.products = {};

  productFactory.index(setProducts);
 // since these both reference a private function, setProducts, they cannot be moved into prototype.
  this.create = function(){
    productFactory.create(this.product, setProducts);
  };

  this.delete = function(id){
    productFactory.delete(id,setProducts);
  };

}
