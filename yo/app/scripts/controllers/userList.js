'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:userListCtrl
 * @description
 * # userListCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
	.controller('UserListCtrl', function($scope, commonservice, ngDialog) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		$scope.roles = [{
			'name': '所有用户',
			'type': '0'
		}, {
			'name': '管理员',
			'type': '1'
		}, {
			'name': '普通用户',
			'type': '2'
		}];

		$scope.types = {
			type: "0"
		};

		$scope.searchUser = function() {
			commonservice.postData('/shoppingSystem/user/findAll', $scope.types).then(function(data) {
				$scope.rows = data;
				console.log($scope.rows);
			})
		};

		$scope.deleteUser = function(delId) {
			$scope.delId = delId;
			var requestUrl = '/shoppingSystem/user/deleteUser' + '?delId=' + delId;
			commonservice.getData(requestUrl).then(function(data) {
				if (data) {
					alert('删除成功');
					$scope.searchUser();
				} else {
					alert('删除失败')
				}
			})
		};

		$scope.addUser = function() {
			ngDialog.openConfirm({
				templateUrl: 'addUser.html',
				scope: $scope,
				className: 'ngdialog-theme-plain',
				controller: function($scope, commonservice) {
					$scope.title = '添加用户';
					$scope.add = function(newUser) {
						$scope.user = newUser;
						if (!$scope.user.mail) {
							$scope.user.mail = null;
						}
						if (!$scope.user.birthday) {
							$scope.user.birthday = null;
						}
						if (!$scope.user.sex) {
							$scope.user.sex = null;
						}
						if (!$scope.user.mobile) {
							$scope.user.mobile = null;
						}
						console.log($scope.user);
						if (!$scope.user.role) {
							$scope.tip = '请检查必填项是否填写完整';
							return;
						} else {
							commonservice.postData('/shoppingSystem/user/insertUser', $scope.user).then(function(data) {
								if (data) {
									$scope.closeThisDialog();
									alert('添加成功');
									$scope.searchUser();
								} else {
									alert('添加失败');
								}
							})
						}
					}
				}
			})
		};

		$scope.editUser = function(row) {
			ngDialog.openConfirm({
				templateUrl: 'addUser.html',
				scope: $scope,
				className: 'ngdialog-theme-plain',
				controller: function($scope, commonservice) {
					var birthday = '';
					if (row.birthday) {
						var date = new Date(row.birthday);
						birthday = date.toLocaleDateString();
					}
					$scope.row = {
						id: row.id,
						username: row.username,
						password: row.password,
						mobile: row.mobile,
						mail: row.mail,
						birthday: birthday,
						sex: row.sex,
						role: row.role
					};
					$scope.title = '编辑用户';
					$scope.add = function(row) {
						$scope.user = row;
						console.log($scope.user);
						if (!$scope.user.role) {
							$scope.tip = '请检查必填项是否填写完整';
							return;
						} else {
							commonservice.postData('/shoppingSystem/user/updateUser', $scope.user).then(function(data) {
								if (data) {
									alert('修改成功');
									$scope.closeThisDialog();
									$scope.searchUser();
								} else {
									alert('修改失败');
								}
							})
						};
					};
				}
			})
		};

		//$scope.itemsByPage=15;
		$scope.testExport = function(){
			var json2xls = require('json2xls');
			var json = $scope.rows;
			console.log(json);
			var xls = json2xls(json);
			fs.writeFileSync('data.xlsx', xls, 'binary');
		}

	});