// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(con) {
  'use strict';
  var prop, method;
  var empty = {};
  var dummy = function() {};
  var properties = 'memory'.split(',');
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) con[prop] = con[prop] || empty;
  while (method = methods.pop()) con[method] = con[method] || dummy;
})(this.console = this.console || {}); // Using `this` for web workers.

/*! Tiny Pub/Sub - v0.7.0 - 2013-01-29
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2013 "Cowboy" Ben Alman; Licensed MIT */
(function(n){var u=n({});n.subscribe=function(){u.on.apply(u,arguments)},n.unsubscribe=function(){u.off.apply(u,arguments)},n.publish=function(){u.trigger.apply(u,arguments)}})(jQuery);
(function($) {
	jQuery.fn.quickOuterWidth = function(includeMargin) {
		var elem = this.get(0),
			width = elem.offsetWidth;
		if (includeMargin && window.getComputedStyle) {
			var computedStyle = window.getComputedStyle(elem, null);
			width = width + (parseInt(computedStyle.getPropertyValue('margin-left'), 10) || 0) + (parseInt(computedStyle.getPropertyValue('margin-right'), 10) || 0);
		} else if (includeMargin) {
			width = width + (parseInt(elem.currentStyle["marginLeft"]) || 0) + (parseInt(elem.currentStyle["marginRight"]) || 0);
		}
		return width;
	};
}(jQuery));

(function($) {
	jQuery.fn.removeStyle = function(properties) {
		return this.each( function() {
			if(properties) {
				// turn properties into array
				var propertiesArray = properties.split(',');
				// remove each property
				for (var i = 0; i < propertiesArray.length; i++) {
					this.removeProperty( properties[i] );
				}
			}else{
				this.removeAttribute('style');
			}
		});
	};
}(jQuery));

(function($) {
	jQuery.fn.reverse = [].reverse;
}(jQuery));

/**
 * @file Events
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	/**
	 * Publish events using Pub/Sub
	 * @namespace events
	 * @see {@link https://github.com/cowboy/jquery-tiny-pubsub}
	 */
	$.extend(bb, {
		/**
		 * Publish event when the page is ready.
		 * @function pageReady
		 */
		pageReady: function() {
			var self = this;

			$.publish('pageReady_prioritize', self);
			$.publish('pageReady', self);

			self.pageLoaded();
		},
		/**
		 * Publish event when the page has loaded.
		 * @function pageLoaded
		 */
		pageLoaded: function() {
			var self = this;

			self.settings.$window.on('load', function() {

				$.publish('pageLoaded', self);
			});
		},
		/**
		 * Publish event when an AJAX request has finished.
		 * @function ajaxLoaded
		 */
		ajaxLoaded: function() {
			var self = this;

			$.publish('ajaxLoaded', self);
		}
	});
}(jQuery));

/**
 * @file Language
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		language: {}
	});
}(jQuery));

/**
 * @file Settings
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		settings: {
			// cache some common variables
			$window: $(window),
			$html: $('html'),
			$body: $('body'),
			$htmlbody: $('html,body'),
			$page: $('#page'),
			$header: $('#header'),
			$main: $('#main'),
			$footer: $('#footer'),
			// stored URL params (empty to begin with)
			urlParams: {},
			// class to use on
			processedClass: 'processed',
			browserPrefix: null,
			transitionEnd: null,
			animationEnd: null,
			transitionAnimationEnd: null,
			// store processing of last component globally
			processinglastBlock: false,
			// breakpoint variables (should match variables.less)
			breakPointA: 320,
			breakPointB: 480,
			breakPointC: 600,
			breakPointD: 768,
			breakPointE: 1000,
			breakPointF: 1200,
			breakPointG: 1360,
			// store scripts directory
			scriptsDirectory: '',
			// is this a RTL site?
			rtl: false,
			// Perform Modernizr tests once and store the result
			supports: {
				// history: Modernizr.history // for example
			}
		}
	});
}(jQuery));

/**
 * @file Last Block
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Last block in a row.
		 * @namespace lastBlock
		 */
		lastBlock: {
			// jQuery DOM objs
			$blockContainers: null,
			$currentBlockContainer: null,
			// CSS selectors
			blockSelector: '.block',
			containerSelector: '.region-inner',
			lastClass: 'block-last',
			ieLastClass: 'block-last-clear',
			// Configuration
			processing: false,
			roundingOffset: 3,
			/**
			 * Initialises last block module, caches jQuery DOM objects.
			 * @function init
			 * @memberOf lastBlock
			 */
			init: function() {
				var self = this;

				self.$blockContainers = $(self.containerSelector);

				if (!self.$blockContainers) {
					return false;
				}

				self.startProcessing(false);
			},
			/**
			 * Starts processing of blocks and logs start time.
			 * @function startProcessing
			 * @memberOf lastBlock
			 * @param {Boolean} [forceBuild] - whether or not to force a rebuild of blocks.
			 */
			startProcessing: function(forceBuild) {
				var self = this;

				console.time('Processing last blocks');

				self.processing = true;

				if (self.processing || self.$blockContainers.length < 1) {
					self.stopProcessing();
				}

				if (forceBuild) {
					$(self.blockSelector).removeClass(self.lastClass);

					if (bb.ltIE(8)) {
						$('.' + self.ieLastClass).remove();
					}
				}

				self.$blockContainers.each(function() {
					var $blockContainer = $(this),
						$blocks = $blockContainer.find(self.blockSelector),
						blocksLength = $blocks.length,
						blockContainerWidth = null;

					if (blocksLength < 1) {
						self.stopProcessing();
					}

					blockContainerWidth = ($blockContainer.width() - self.roundingOffset);

					self.processBlocks($blocks, blockContainerWidth);
				});
			},
			/**
			 * Stops processing of blocks and logs end time.
			 * @function stopProcessing
			 * @memberOf lastBlock
			 */
			stopProcessing: function() {
				var self = this;

				console.timeEnd('Processing last blocks');

				self.processing = false;

				return false;
			},
			/**
			 * Processes blocks, pushing the last block in a row into setLastBlock.
			 * @function processBlocks
			 * @memberOf lastBlock
			 * @param {Obj} $blocks - jQuery DOM objects of elements to calculate widths from.
			 * @param {Number} blockContainerWidth - max width of containing element to calculate widths from.
			 */
			processBlocks: function($blocks, blockContainerWidth) {
				var self = this;

				if (!$blocks || !blockContainerWidth) {
					self.stopProcessing();
				}

				$blocks.each(function() {
					var $block = $(this);

					if ($block.hasClass('pull-right') || $block.hasClass('block-alt')) {
						return true;
					}

					var outerWidth = parseInt($block.quickOuterWidth(true), 10);

					if (outerWidth >= blockContainerWidth) {
						self.setLastBlock($block);

						return true;
					}

					var positionLeft = parseInt($block.position().left, 10),
						positionRight = Math.round(blockContainerWidth - parseInt(positionLeft + outerWidth, 10));

					if (positionRight > self.roundingOffset) {
						return true;
					}

					self.setLastBlock($block);
				});

				self.stopProcessing();
			},
			/**
			 * Adds CSS class to last block, plus fallbackfor ltIE8.
			 * @function setLastBlock
			 * @memberOf lastBlock
			 * @param {Obj} $block - jQuery DOM object of element to add class to.
			 */
			setLastBlock: function($block) {
				var self = this;

				if (!$block) {
					return false;
				}

				$block.addClass(self.lastClass);

				if (bb.ltIE(8)) {
					$block.after('<div />', {
						'class': self.ieLastClass
					});
				}
			}
		}
	});
	// Subscribe to published events
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.lastBlock.init();
	});
	$.subscribe('viewportResizeEnd', function() {
		bb.lastBlock.startProcessing(true);
	});
}(jQuery));

/**
 * @file Menu module
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Menu related methods.
		 * @namespace menu
		 */
		menu: {
			// jQuery DOM caching
			$handle: null,
			// CSS selectors
			menuInClass: 'menu-in',
			/**
			 * Initialises menu module. Caches jQuery DOM objects.
			 * @function init
			 * @memberof menu
			 */
			init: function() {
				var self = this;
				self.$handle = $('.action-menu');
				self.$handle.on('click.menu', function(event) {
					event.preventDefault();
					if (bb.settings.$html.hasClass(self.menuInClass)) {
						self.closeMenu(event);
					} else {
						self.openMenu(event);
					}
				});
			},
			/**
			 * Adds CSS class to <html>, showing menu.
			 * @function openMenu
			 * @memberof menu
			 */
			openMenu: function() {
				var self = this;
				bb.settings.$html.addClass(self.menuInClass);
			},
			/**
			 * Removes CSS class from <html>, hiding menu.
			 * @function closeMenu
			 * @memberof menu
			 */
			closeMenu: function() {
				var self = this;
				bb.settings.$html.removeClass(self.menuInClass);
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.menu.init();
	});
}(jQuery));

/**
 * @file Monitor Media Queries
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Monitor media queries related methods.
		 * @namespace monitorMq
		 */
		monitorMq: {
			// jQuery DOM caching
			$detector: null,
			// CSS selectors
			detectorClass: 'monitor-mq',
			detectorId: 'monitor_mq',
			// Configuration
			detectorWidth: 0,
			currentBreakpoint: 0,
			previousBreakpoint: 0,
			/**
			 * Initialises monitor media queries module. Caches jQuery DOM objects, calls monitor() on pageReady.
			 * @function init
			 * @memberof monitorMq
			 */
			init: function() {
				var self = this;
				self.$detector = $('#' + self.detectorId);
				self.monitor();
			},
			/**
			 * Creates detector <div> if not present. Updates the comparison variable when a change in screen size occurs.
			 * @function monitor
			 * @memberof monitorMq
			 */
			monitor: function() {
				var self = this;
				if (!self.$detector.length) {
					self.$detector = $('<div />', {
						id: self.detectorId,
						class: self.detectorClass
					});
					bb.settings.$body.append(self.$detector);
				}
				self.detectorWidth = self.$detector.width();
				if (self.detectorWidth !== self.currentBreakpoint) {
					self.previousBreakpoint = self.currentBreakpoint;
					self.currentBreakpoint = self.detectorWidth;
				}
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.monitorMq.init();
	});
	$.subscribe('viewportResizeEnd', function() {
		bb.monitorMq.monitor();
	});
}(jQuery));

/**
 * @file No transitions
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Toggle transitions related methods.
		 * @namespace toggleTransitions
		 */
		toggleTransitions: {
			// CSS selectors
			noTransitionsClass: 'no-transitions',
			/**
			 * Adds CSS class to <html>, disabling transitions.
			 * @function disableTransitions
			 * @memberof toggleTransitions
			 */
			disableTransitions: function() {
				var self = this;

				bb.settings.$html.addClass(self.noTransitionsClass);
			},
			/**
			 * Removes CSS class from <html>, re-enabling transitions.
			 * @function enableTransitions
			 * @memberof toggleTransitions
			 */
			enableTransitions: function() {
				var self = this;

				bb.settings.$html.removeClass(self.noTransitionsClass);
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.toggleTransitions.disableTransitions();
	});
	$.subscribe('pageLoaded', function() {
		bb.toggleTransitions.enableTransitions();
	});
	$.subscribe('viewportResizeStart', function() {
		bb.toggleTransitions.disableTransitions();
	});
	$.subscribe('viewportResizeEnd', function() {
		bb.toggleTransitions.enableTransitions();
	});
}(jQuery));

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

/**
 * @file Checkbox replace
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Checkbox replace related methods.
		 * @namespace replaceCheckbox
		 */
		replaceCheckbox: {
			// CSS Selectors
			processedClass: 'checkbox-replace-input',
			ignoreClass: 'checkbox-replace-ignore',
			/**
			 * Initialises checkbox replace module. Processes <inout type="checkbox">s. Creates `.checkbox-replace` markup.
			 * @function init
			 * @memberof replaceCheckbox
			 */
			init: function() {
				var self = this;

				if (bb.ltIE(9)) {
					return;
				}

				var $inputs = $('input[type=checkbox]:not(.' + self.processedClass + '):not(.' + self.ignoreClass + ')');

				$inputs.each(function() {
					var $input = $(this),
						$placeholder = $('<label />', {
							'class': 'checkbox-replace',
							'for': $input.attr('id'),
							'role': 'presentation'
						});

					$input.addClass(self.processedClass).after($placeholder);
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.replaceCheckbox.init();
	});
}(jQuery));

/**
 * @file Radio replace
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Select replace related methods.
		 * @namespace replaceRadio
		 */
		replaceRadio: {
			// CSS Selectors
			processedClass: 'radio-replace-input',
			ignoreClass: 'radio-replace-ignore',
			/**
			 * Initialises radio replace module. Processes <input type="radio">s. Creates `.radio-replace` markup.
			 * @function init
			 * @memberof replaceRadio
			 */
			init: function() {
				var self = this;

				if (bb.ltIE(9)) {
					return;
				}

				var $inputs = $('input[type=radio]:not(.' + self.processedClass + '):not(.' + self.ignoreClass + '), .checkbox-radio-style:not(.' + self.processedClass + '):not(.' + self.ignoreClass + ')');

				$inputs.each(function() {
					var $input = $(this),
						$placeholder = $('<label />', {
							'for': $input.attr('id'),
							'class': 'radio-replace'
						});

					$input.addClass(self.processedClass).after($placeholder);
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.replaceRadio.init();
	});
}(jQuery));

/**
 * @file Select replace
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Select replace related methods.
		 * @namespace replaceSelect
		 */
		replaceSelect: {
			// CSS Selectors
			processedClass: 'processed',
			numberSpinnerSelector: '.number-spinner',
			/**
			 * Initialises select replace module. Processes <select>s. Creates `.select-replace` markup. Binds events.
			 * @function init
			 * @memberof replaceSelect
			 */
			init: function() {
				var self = this;

				if (bb.ltIE(9)) {
					return;
				}

				var $selects = $('select:not(.' + self.processedClass + '):not([multiple])');

				$selects.each(function() {
					var $select = $(this),
						$numberSpinner = $select.closest(self.numberSpinnerSelector),
						id = $select.attr('id');

					if ($numberSpinner.length) {
						var $numberLabel = $('<span />', {
							'for': $select.attr('id'),
							'class': 'number-spinner-label'
						});

						$select.before($numberLabel);

						var val = $select.find('option:selected').text();

						$numberLabel.text(val);

						$select.on('change.replaceSelect', function() {
							var val = $select.find('option:selected').text();
							$numberLabel.text(val);
						});
					} else {
						var classes = $select.attr('class') ? $select.attr('class') : '',
							$wrapper = $('<span />', {
								'class': 'select-replace ' + classes
							});

						$select.removeAttr('class').wrap($wrapper);
					}

					if (id) {
						var $label = $('label[for="' + id + '"]');

						if ($label) {
							$label.on('click.selects', function(event) {
								$select.trigger('click');
								event.preventDefault();
							});
						}
					}

					$select.addClass(self.processedClass);
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.replaceSelect.init();
	});
}(jQuery));

/**
 * @file Toggle grid
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		toggleGrid: function($object) {
			var self = this,
				$visibleGrid = $('.visible-grid');

			if (!$visibleGrid.length) {
				return;
			}

			var $btn = $('<button />', {
				'type': 'button',
				'class': 'visible-grid-btn btn btn-style-a btn-small'
			}).text('Toggle Grid');

			bb.settings.$body.append($btn);

			$btn.on('click', function(event) {
				bb.settings.$body.toggleClass('visible-grid');
			});
		}
	});
	$.subscribe('pageReady', function() {
		bb.toggleGrid();
	});
}(jQuery));

/**
 * @file Utilities
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Returns a query string parameter’s value if specified, object of query string parameters if not.
		 * @function getUrlParams
		 * @memberof utilities
		 * @param {String} [parameter] Parameter passed in to retrieve from query string
		 * @returns {Obj} [params] | {String} [param]
		 */
		getUrlParams: function(parameter) {
			var queryString = window.location.search;

			if (queryString !== undefined) {
				queryString = window.location.search.replace('?', '');

				var params = {},
					queryStringArray = queryString.split('&');

				for (var index in queryStringArray) {
					var query = queryStringArray[index].split('=');

					params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
				}

				if (parameter) {
					return params[parameter];
				} else {
					return params;
				}
			}
		},
		setUrlParams: function() {
			var self = this;
			self.settings.urlParams = self.getUrlParams(window.location.search);
		},
		/*
		 * Safely outputs message to browser console. Use for debugging/logging.
		 * @function log
		 * @param {String|Object} content - Content to log to browser console.
		 * @param {String} styles - CSS style to apply to text logged to browser console.
		 * @example
		 * bb.log('Hello, World!', 'background:#F00;color:#FF0;');
		 */
		log: function(content, style) {
			if (typeof(console) !== 'undefined') {
				if (style) {
					console.log('%c' + content, style);
				} else {
					console.log(content);
				}
			}
		},
		htmlEncode: function(value) {
			if (value) {
				return $('<div />').text(value).html();
			} else {
				return '';
			}
		},
		htmlDecode: function(value) {
			if (value) {
				return $('<div />').html(value).text();
			} else {
				return '';
			}
		},
		// get IE version from classname (acceptable values: 10,9,8 or 7)
		ltIE: function(version) {
			var self = this;
			if (self.settings.$html.hasClass('lt-ie' + version)) {
				return true;
			} else {
				return false;
			}
		},
		browserPrefix: function() {
			if (window.getComputedStyle) {
				var self = this,
					styles = window.getComputedStyle(window.document.documentElement, ''),
					prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
				self.settings.browserPrefix = '-' + prefix + '-';
			}
		},
		transitionAnimationEndEvent: function() {
			var self = this,
				transition, transitions, animation, animations, element = window.document.createElement('transitionAnimationElement');
			transitions = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'MSTransition': 'msTransitionEnd',
				'OTransition': 'oTransitionEnd',
				'transition': 'transitionend'
			};
			animations = {
				'WebkitAnimation': 'webkitAnimationEnd',
				'MozAnimation': 'animationend',
				'MSAnimation': 'msAnimationEnd',
				'OAnimation': 'oAnimationEnd',
				'animation': 'animationend'
			};
			for (transition in transitions) {
				if (element.style[transition] !== undefined) {
					self.settings.transitionEnd = transitions[transition];
				}
			}
			// is it null?
			if (self.settings.transitionEnd === null) {
				self.settings.transitionEnd = 'noTransitionEnd';
			}
			for (animation in animations) {
				if (element.style[animation] !== undefined) {
					self.settings.animationEnd = animations[animation];
				}
			}
			// is it null?
			if (self.settings.animationEnd === null) {
				self.settings.animationEnd = 'noAnimationEnd';
			}
			self.settings.transitionAnimationEnd = (self.settings.transitionEnd + ' ' + self.settings.animationEnd).toString();
		},
		textDirection: function() {
			var self = this,
				direction = self.settings.$html.attr('dir');
			if (direction === 'rtl') {
				self.settings.rtl = true;
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.textDirection();
		bb.browserPrefix();
		bb.transitionAnimationEndEvent();
		bb.setUrlParams();
	});
}(jQuery));

/**
 * @file Viewport Resize
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Reusable site resize function.
		 * @namespace viewportResize
		 */
		viewportResize: {
			// Configuration
			resizeTimeout: null,
			timeoutDuration: 200,
			/**
			 * Initialises viewport resize module, binds event to window resize.
			 * @function init
			 * @memberOf viewportResize
			 */
			init: function() {
				var self = this;

				bb.settings.$window.on('resize.viewportResize', function() {
					if (self.resizeTimeout) {
						clearTimeout(self.resizeTimeout);
					}

					$.publish('viewportResizeStart');

					self.resizeTimeout = setTimeout(function() {
						$.publish('viewportResizeEnd_prioritize');
						$.publish('viewportResizeEnd');
					}, self.timeoutDuration);
				});
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.viewportResize.init();
	});
}(jQuery));

(function() {
	var init = (bb !== undefined) ? bb.pageReady() : null;
}());
