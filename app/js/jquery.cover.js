(function ($) {
	'use strict';
	
	function Cover($container, $image, options) {
		options = options || {};
		
		this.settings  = $.extend({
			wrapperClass : "cover-wrapper",
			updateOnResize : true,
			resize : true,
			align  : true
		}, options);
		
		this.container = $container.addClass("width");
		this.wrapper   = $("<div class='" + this.settings.wrapperClass + "' />");
		this.image     = $image;
		
		this.imageRatio = 0;
		this.init();
	}
	
	Cover.prototype = {
		
		init : function () {
			var me = this;
			if ((this.image.width() > 0) && (this.image.height() > 0)) {
				this.imageRatio = this.image.height() / this.image.width();
			}
			this.container.children().wrapAll(this.wrapper);
			this.wrapper = this.image.parent();
			this.update();
			
			if (this.settings.updateOnResize) {
				$(window).on("resize", function () {
					me.update();
				});
			}
		},
		
		align : function () {
			
			console.log(this.image.height());
			
			this.wrapper.css({
				marginTop  : (this.container.height() - this.image.height()) / 2,
				marginLeft : (this.container.width() - this.image.width()) / 2
			});
		},
		
		update : function () {
			if (this.imageRatio !== 0) {
				var newClass = this.container.height() / this.container.width() >= this.imageRatio ? "height" : "width",
					currentClass = this.container.hasClass("height") ? "height" : "width";
				
				if (this.settings.resize) {
					if (currentClass !== newClass) {
						this.container.addClass(newClass).removeClass(currentClass);
					}
				}
				
				if (this.settings.align) {
					this.align();
				}
				
			}
		}
	};
	
    $.fn.cover = function (options) {
		
        this.each(function () {
			new Cover($(this).parent(), $(this), options);
        });
 
        return this;
 
    };
 
}(jQuery));