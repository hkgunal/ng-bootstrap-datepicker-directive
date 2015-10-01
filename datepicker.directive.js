define(['jquery','angular'], function ($, angular) {

	var ngDatePicker = angular.module('ngBootstrap.directives', []);

	ngDatePicker.directive('ngDatePicker', function(){
		return {
			restrict : 'E',
			require : 'ngModel',
			scope: {
				ngModel: '=',
				ngChange: '&'
			},
			replace: true,
			template: function(element, attrs) {
				if(angular.isDefined(attrs.id)===false){
					console.error("ngDatePicker error : id attribute not found!");
					return "";
				}
				if(angular.isDefined(attrs.name)===false){
					console.error("ngDatePicker error : name attribute not found!");
					return "";
				}
				var divId = attrs.id;
				var viewMode = 0;
				
				if(angular.isDefined(attrs.viewMode)){
					viewMode = parseInt(attrs.viewMode);
				}
				var dateFormat = "dd.mm.yyyy";
				if(viewMode === 1){
					dateFormat = "yyyymm";
				}
				var htmlText = '<div id="'+divId+'" class="input-group date" data-date-format="'+dateFormat+'">' +
					'<input type="text" class="form-control" name="'+attrs.name+'" '+
					'ng-model="ngModel" '+
					'ng-pattern="/^((0[1-9])|([12][0-9])|(3[01]))(.)((0[1-9])|(1[12]))(.)([12][0-9][0-9][0-9])$/" '+
					' required/>'+
					'<span class="input-group-btn"><button class="btn btn-primary" type="button" '+
					'ng-click="showDatePicker(\'#'+divId+'\','+viewMode+')">&nbsp;<i class="fa fa-calendar"></i>' +
					'</button></span></div>';
				return htmlText;
			},
			link: function($scope, element, attrs, ngModel) {
				$scope.showDatePicker = function (elementID, minViewMode) {
					if(minViewMode == undefined){
						minViewMode = 0;
					}
					$(elementID).datepicker({
						minViewMode: minViewMode,
						autoclose: true
					}).on('changeDate', function(ev){
						$scope.$apply(function () {
							ngModel.$setViewValue(ev.format());
						});
					});
					$(elementID).datepicker('show');
				};
			}
		}
	});
	
	return ngDatePicker;
});