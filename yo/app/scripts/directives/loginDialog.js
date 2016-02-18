'use strict';

/**
 * @ngdoc directive
 * @name workbenchApp.directive:loginDialog
 * @description
 * # loginDialog
 */
angular.module('yoApp')
	.directive('loginDialog', function() {
		return {
			restrict: 'A',
			controller: function($rootScope, $scope, commonservice, $cookies, ngDialog) {
				$scope.openLoginPanel = function() {//登陆
					ngDialog.openConfirm({
						template: '<div class="ngdialog-message">' +
							'<h4>登陆</h4>' +
							'<form role="form" ng-submit="login();">' +
							'<div class="form-group" style="text-align:center"><span>用户名：</span>'+
								'<input type="text" ng-model="loginUser.username" required placeholder="{{loginUser.username}}"></div>' +
							'<div class="form-group" style="text-align:center"><span>密&nbsp码：</span>'+
								'<input type="password" required placeholder="{{loginUser.password}}"></div>' +
							'<div class="checkbox" style="text-align:center"><label>'+
								'<input type="checkbox" ng-model="check">记住我</label></div>' +
							'<div class="form-group" style="text-align:center"><p style="color:red">{{tip}}</p>' +
								'<input type="submit" class="btn btn-info" value="登陆"></div>' +
							'</form>' +
							'</div>',
						plain: true,
						scope: $scope,
						className: 'ngdialog-theme-plain',
						controller: function($scope, commonservice, $cookies,$rootScope) {
							$scope.loginUser = {
								username: '',
								password: ''
							};
							if($rootScope.privateUser){//注册成功后自动填写登陆账户密码
								$scope.loginUser = $rootScope.privateUser;
							}
							$scope.login = function() {
								commonservice.postData('/shoppingSystem/user/findUserByUsername', $scope.loginUser).then(function(data) {
									//console.log(data);
									if (!data) {
										$scope.tip = '用户名或密码错误';
									} else {
										$scope.tip = '';
										$scope.closeThisDialog();
										if ($scope.check) {
											var expireDate = new Date();
											expireDate.setDate(expireDate.getDate() + 7);
											$cookies.put('loginUser', JSON.stringify(data), {
												'expires': expireDate
											});

										} else {
											$cookies.put('loginUser', JSON.stringify(data));
										}
										var url = '/shoppingSystem/shoppingCard/findSum?userID='+data.id;
											commonservice.getData(url).then(function(sum){
												//console.log(sum);
												$rootScope.shoppingCard = sum;//查询当前账号的购物车
											})
									};
								})
							};
						}
					});
				};

				$scope.logout = function() {//切换账户
					$cookies.remove('loginUser');
					$scope.openLoginPanel();
				};

				$scope.register = function() {//注册
					ngDialog.openConfirm({
						template: '<div class="ngdialog-message">' +
							'<h4>注册</h4>' +
							'<form role="form" ng-submit="register();">' +
							'<div class="form-group" style="text-align:center"><span>用户名：</span>' +
								'<input type="text" required ng-model="registerUser.username"></div>' +
							'<div class="form-group" style="text-align:center"><span>密&nbsp码：</span>' +
								'<input type="password" required ng-model="registerUser.password"></div>' +
							'<div class="form-group" style="text-align:center"><p style="color:red">{{tip}}</p>' +
								'<input type="submit" class="btn btn-info" value="注册"></div>' +
							'</form>' +
							'</div>',
						plain: true,
						scope: $scope,
						className: 'ngdialog-theme-plain',
						controller: function($scope, commonservice,$rootScope){
							$scope.registerUser = {
								username:'',
								password:''
							};
							$scope.register = function(){
								commonservice.postData('/shoppingSystem/user/findUserByUsername',$scope.registerUser).then(function(data){
									//console.log(data);
									if(data){
										$scope.tip = '用户名已存在';
									}else{
										$scope.tip = '';
										commonservice.postData('/shoppingSystem/user/registerUser',$scope.registerUser).then(function(data){
											if(data){
												$scope.closeThisDialog();
												alert('注册成功');
												$rootScope.privateUser = $scope.registerUser;
												$scope.openLoginPanel();
											}else{
												alert('注册失败')
											}
										})
									};
								})
							};
						}
					});
				};
				
				$scope.openModifyPanel = function(){//修改密码
					ngDialog.openConfirm({
						template:'<div class="ngdialog-message">' +
							'<h4>修改密码</h4>' +
							'<form role="form" ng-submit="modify();">' +
							'<div class="form-group" style="text-align:center"><span>原&nbsp密&nbsp码：</span>' +
								'<input type="password" required ng-model="pwd.password1" placeholder="请输入原密码" ng-blur="checkPassword();"></div>' +
							'<div class="form-group" style="text-align:center"><span>新&nbsp密&nbsp码：</span>' +
								'<input type="password" required ng-model="pwd.password2" placeholder="请输入新密码"></div>' +
							'<div class="form-group" style="text-align:center"><span>确认新密码：</span>'+
								'<input type="password" required ng-model="pwd.password3" placeholder="请再输入一次新密码"></div>'+
							'<div class="form-group" style="text-align:center"><p style="color:red">{{tip}}</p>' +
								'<input type="reset" class="btn" value="取消" ng-click="closeThisDialog()">&nbsp'+
								'<input type="submit" class="btn btn-info" value="确认"></div>' +
							'</form>' +
							'</div>',
						plain:true,
						className: 'ngdialog-theme-plain',
						controller:function($rootScope, $scope, commonservice){
							$scope.pwd = {
								username:$rootScope.loginUser.username,
								password1:'',
								password2:'',
								password3:''
							};
							
							var flag;
							$scope.checkPassword = function(){
								commonservice.postData('/shoppingSystem/user/findUserByUsername',$scope.pwd).then(function(data){
									if(!data){
										alert('系统错误');
										flag = false;
									}else{
										if(data.password != $scope.pwd.password1){
											$scope.tip = '原密码输入错误';
											flag = false;
										}else{
											$scope.tip = '';
											flag = true;
										}
									}
								});
							};
							$scope.modify = function(){
								if(!flag){
									return;
								}
								if($scope.pwd.password2 != $scope.pwd.password3){
									$scope.tip = '两次输入的新密码不一致';
									return;
								}else{
									$scope.tip = '';
									commonservice.postData('shoppingSystem/user/modifyPassword',$scope.pwd).then(function(data){
										if(data){
											$scope.closeThisDialog();
											alert('密码修改成功');	
										}else{
											alert('密码修改失败');
										}
									})
								}
							};
						}
					})
				};
				
				
			}
		}
	})