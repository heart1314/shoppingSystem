'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:AddressManagerCtrl
 * @description
 * # AddressManagerCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
	.controller('AddressManagerCtrl', function($scope, commonservice,$rootScope,ngDialog) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		//地址管理
		$scope.searchAddress = function(){
			commonservice.postData('/shoppingSystem/address/findAllByUserID',$rootScope.loginUser).then(function(data){
				if(!data){
					
					return;
				}else{
					$scope.address = data;
				}
			});
			commonservice.postData('/shoppingSystem/address/sumAddress',$rootScope.loginUser).then(function(data){
				if(!data){
					
					return;
				}else{
					$scope.sum = data;
				}
			})
		};
		
		$scope.setAddress = function(add){
			$scope.setAdd = add;
			//console.log($scope.setAdd);
			commonservice.postData('/shoppingSystem/address/setAddress',$scope.setAdd).then(function(data){
				if(data){
					$scope.searchAddress();
				}else{
					alert('系统错误');
				}
			})
		};
		
		$scope.editAddress = function(add){
			$scope.editAdd = add;
			ngDialog.openConfirm({
				template:'<div class="ngdialog-message">'+
							'<h4>编辑收货地址</h4>'+
							'<form role="form" ng-submit="edit();">'+
								'<div class="form-group"><p>收货人：</p>'+
									'<input type="text" ng-model="editAdd.name" required placeholder="editAdd.name"></div>'+
								'<div class="form-group"><p>手机：</p>'+
									'<input type="text" ng-model="editAdd.mobile" required placeholder="editAdd.mobile"></div>'+
								'<div class="form-group"><p>收货地址：</p>'+
									'<select name="province" required id="province"></select>'+
									'<select name="city" required id="city"></select>'+
									'<select name="area" id="area"></select></div>'+
								'<div class="form-group" style="width:80%"><p>详细地址：</p>'+
									'<input type="text" ng-model="editAdd.address" required placeholder="editAdd.address" style="width:100%"></div>'+
								'<div class="form-group"><p>邮编：</p>'+
									'<input type="text" ng-model="editAdd.zipCode" required placeholder="editAdd.zipCode"></div>'+
								'<div class="form-group">'+
									'<input type="submit" class="btn btn-info" value="确定"></div>'+
							'</form></div>'+
							'<script type="text/javascript">new PCAS("province","city","area");</script>',
				plain:true,
				//templateUrl:'operateAddress.html',
				scope:$scope,
				className: 'ngdialog-theme-plain',
				controller: function($scope, commonservice){
					$scope.edit = function(){
						$scope.editAdd.province = $('#province').val();
						$scope.editAdd.city = $('#city').val();
						$scope.editAdd.area = $('#area').val();
						console.log($scope.editAdd);
						commonservice.postData('/shoppingSystem/address/modifyAddress',$scope.editAdd).then(function(data){
							if(data){
								$scope.closeThisDialog();
								alert('修改成功');
								$scope.searchAddress();
							}else{
								alert('修改失败');
							}
						})
					};
				}
			});
		};

		$scope.deleteAddress = function(add){
			$scope.deleteAdd = add;
			ngDialog.openConfirm({
				template: '<div class="ngdialog-message">'+
							'<p><span class="glyphicon glyphicon-warning-sign" style="color:red"></span>&nbsp确定删除该收货地址?<p>'+
							'&nbsp<a class="btn" ng-click="closeThisDialog()">取消</a>'+
							'&nbsp<a class="btn" ng-click="delete();">确定</a>'+
						'</div>',
				plain: 'true',
				scope:$scope,
				className: 'ngdialog-theme-plain',
				controller: function($scope){
					$scope.delete = function(){
						commonservice.postData('/shoppingSystem/address/deleteAddress',$scope.deleteAdd).then(function(data){
							if(data){
								$scope.closeThisDialog();
								alert('删除成功');
								$scope.searchAddress();
							}else{
								alert('删除失败');
							}
						})
					};
				}
			});
		};

		$scope.addAddress = function(){
			ngDialog.openConfirm({
				template : '<div class="ngdialog-message"> '+
								'<h4>新增收货地址</h4>'+
							'<form role="form" ng-submit="add();">'+
							'<div class="form-group">'+
								'<p>收货人：</p>'+
								'<input type="text" ng-model="address.name" required>'+
							'</div>'+
							'<div class="form-group">'+
								'<p>手机：</p>'+
								'<input type="text" ng-model="address.mobile" required>'+
							'</div>'+
							'<div class="form-group">'+
								'<p>收货地址：</p>'+
								'<select name="province" required id="province"></select>'+
								'<select name="city" required id="city"></select>'+
								'<select name="area" required id="area"></select>'+
							'</div>'+
							'<div class="form-group">'+
								'<p>详细地址：</p>'+
								'<input type="text" ng-model="address.address" required>'+
							'</div>'+
							'<div class="form-group">'+
								'<p>邮编：</p>'+
								'<input type="text" ng-model="address.zipCode" required>'+
							'</div>'+
							'<div class="form-group">'+
								'<button class="btn" ng-click="closeThisDialog()">取消</button>&nbsp'+
								'<button class="btn btn-info" type="submit">确定</button>'+
							'</div></form></div>'+
							'<script type="text/javascript">new PCAS("province","city","area");</script>',
				plain:true,
				scope:$scope,
				className:'ngdialog-theme-plain',
				controller: function($scope, commonservice , $rootScope){
					$scope.address = {
						id: $rootScope.loginUser.id,
						addressID: '',
						name: '',
						mobile: '',
						province: '',
						city:'',
						area:'',
						zipCode:'',
						address:'',
						tolerant:'0'
					};
					$scope.add = function(){
						$scope.address.province = $('#province').val();
						$scope.address.city = $('#city').val();
						$scope.address.area = $('#area').val();
						commonservice.postData('/shoppingSystem/address/maxAddressID',$scope.address).then(function(data){
							 // console.log(data);
							 // if(!data){
							 // 	alert('系统错误');
							 // 	return;
							 // }else{
							 	console.log(data);
							 	$scope.address.addressID = data + 1;
							 	if($scope.address.addressID > 10){
							 		alert('您的收货地址数目已达上限');
							 		return;
							 	}else{
							 		//console.log($scope.address);
							 		commonservice.postData('/shoppingSystem/address/insertAddress', $scope.address).then(function(data){	
										if(data){
											$scope.closeThisDialog();
											alert('添加成功');
											$scope.searchAddress();
										}else{
											alert('添加失败');
										}
									});
							 	}
							// }
						});
					};
				}
			});
		};

	})