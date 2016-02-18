'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('MainCtrl', function ($scope ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    
    //生活服务
    $scope.services = [
    		{'name':'话费','picture':'glyphicon glyphicon-earphone'},{'name':'机票','picture':'glyphicon glyphicon-plane'},
    		{'name':'电影票','picture':'glyphicon glyphicon-film'},{'name':'游戏','picture':'glyphicon glyphicon-hdd'},
    		{'name':'彩票','picture':'glyphicon glyphicon-bookmark'},{'name':'团购','picture':'glyphicon glyphicon-tag'},
    		{'name':'酒店','picture':'glyphicon glyphicon-home'},{'name':'水费','picture':'glyphicon glyphicon-tint'},
    		{'name':'电费','picture':'glyphicon glyphicon-flash'},{'name':'礼品卡','picture':'glyphicon glyphicon-envelope'},
    		{'name':'理财','picture':'glyphicon glyphicon-usd'},{'name':'旅游','picture':'glyphicon glyphicon-user'},
    	];
    //时钟	
    var updateClock = function() {
		$scope.clock = new Date().toLocaleString();
	};
	var timer = setInterval(function() {
		$scope.$apply(updateClock);
	}, 1000);
	updateClock();
    //品牌
    $scope.brands = [
    	{'name':'201.jpg'},{'name':'202.jpg'},{'name':'203.jpg'},{'name':'204.jpg'},{'name':'205.jpg'},{'name':'206.jpg'},
    	{'name':'207.jpg'},{'name':'208.jpg'},{'name':'209.jpg'},{'name':'210.jpg'},{'name':'211.jpg'},{'name':'212.jpg'},
    	{'name':'213.jpg'},{'name':'214.jpg'},{'name':'215.jpg'},{'name':'216.jpg'},{'name':'217.jpg'},{'name':'218.jpg'}
    ]
    
    
  });
