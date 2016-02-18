'use strict';

/**
 * @ngdoc function
 * @name workbenchApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('navCtrl', function ($scope,$rootScope,$cookies,commonservice) {

  	$scope.checkLogin = function(){

    	var user = $cookies.get('loginUser');
    	if(!user){
            $rootScope.shoppingCard = 0;
    		return false;
    	}
    	$rootScope.loginUser = JSON.parse(user);
    	if($rootScope.loginUser){
  	//	console.log($rootScope.loginUser);
    		return true;
    	}else{
    		return false;
    	}
    };
    
    $scope.checkManager = function(){
    	if(!$rootScope.loginUser){
    		return false;
    	}else{
    		if($rootScope.loginUser.role == 'manager'){
    			return true;
    		}else{
    			return false;
    		}
    	}
    };
    
    $scope.showCard = function(){
        if($rootScope.shoppingCard != 0){
            return true;
        }else{
            return false;
        }
    };


    $scope.getCardSum = function(){
        var user = $cookies.get('loginUser');
        if(!user){
            return false;
        }
        $rootScope.loginUser = JSON.parse(user);
        //console.log($rootScope.loginUser);
        var url = '/shoppingSystem/shoppingCard/findSum?userID='+ $rootScope.loginUser.id;
        commonservice.getData(url).then(function(data){
                $rootScope.shoppingCard = data;
            
        })
     };


  })