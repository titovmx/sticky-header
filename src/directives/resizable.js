(function (angular) {
	'use strict';

	angular.module('sticky-header')
		.directive('resizable', Resizable);

	Resizable.$inject = ['$document'];

	function Resizable ($document) {
		return {
			restrict: 'A',
			require: '^?stickyHeader',
			link: function (scope, element, attrs, ctrl) {
				var divider = angular.element('<div class="divider"></div>');

				var minWidth = 0,
					maxWidth = 0,
					previousWidth = 0,
					previousX = 0,
					originColumn = null;

				element.after(divider);

				divider.on('mousedown', dragstart);

				function dragstart (event) {
					event.preventDefault();

					if (ctrl && !originColumn) {
						originColumn = ctrl.th(ctrl.header).find(function (th) {
							return th.hasClass(attrs.resizable);
						});
					}
					if (!minWidth) {
						minWidth = parseInt(element.css('min-width'), 10);
					}
					maxWidth = parseInt(element.css('max-width'), 10);

					previousWidth = parseInt(element.prop('clientWidth'));
					previousX = event.screenX;

					$document.on('mousemove', drag);
					$document.on('mouseup', dragend);
				}

				function drag (event) {
					var x = event.screenX;

					var newWidth = (previousWidth + x - previousX);
					if (attrs.allowReduce || newWidth >= minWidth) {
						newWidth += 'px';
						var style = {
							'max-width': newWidth,
							'min-width': newWidth,
							'width': newWidth
						};
						element.css(style);

						if (originColumn) {
							originColumn.css(style);
						}
					}
				}

				function dragend () {
					$document.off('mousemove', drag);
					$document.off('mouseup', dragend);
				}

				scope.$on('$destroy', function () {
					divider.off('mousedown', dragstart);
					$document.off('mousemove', drag);
					$document.off('mouseup', dragend);
				});
			}
		}
	}
})(angular);
