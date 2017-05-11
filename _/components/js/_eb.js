/**
 * 
 * Eb
 * Eventbrite multiple event ticket tool
 * 
 * @author Jeremy Heminger c/o Geographics <j.heminger@061375.com>
 * @version 2.0.1
 * @binding jQuery 1.9.1+
 *
 * @return {Object}
 * */
var Eb = (function() {

    "use strict";

    var options = {

    	// @param {String} true, false, mobile
    	scrollTop: true, 

    	// @param {Number} when to break for mobile
    	mobile_width: 450, 

    	// @param {Number} how long to pause to wait for the css accordion
    	acpause: 1000
    }
    /** 
     * @param {Object}
     * */
    var iframedefault = {
    	frameborder: 0,
    	width: '100%',
    	vspace: 0,
    	hspace: 0,
    	marginheight: 5,
    	marginwidth: 5,
    	scrolling: 'auto',
    	allowtransparency: 'true',
    	height: 393,
    	heightmobile: 1100,
    	src: {
    		url: '//eventbrite.com/tickets-external?',
    		query: {
    			ref: 'etckt',
    			eid: ''
    		}
    	}
    }
    /** 
     * 
     * @return {Void}
     */
    var bindActions = function() {
        $('.eb_buytickets').on('click',buyClick);
    }
    /** 
     * @return {Void}
     */
    var buyClick = function() {
    	// make $(this) available 
    	var $t = $(this);
    	// check if the user simply clicked the same button to close the accordion
    	var tactive = $t.hasClass('active') ? true : false;

    	// reset all buttons
    	$('.eb_buytickets').removeClass('active');
    	// set this button as active
    	$t.addClass('active');

    	// remove the ticket tool if it already exists
        if (typeof $('#ticketmodal').html() !== 'undefined') {
        	// open the accordion
            $('#ticketmodal').removeClass('open');
            // pause while the accordion closes
            setTimeout(function() {
            	// remove the ticket tool
                $('#ticketmodal').remove();
                // if this is the same ticket tool then we don;t want to make it again
                if(!tactive)makeBuyTickets($t);
            },options.acpause);
        }else{
            makeBuyTickets($t);   
        }
    }
    /** 
     * adds the iframe to create the ticket widget
     * @param {Object}
     * @return {Void}
     * */
    var makeBuyTickets = function($t) {
    	
        var $p = $t.parent();

        iframedefault.src.query.eid = $t.data('eid');

        var url = iframedefault.src.url;

        // build the url and querystring
        $.each(iframedefault.src.query,function(k,v) {
        	url += k+'='+v+'&';
        });

        // 
        var tmp = iframedefault.src;
        iframedefault.src = url;

        var modal = document.createElement('div');
            $(modal).attr('id','ticketmodal');
                var ev = document.createElement('div');
                        $(ev).css('width','100%');
                        $(ev).css('text-align','left');
                        var iframe = document.createElement('iframe');
                        	$.each(iframedefault,function(k,v) {
                        		if(k == 'height' || k == iframedefault.heightmobile)return;
                                $(iframe).attr(k,v);
                            });
                            if ($(window).width() > options.mobile_width) {
                                $(iframe).attr('height',iframedefault.height);
                            }else{
                                $(iframe).attr('height',iframedefault.heightmobile);
                            }
                        $(ev).append(iframe);
            $(modal).append(ev);
        $p.append(modal);

        iframedefault.src = tmp;

		$('#ticketmodal').addClass('open');

		if(options.autoScroll != false) {
			if(options.autoScroll == 'mobile') {
				if($(window).width() > options.mobile_width)autoScroll($t);
			}else{
				autoScroll($t);
			}
		}
    }
    /** 
     * @param {Object} 
     * @return {Void}
     * */
    var autoScroll = function($t) {
    	$('html, body').animate({ 
            scrollTop: $t.offset().top,
        }, options.acpause);
    }
    /** 
     * @param {Object} override settings
     * @param {Object} overide the default eventbrite iframe settings
     * @return {Void}
     * */
    var init = function(opt_overide,eb_overide) {
    	// loop through any options set to be overidden
    	$.each(opt_overide,function(k,v) {
    		options[k] = v;
    	});

    	$.each(eb_overide,function(k,v) {
    		iframedefault[k] = v;
    	});
        bindActions();
    };

    return {
      init: init,
    };   
}(jQuery));