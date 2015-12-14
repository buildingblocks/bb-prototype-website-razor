/**
 * @file Toggle grid
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		toggleGrid: function($object) {
			var self = this,
				$visibleGrid = $('.visible-grid'),
				gridIn = false;

			if (!$visibleGrid.length) {
				return;
			}

			var $btn = $('<button />', {
				'type': 'button',
				'class': 'visible-grid-btn btn btn-small'
			}).text('Toggle Grid');

			bb.settings.$body.append($btn);

			$btn.on('click', function(event) {
				if (gridIn) {
					bb.settings.$body.removeClass('visible-grid-in');
					gridIn = false;
				} else {
					bb.settings.$body.addClass('visible-grid-in');
					gridIn = true;
				}
			});
		}
	});
	$.subscribe('pageReady', function() {
		bb.toggleGrid();
	});
}(jQuery));
