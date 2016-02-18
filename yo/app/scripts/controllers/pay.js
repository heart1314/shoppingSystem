'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:PayCtrl
 * @description
 * # PayCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('PayCtrl', function ($scope, commonservice,$rootScope,ngDialog, $cookies , $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.order = {
    	userID : '',
    	addressID : '',
    	cards : '',
    	sum : '',
    	state : 0
    }


    $scope.dataLoad = function(){
    	$scope.getLoginUser();
    	$scope.findTolerantAddress();
    	$scope.findCommodityList();
    	$scope.findCommodity();
    }

    $scope.getLoginUser = function(){
    	var user = $cookies.get('loginUser');
        if(!user){
            return false;
        }
        $rootScope.loginUser = JSON.parse(user);
    }

    $scope.findTolerantAddress = function(){
    	var url = "/shoppingSystem/address/findTolerantAddress?userID="+$rootScope.loginUser.id;
    	commonservice.getData(url).then(function(data){
    		if(data){
    			$rootScope.address = data;
    		}
    	})
    }

    //查找当前立即购买的商品
    $scope.findCommodity = function(){
    	var c = $cookies.get('commodity');
    	if(!c){
    		$scope.commodity = null;
    		return;
    	}
    	$scope.commodity = JSON.parse(c);
    	$scope.order.cards = $scope.commodity.id;
    	$scope.sum($scope.commodity);
    }

    //计算需立即购买的商品的总价
    $scope.sum = function(commodity){
    	$scope.number = commodity.amount;
    	$scope.amount = commodity.amount * commodity.price;
    }

    //查找购物车中选中的商品
    $scope.findCommodityList = function(){
    	var ids = $cookies.get('cardIDs');
    	if(!ids){
    		$scope.commoditys = null;
    		return;
    	}
    	//$scope.order.cards = ids;
    	$scope.ids = {
    		userID: $rootScope.loginUser.id,
    		cards: ids
    	}
    	console.log($scope.ids);
    	commonservice.postData('/shoppingSystem/shoppingCard/findCommodityList',$scope.ids).then(function(data){
    		if(data){
    			$scope.commoditys = data;
    			$scope.cal(data);
    		}
    	})
    }

    //计算购物车选中商品的总价
    $scope.cal = function(data){
    	$scope.amount = 0;
    	$scope.number = 0;
    	for(var i = 0 ; i < data.length; i++){
    		$scope.amount = $scope.amount + data[i].sum;
    		$scope.number = $scope.number + data[i].amount;
            $scope.order.cards = $scope.order.cards + data[i].commodityID+",";
    	}  	
    }

    //选择收货地址
    $scope.chooseAdd = function(){
    	ngDialog.openConfirm({
    		templateUrl:'chooseAdd.html',
    		scope: $scope,
			className: 'ngdialog-theme-plain',
			controller:function($scope, commonservice){
				$scope.addIDs = {
					addressID : 0,
					userID : $rootScope.loginUser.id
				}

				$scope.searchAdd = function(){
					var url = '/shoppingSystem/address/findAllByUserID?id='+$rootScope.loginUser.id;
					commonservice.getData(url).then(function(data){
						if(data){
							$scope.adds = data;
						}else{
							$scope.closeThisDialog();
							alert("系统错误");
						}
					});

					$scope.choose = function(id){
						$('#'+id).css("border","1px solid red");
						$('#u1 div').each(function(){
							if($(this).attr('id') != id){
								$(this).css("border","1px dashed #ccc");
							} 
						})
						$scope.addIDs.addressID= id;
					};

					$scope.replaceAdd = function(){
						//console.log($scope.addIDs);
						commonservice.postData('/shoppingSystem/address/findAddress', $scope.addIDs).then(function(data){
							if(data){
								$scope.closeThisDialog();
								$rootScope.address = data;
							}
						});
					};

				}
			}
    	});
    };

    //支付弹窗
    $scope.payOrder = function(){
    	if(!$rootScope.address){
    		alert("请选择一个收货地址");
    		return;
    	}
		$scope.addOrder();
    };

    //生成订单存入数据库
    $scope.addOrder = function(){
    	$scope.order.userID = $rootScope.loginUser.id;
    	$scope.order.addressID = $rootScope.address.addressID;
		$scope.order.sum = $scope.amount;    	
		console.log($scope.order);
		commonservice.postData('/shoppingSystem/order/addOrder',$scope.order).then(function(data){
			//console.log(data);
			if(data){
				$scope.deleteShoppingCard();
			}
		});
    };


    //删除购物车内的数据
    $scope.deleteShoppingCard = function(){
    	if($scope.ids){
    		commonservice.postData('/shoppingSystem/shoppingCard/delete', $scope.ids).then(function(data){
    			if(data){
    				$scope.openPayPanel();
    			}else{
    				alert('系统错误');
    			}
    		});
    	}else{
    		$scope.openPayPanel();
    	}
    };

    $scope.openPayPanel = function(){
    	ngDialog.openConfirm({
    		templateUrl: 'payOrder.html',
    		scope: $scope,
			className: 'ngdialog-theme-plain',
			controller: function($scope){
				$scope.close = function(){
					$scope.closeThisDialog();
					$state.go('order');
				}

				$scope.refer = function(){
					$scope.closeThisDialog();
					commonservice.getData('/shoppingSystem/order/updateOrder').then(function(data){
						if(data){
							$state.go('order');
						}
					});	
				}
			}
    	});
    };


  });