'use strict';

/**
 * @ngdoc directive
 * @name workbenchApp.directive:btnCvs
 * @description
 * # btnCvs
 */
angular.module('yoApp')
  .directive('btnCvs', function () {
    return {
      template: '<input class="btn" type="button" ng-click="tableToExcel()" style="margin-left:30px" value="报表导出">',
      restrict: 'E',
      replace: true,
//      scope:{
//    	  show: '@show',
//      },
      controller: function($scope){
    	  //将表格导出为excel文件,title和content请根据实际页面来选取
          $scope.tableToExcel = function() {
          	var title = $('select option:selected').text();//获取页面中select的文本,作为表名
          	var content = $('table');//选取页面中的table
          	if(!content.html()){
          		alert('请先查询报表');
          		return;
          	}
          	var uri = 'data:application/vnd.ms-excel;base64,',
          		template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" '+
          		   'xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'+
                     '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'+
          		   '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>'+
                     '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'+
          		   '</head><body><table>{table}</table></body></html>',
          		base64 = function(s) {
          			return window.btoa(unescape(encodeURIComponent(s)))
          		},
          		format = function(s, c) {
          			return s.replace(/{(\w+)}/g, function(m, p) {
          				return c[p];
          			})
          		};
          	var ctx = {
          		worksheet: title,
          		table: content.html()
          	};
          	window.location.href = uri + base64(format(template, ctx));
          }
      },
      
      link: function postLink(scope, element, attrs) {
        //element.text('this is the btnCvs directive');
      }
    };
  });
