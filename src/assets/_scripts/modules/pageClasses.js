/**
 * @file Page classes
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		pageReadyClass: function() {
			var self = this;

			self.settings.$html.addClass('page-ready');
		},
		pageLoadedClass: function() {
			var self = this;

			self.settings.$html.addClass('page-loaded');
		}
	});
	$.subscribe('pageReady', function() {
		bb.pageReadyClass();
	});
	$.subscribe('pageLoaded', function() {
		bb.pageLoadedClass();
	});
}(jQuery));
