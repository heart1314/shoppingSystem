'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MobileCtrl
 * @description
 * # MobileCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('MobileCtrl', function ($scope , commonservice, $cookies) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.brands = [
    	{'name':'苹果','picture':'glyphicon glyphicon-remove'}, {'name':'三星','picture':'glyphicon glyphicon-remove'}, 
        {'name':'华为','picture':'glyphicon glyphicon-remove'}, {'name':'小米','picture':'glyphicon glyphicon-remove'}, 
        {'name':'魅族','picture':'glyphicon glyphicon-remove'},{'name':'oppo','picture':'glyphicon glyphicon-remove'}, 
        {'name':'vivo','picture':'glyphicon glyphicon-remove'}, {'name':'一加','picture':'glyphicon glyphicon-remove'}, 
        {'name':'锤子','picture':'glyphicon glyphicon-remove'}, {'name':'中兴','picture':'glyphicon glyphicon-remove'},
    	{'name':'乐视','picture':'glyphicon glyphicon-remove'}, {'name':'努比亚','picture':'glyphicon glyphicon-remove'}, 
        {'name':'酷派','picture':'glyphicon glyphicon-remove'}, {'name':'索尼','picture':'glyphicon glyphicon-remove'}, 
        {'name':'其他','picture':'glyphicon glyphicon-remove'}
    ];

    $scope.page = {
    	index : 1,
    	size : 10,
    	items : 0
    };

    $scope.showPic = false; //品牌后的X图案默认隐藏

    $scope.unShowPic = function(){
        $scope.showPic = false;
        $scope.brands = [
        {'name':'苹果','picture':'glyphicon glyphicon-remove'}, {'name':'三星','picture':'glyphicon glyphicon-remove'}, 
        {'name':'华为','picture':'glyphicon glyphicon-remove'}, {'name':'小米','picture':'glyphicon glyphicon-remove'}, 
        {'name':'魅族','picture':'glyphicon glyphicon-remove'},{'name':'oppo','picture':'glyphicon glyphicon-remove'}, 
        {'name':'vivo','picture':'glyphicon glyphicon-remove'}, {'name':'一加','picture':'glyphicon glyphicon-remove'}, 
        {'name':'锤子','picture':'glyphicon glyphicon-remove'}, {'name':'中兴','picture':'glyphicon glyphicon-remove'},
        {'name':'乐视','picture':'glyphicon glyphicon-remove'}, {'name':'努比亚','picture':'glyphicon glyphicon-remove'}, 
        {'name':'酷派','picture':'glyphicon glyphicon-remove'}, {'name':'索尼','picture':'glyphicon glyphicon-remove'}, 
        {'name':'其他','picture':'glyphicon glyphicon-remove'}
        ];
        $scope.searchAll();
        $('#zonghe').css("color","#f00");
    }

    $scope.searchAll = function(){
    	commonservice.getData('/shoppingSystem/commodity/findSum').then(function(data){
    		if(!data){
    			alert('系统错误');
    			return;
    		}else{
    			$scope.page.items = data ;
                $scope.state = 0 ; //表示状态,综合查询
                $scope.pageChanged(1);
    		}
    	});
        
    };

    $scope.searchBySaleSum = function(){
        $scope.startPrice = null;
        $scope.endPrice = null;
        $scope.state = 1;//按销量查询
        $scope.pageChanged(1);
    }

    $scope.searchByPrice = function(){
        $scope.startPrice = null;
        $scope.endPrice = null;
        $scope.state = 2; //按价格查询
        $scope.pageChanged(1);
    }

    $scope.searchByPrice2 = function(){
        $scope.startPrice = null;
        $scope.endPrice = null;
        $scope.state = 3;//价格倒序
        $scope.pageChanged(1);
    }

    $scope.searchByBrand = function(brand , picture){
        $scope.startPrice = null;
        $scope.endPrice = null;
        $('#zonghe').css("color","#555");
        $scope.brands = [{ 'name': brand , 'picture': picture} ];
        $scope.showPic = true;
        $scope.brand = brand;
        var url = '/shoppingSystem/commodity/searchSumByBrand?brand='+brand;
        commonservice.getData(url).then(function(data){
            if(!data){
                alert('系统错误');
                return;
            }else{
                console.log(data);
                $scope.page.items = data ;
                $scope.state = 4;//品牌查询
                $scope.pageChanged(1);
            }
        })
    }

    $scope.searchBetweenPrice = function(){
        $scope.betPrice = {
            startPrice : $scope.startPrice,
            endPrice : $scope.endPrice
        }
        if(!$scope.startPrice || !$scope.endPrice || $scope.startPrice < 0 || $scope.endPrice < 0 || $scope.endPrice < $scope.startPrice){
            $scope.tip = '请输入正确价格';
            return;
        }else{
            $scope.tip = '';
           commonservice.postData('/shoppingSystem/commodity/searchSumBetPrice',$scope.betPrice).then(function(data){
                if(!data){
                    alert('系统错误');
                    return;
                }else{
                    console.log(data);
                    $scope.page.items = data ;
                    $scope.state = 5;//价格查询
                    $scope.pageChanged(1)
                }
           });
        }
    }

    $scope.pageChanged = function(index){
    	var offset = (index - 1) * $scope.page.size;
    	$scope.number = {
    		m:offset, 
    		n: $scope.page.size
    	};
    	
        if($scope.state == 0){
            commonservice.postData('/shoppingSystem/commodity/paginationSearch',$scope.number).then(function(data){
                if(!data){
                    alert('系统错误');
                    return;
                }else{
                    $scope.mobiles = data;
                }
            })
        };
        if($scope.state == 1){
            commonservice.postData('/shoppingSystem/commodity/searchBySaleSum',$scope.number).then(function(data){
                if(!data){
                    alert('系统错误');
                    return;
                }else{
                    $scope.mobiles = data;
                }
            })
        };
    	if($scope.state == 2){
            commonservice.postData('/shoppingSystem/commodity/searchByPrice',$scope.number).then(function(data){
                if(!data){
                    alert('系统错误');
                    return;
                }else{
                    $scope.mobiles = data;
                }
            })
        };
        if($scope.state == 3){
            commonservice.postData('/shoppingSystem/commodity/searchByPri',$scope.number).then(function(data){
                if(!data){
                    alert('系统错误');
                    return;
                }else{
                    $scope.mobiles = data;
                }
            })
        };
        if($scope.state == 4){
            $scope.searches = {
                m : $scope.number.m,
                n : $scope.number.n,
                brand : $scope.brand
            }
            console.log($scope.brands);
            commonservice.postData('/shoppingSystem/commodity/searchByBrand',$scope.searches).then(function(data){
                if(!data){
                    alert('系统错误');
                    return;
                }else{
                    $scope.mobiles = data;
                }
            })
        };
        if($scope.state == 5){
            $scope.pagPrice = {
                startPrice : $scope.startPrice,
                endPrice : $scope.endPrice,
                m : $scope.number.m,
                n : $scope.number.n,
            }
            commonservice.postData('/shoppingSystem/commodity/searchBetPrice',$scope.pagPrice).then(function(data){
                if(!data){
                    alert('系统错误');
                    return;
                }else{
                    console.log(data);
                    $scope.mobiles = data;
                }
            })
        }

    };

    $scope.storeInfo = function(mobile){
    	var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + 7);
		$cookies.put('mobile', JSON.stringify(mobile), {
			'expires': expireDate
		});
    };


  });