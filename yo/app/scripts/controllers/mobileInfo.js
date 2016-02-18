'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MobileInfoCtrl
 * @description
 * # MobileInfoCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('MobileInfoCtrl', function ($scope , commonservice ,$cookies, ngDialog ,$rootScope, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.getInfo = function(){
    	var mobile = $cookies.get('mobile');
    	if(!mobile){
    		alert('系统错误');
    		return false;
    	};
    	$scope.mobileInfo = JSON.parse(mobile);
      var describe = new Array();
      console.log($scope.mobileInfo);
      describe = $scope.mobileInfo.des.split("，");
      $scope.mobileDes = {
        'cpu': describe[0],
        'screen': describe[1],
        'ram': describe[2],
        'camera': describe[3],
        'element': describe[4],
        'other': describe[5]
      };
      $scope.maxCardID();
    };


    $scope.maxCardID = function(){
        var url = '/shoppingSystem/shoppingCard/maxCardID?userID=' + $rootScope.loginUser.id;
        commonservice.getData(url).then(function(data){
            $rootScope.cardID = data;
        })
    }

    $scope.addPay = function(mobileInfo){
        ngDialog.openConfirm({
          template:'<div class="ngdialog-message">'+
                        '<form role="form" ng-submit="goPay();">'+
                        '<div class="form-group">'+
                              '<p class="form-control-static"><span>商品：</span>{{currentCommodity.name}}({{currentCommodity.norms}})</p>'+
                        '</div>'+
                        '<div class="form-group">'+
                              '<p class="form-control-static"><span>价格：</span>{{currentCommodity.price}}</p>'+
                        '</div>'+
                        '<div class="form-group"><span>数量：<span>'+
                            '<button type="button" class="btn" ng-click="sub();"><span class="glyphicon glyphicon-minus"></span></button>&nbsp'+
                            '<i >{{amount}}</i>&nbsp'+
                            '<button type="button" class="btn" ng-click="plus();"><span class="glyphicon glyphicon-plus"></span></button>'+
                        '</div>'+
                        '<div class="ngdialog-buttons" style="text-align:center">'+
                           '<button type="submit" class="ngdialog-button ngdialog-button-primary" >确认</button>&nbsp&nbsp'+
                            '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消</button>'+
                        '</div>'+
                        '</form>'+
                      '</div>',
            plain:true,
            scope:$scope,
            className: 'ngdialog-theme-plain',
            controller: function($scope){
                $scope.currentCommodity = mobileInfo;
                $scope.amount = 1;
                $scope.sub = function(){
                  if($scope.amount > 1){
                      $scope.amount = $scope.amount - 1 ;
                  }
                };
                $scope.plus = function(){
                    $scope.amount = $scope.amount + 1 ;
                };

                $scope.goPay = function(){
                    $scope.closeThisDialog();
                    $scope.currentCommodity.amount = $scope.amount;
                    console.log($scope.currentCommodity);
                    $cookies.put("commodity", JSON.stringify( $scope.currentCommodity));
                    $cookies.remove("cardIDs");
                    $state.go('pay');
                }
            }
        });
    };

    $scope.addShoppingCard = function(mobileInfo){
        ngDialog.openConfirm({
            template: '<div class="ngdialog-message">'+
                        '<form role="form" ng-submit="addCard();">'+
                        '<div class="form-group">'+
                              '<p class="form-control-static"><span>商品：</span>{{addShopping.name}}({{addShopping.norms}})</p>'+
                        '</div>'+
                        '<div class="form-group">'+
                              '<p class="form-control-static"><span>价格：</span>{{addShopping.price}}</p>'+
                        '</div>'+
                        '<div class="form-group"><span>数量：<span>'+
                            '<button type="button" class="btn" ng-click="sub();"><span class="glyphicon glyphicon-minus"></span></button>&nbsp'+
                            '<i >{{amount}}</i>&nbsp'+
                            '<button type="button" class="btn" ng-click="plus();"><span class="glyphicon glyphicon-plus"></span></button>'+
                        '</div>'+
                        '<div class="ngdialog-buttons" style="text-align:center">'+
                           '<button type="submit" class="ngdialog-button ngdialog-button-primary" >确认</button>&nbsp&nbsp'+
                            '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">取消</button>'+
                        '</div>'+
                        '</form>'+
                      '</div>',
            plain:true,
            scope:$scope,
            className: 'ngdialog-theme-plain',
            controller: function($scope, commonservice, $rootScope){
                $scope.addShopping = mobileInfo;
                $scope.amount = 1;
                $scope.sub = function(){
                  if($scope.amount > 1){
                      $scope.amount = $scope.amount - 1 ;
                  }
                };
                $scope.plus = function(){
                    $scope.amount = $scope.amount + 1 ;
                };

                $scope.addCard = function(){
                    $scope.addShopping.amount = $scope.amount;
                    $scope.addShopping.userID = $rootScope.loginUser.id;
                    $scope.addShopping.cardID = $rootScope.cardID +1 ;
                    console.log($scope.addShopping);
                    commonservice.postData('/shoppingSystem/shoppingCard/addCard',$scope.addShopping).then(function(data){
                        if(data){
                          $scope.closeThisDialog();
                          $scope.findSum();
                          //alert('添加成功');
                          //$cookies.remove("commodity");
                          $state.go('shoppingCard');
                        }
                    })
                };

                $scope.findSum = function(){
                    var url =  '/shoppingSystem/shoppingCard/findSum?userID='+$scope.addShopping.userID;
                    commonservice.getData(url).then(function(data){
                        $rootScope.shoppingCard = data;
                    })
                }

            }
        });
    };

    

})