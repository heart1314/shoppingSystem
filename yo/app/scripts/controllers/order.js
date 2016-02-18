'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('OrderCtrl', function ($scope, commonservice,$rootScope,ngDialog, $cookies , $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.searchOrder = function(){
    	var url = '/shoppingSystem/order/findAllByUserID?userID=' + $rootScope.loginUser.id;
    	commonservice.getData(url).then(function(data){
    		if(data){
    			$scope.orders = data;
    			$scope.replaceDate();
    		}
    	})
    }

    $scope.replaceDate = function(){
    	for(var i=0 ; i<$scope.orders.length; i++){
    		var time = $scope.orders[i].date;
    		var date = new Date(time);
    		$scope.orders[i].date =  date.toLocaleString();
    	}
    }

    $scope.orderInfo = function(order){
    	$scope.showID = order.orderID;
    	$scope.addIDs = {
    		userID: $rootScope.loginUser.id,
    		addressID: order.addressID
    	}
    	commonservice.postData('/shoppingSystem/address/findAddress',$scope.addIDs).then(function(data){
    		if(data){
    			$scope.nowAdd = data;
    		}
    	})

    	var url = '/shoppingSystem/commodity/findCommodityList?cards=' + order.cards;
    	commonservice.getData(url).then(function(data){
    		if(data){
    			$scope.nowInfo = data;
    		}
    	})

    }

  });