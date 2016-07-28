(function (angular) {
	'use strict';

	angular.module('sticky-header')
		.factory('_', Factory);
		
	Factory.$inject = [];

	function Factory() {
		return _;
	}
})(angular);
