'use strict';

/**
 * @ngdoc overview
 * @name yoApp
 * @description
 * # yoApp
 *
 * Main module of the application.
 */
angular
  .module('yoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'smart-table',
    'ngDialog',
    'ui.bootstrap',
    'ngFileUpload'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
     
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'views/main.html',
      		controller: 'MainCtrl',
      		controllerAs: 'main'
        })
        .state('userList', {
            url: '/userList',
            templateUrl: 'views/dataManager/userList.html',
      		controller: 'UserListCtrl',
      		controllerAs: 'userList'
        })
        .state('userInfo', {
            url: '/userInfo',
            templateUrl: 'views/userInfo.html',
      		controller: 'UserInfoCtrl',
      		controllerAs: 'userInfo'
        })
        .state('userInfo.baseInfo', {
            url: '/baseInfo',
            views: {
                    'baseInfoView':{
                        templateUrl: 'views/userInfo/baseInfo.html',
                    }
                },  
        })
        .state('shoppingCard', {
            url: '/shoppingCard',
            templateUrl: 'views/shoppingCard.html',
            controller: 'ShoppingCardCtrl',
            controllerAs: 'shoppingCard'
        })
        .state('pay', {
            url: '/pay',
            templateUrl: 'views/pay.html',
            controller: 'PayCtrl',
            controllerAs: 'pay'
        })
        .state('order', {
            url: '/order',
            templateUrl: 'views/order.html',
            controller: 'OrderCtrl',
            controllerAs: 'order'
        })
        .state('userInfo.addressManager', {
            url: '/addressManager',
            views: {
                    'addressView':{
                        templateUrl: 'views/userInfo/addressManager.html',
                        controller: 'AddressManagerCtrl',
                        controllerAs: 'addressManager'
                    }
                },  
        })
        .state('dataManager', {
            url: '/dataManager',
            templateUrl: 'views/dataManager.html',
            controller: 'DataManagerCtrl',
            controllerAs: 'dataManager'
        })
        .state('dataManager.mobile', {
            url: '/dataManager/mobile',
            views: {
                    'mobileView':{
                        templateUrl: 'views/dataManager/dataMobile.html',
                    }
                },  
        })
        .state('mobile', {
            url: '/mobile',
            templateUrl: 'views/mobile.html',
      		controller: 'MobileCtrl',
      		controllerAs: 'mobile'
        })
         .state('mobileInfo', {
            url: '/mobileInfo/:mobile',
            templateUrl: 'views/mobileInfo.html',
            controller:'MobileInfoCtrl',
            controllerAs:'mobileInfo'
        });
         
       
    $urlRouterProvider.otherwise('main');
})
 
