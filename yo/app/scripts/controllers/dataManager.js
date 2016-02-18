'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:DataManagerCtrl
 * @description
 * # DataManagerCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('DataManagerCtrl', function ($scope , commonservice , ngDialog , Upload) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

   $scope.roles = [{
			'name': '手机',
			'type': '0'
		}, {
			'name': '手机配件',
			'type': '1'
		}, {
			'name': '相机',
			'type': '2'
		}, {
			'name': '音响',
			'type': '3'
		}, {
			'name': '智能设备',
			'type': '4'
		}];

		$scope.types = {
			type: "0"
		};

	$scope.searchMobile = function(){
		commonservice.getData('/shoppingSystem/commodity/findAll').then(function(data){
			if(!data){
				alert('系统错误');
				return;
			}else{
				$scope.rows = data;
			}
		})
	};

	$scope.addMobile = function(){
		$scope.title = "添加手机";
		$scope.mobile = null;
		ngDialog.openConfirm({
			templateUrl: 'addMobile.html',
			scope: $scope,
			className: 'ngdialog-theme-plain',
			controller: ['$scope', function($scope){
				$scope.removePicture = function(){
					//console.log(123);
					this.picture = null;
				};
				$scope.removeShow = function(){
					this.show = null;
				};
				$scope.uploadPic = function(file){
					console.log($scope.picture);
					file.upload = Upload.upload({
                		url: '/shoppingSystem/commodity/savePic',
                		data: {'picture': file},
           		 	});
					file.upload.then(function(data){
						console.log(data);
					})
				};
				$scope.uploadShow = function(show){
					show.upload = Upload.upload({
						url: '/shoppingSystem/commodity/saveShow',
						data: {'show': show}
					});
					show.upload.then(function(data){
						console.log(data);
					})
				};
				$scope.sub = function(){
					$scope.mobile.note = null;
					$scope.mobile.picture = $scope.picture.name;
					$scope.mobile.casePic = $scope.show.name;
					$scope.mobile.saleSum = 0;
					console.log($scope.mobile);
					commonservice.postData('/shoppingSystem/commodity/addCommodity', $scope.mobile).then(function(data){
						if(!data){
							alert('系统错误');
						}else{
							$scope.closeThisDialog();
							alert('添加成功');
							$scope.searchMobile();
						}
					});
				}
			}]
		});
	}

	$scope.editMobile = function(row){
		$scope.title = "编辑手机";
		$scope.mobile = row;
		ngDialog.openConfirm({
			templateUrl: 'addMobile.html',
			scope: $scope,
			className: 'ngdialog-theme-plain',
			controller: ['$scope', function($scope){
				var listingDate = '';
				if (row.date) {
					var date = new Date(row.date);
					listingDate = date.toLocaleDateString();
				}
				$scope.mobile.listingDate = listingDate;
				$scope.removePic = function(){
					$scope.mobile.picture = null;
				};
				$scope.removeShow = function(){
					$scope.mobile.casePic = null;
				};
				$scope.sub = function(){
					if(!$scope.mobile.picture){
						$scope.mobile.picture = $scope.picture.name;
					}
					if(!$scope.mobile.casePic){
						$scope.mobile.casePic = $scope.show.name;
					}
					console.log($scope.mobile);
					commonservice.postData('/shoppingSystem/commodity/editCommodity',$scope.mobile).then(function(data){
						if(!data){
							alert('系统错误');
						}else{
							$scope.closeThisDialog();
							alert('修改成功');
							$scope.searchMobile();
						}
					});
				}
			}]
		});
	}

	$scope.deleteMobile = function(id){
		ngDialog.openConfirm({
			template: '<div class="ngdialog-message">'+
							'<p><span class="glyphicon glyphicon-warning-sign" style="color:red"></span>&nbsp确定删除该商品?<p>'+
							'&nbsp<a class="btn" ng-click="closeThisDialog()">取消</a>'+
							'&nbsp<a class="btn" ng-click="delete();">确定</a>'+
						'</div>',
			plain: 'true',
			scope:$scope,
			className: 'ngdialog-theme-plain',
			controller: ['$scope', function($scope){
				$scope.delete = function(){
					commonservice.postData('/shoppingSystem/commodity/deleteCommodity',{'id':id}).then(function(data){
						if(!data){
							alert('系统错误');
						}else{
							$scope.closeThisDialog();
							alert('删除成功');
							$scope.searchMobile();
						}
					});
				}	
			}]
		});
	}


})