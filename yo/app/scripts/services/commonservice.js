'use strict';

/**
 * @ngdoc service
 * @name workbenchApp.common
 * @description
 * # common
 * Service in the workbenchApp.
 */
angular.module('yoApp')
  .service('commonservice', function ($http,$q) {
	//表单提交
    this.postData = function(url,data) {
      var deferred = $q.defer();
      $http.post(url,data,{
    	  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    	  transformRequest: function(reqData){return $.param(reqData);}
      }).success( function(res, status, headers, config) {
    	  deferred.resolve(res);
      }).error(function(res) {
    	  deferred.reject(res);
      });
      return deferred.promise;
    };
    
    //json提交
    this.postJson = function(url,data) {
        var deferred = $q.defer();
        $http.post(url, data).success(function(res) {
        	deferred.resolve(res);
		}).error(function(res) {
			deferred.reject(res);
		});
        return deferred.promise;
      };

    //url直接get获取
    this.getData = function(url){
      var deferred = $q.defer();
      $http.get(url).success( function(res) {
    	  deferred.resolve(res);
      }).error(function(res) {
    	  deferred.reject(res);
      });
      return deferred.promise;
    };
    
    /**
     * 用户认证
     */
    this.auth=function(url,credentials){
    	var headers = credentials ? {	authorization : "Basic "+ btoa(credentials.username + ":"+ credentials.password)} : {};
    	var deferred = $q.defer();
		$http.get(url, {
			headers : headers
		}).success(function(res) {
			deferred.resolve(res);
		}).error(function(res) {
			deferred.reject(res);
		});
		return deferred.promise;
	};
});
