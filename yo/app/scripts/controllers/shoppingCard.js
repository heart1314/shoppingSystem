'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:ShoppingCardCtrl
 * @description
 * # ShoppingCardCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
	.controller('ShoppingCardCtrl', function($scope, commonservice,$rootScope,ngDialog, $cookies , $state) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

	$scope.findAll = function(){
		var url = '/shoppingSystem/shoppingCard/findAll?userID='+ $rootScope.loginUser.id;
		commonservice.getData(url).then(function(data){
			$scope.cards = data;
			//console.log($scope.cards);
		})
		$scope.getCardSum();
	}

	$scope.getCardSum = function(){//获取当前购物车记录总数，显示在右上角“我的购物车”按钮上
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


	$scope.deleteCard = function(card){
		$scope.delCard  = {
			userID: card.userID,
			cardID: card.cardID
		}
		//console.log($scope.delCard);
		commonservice.postData('/shoppingSystem/shoppingCard/delCard',$scope.delCard).then(function(data){
			if(data){
				$scope.findAll();
			}
		})
	};

	$scope.goToPay = function(){
		$rootScope.cardIDs = '';
		var flag = false;
		$('.cardbox').each(function(){
			if($(this).is(':checked')){
				$rootScope.cardIDs =  $rootScope.cardIDs + $(this).val()+',';
				flag = true;
			}
		})
		
		if(!flag){
			alert('请至少勾选一件购物车商品');
		}else{
			$cookies.put("cardIDs", $rootScope.cardIDs);
			$cookies.remove("commodity");
			$state.go('pay');
		}
	};

	// $scope.calSum = function(val){
	// 	var cards = $scope.cards;
	// 	for(var i = 0; i<cards.length ; i++){
	// 		if(cards[i].cardID == val){
	// 			$scope.sum = $scope.sum + cards[i].sum;
	// 		}
	// 	}
	// };

	// $scope.delete = function(){
	// 	commonservice.postData('/shoppingSystem/shoppingCard/delete',$scope.calCard).then(function(data){
	// 		//暂缺
	// 	})
	// };


	// $scope.cal = function(){
	// 	ngDialog.openConfirm({
	// 		template:'<div class="ngdialog-message">'+
	// 						'<p>共计<span style="color:red">&nbsp{{amount}}&nbsp</span>件商品，合<span style="color:red">&nbsp{{sum}}&nbsp</span>元</p>'+
	// 						'&nbsp<a class="btn" ng-click="closeThisDialog()">取消</a>'+
	// 						'&nbsp<a class="btn" >立即支付</a>'+
	// 					'</div>',
	// 		plain: 'true',
	// 		scope:$scope,
	// 		className: 'ngdialog-theme-plain',
	// 		controller:function(){
	// 			//支付功能暂缺
	// 		}
	// 	})
	// }

})