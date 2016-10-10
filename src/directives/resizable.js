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
				var divider = angular.element('<div class="divider"></div>'),
					minWidth = null,
					maxWidth = null,
					previousWidth = 0,
					previousX = 0,
					originColumn = null,
					default = {
						minWidth: attrs.minWidth || 20,
						maxWidth: attrs.maxWidth || 200
					};

				element.after(divider);

				divider.on('mousedown', dragstart);

				function dragstart (event) {
					event.preventDefault();

					if (ctrl && !originColumn) {
						originColumn = ctrl.th(ctrl.header).find(function (th) {
							return th.hasClass(attrs.resizable);
						});
					}
					if (minWidth == null) {
						minWidth = parseInt(element.css('min-width'), 10) || default.minWidth;
					}
					maxWidth = parseInt(element.css('max-width'), 10) || default.maxWidth;

					previousWidth = parseInt(element.prop('clientWidth'));
					previousX = event.screenX;

					$document.on('mousemove', drag);
					$document.on('mouseup', dragend);
				}

				function drag (event) {
					var x = event.screenX,
						newWidth = (previousWidth + x - previousX);

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
