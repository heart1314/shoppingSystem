'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:SetCtrl
 * @description
 * # SetCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
	.controller('UserInfoCtrl', function($scope, $cookies, commonservice,$rootScope,ngDialog) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	
		//个人信息
		$scope.load = function() {
			var user = $cookies.get('loginUser');
			$scope.currentUser = JSON.parse(user);
			commonservice.postData('/shoppingSystem/user/findUserById', $scope.currentUser).then(function(data) {
				if (data) {
					$scope.currentUser = data;
					var birthday = '';
					if ($scope.currentUser.birthday) {
						var date = new Date($scope.currentUser.birthday);
						birthday = date.toLocaleDateString();
						$('#birthday').val(birthday);
					};
				} else {
					alert('系统错误');
					return;
				}
			});

		}

		$scope.updateUserInfo = function() {
			var time = $('#birthday').val();
			$scope.currentUser.birthday = time;
			console.log($scope.currentUser);
			commonservice.postData('/shoppingSystem/user/updateUser', $scope.currentUser).then(function(data) {
				if (data) {
					alert('信息设置成功')
				} else {
					alert('信息设置失败')
				}
			})
		}

		


	});