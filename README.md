# Eventbrite Buy Tickets Widget Multiple Script

## By Jeremy Heminger 2017

### Live Demo http://jeremyheminger.com/eventbrite-multi-event-ticket-module

I was asked to add the ability to purchase Eventbrite tickets from a website using the Eventbrite ticket module. The problem is that the customer had a number of events over the course of several months and I knew they would have several more over the years. The Eventbrite module is complete, but you would need to copy the code for each event. This could be a little tedious, and it didn't seem as elegant having a ton of these ticket iframes loaded into one page.This seemed like an opportunity to create a simple program to automate everything. They didn't really have a budget for me to write something really complex, so I created a really simple script that basically just grabs the event id from a button that they can add easily.

### Usage

#### Basic

~~~~
<link rel="stylesheet" href="_/css/style.css" />
<script type="text/javascript" src="_/components/jquery/jquery.js"></script>
<script type="text/javascript" src="_/components/js/_eb.js"></script>
~~~~ 

#### Basic Minified

~~~~
<link rel="stylesheet" href="_/css/style.css" />
<script type="text/javascript" src="_/components/jquery/jquery.js"></script>
<script type="text/javascript" src="_/js/eventbrite.min.js"></script>
~~~~

#### Basic Minified with Jquery included

~~~~
<link rel="stylesheet" href="_/css/style.css" />
<script type="text/javascript" src="_/js/eventbrite.jquery.min.js"></script>
~~~~

### Calling the script

#### Basic 

~~~~
<script>
    window.onload = function() {
		$(document).ready(function(){ 
			Eb.init();
		});
	}
</script>
~~~~

#### with example arguments

~~~~
<script>
    window.onload = function() {
		$(document).ready(function(){ 
			Eb.init({
				mobile_width:'320px'
			},
			{
				width:'50%',
				heightmobile:'250px'
			});
		});
	}
</script>
~~~~

#### Calling the script with HTML only ( the script does need to be initialized with Javascript )

~~~~
<div id="eventbrite">
   <div class="container">
    	    <img src="http://placehold.it/150x150"> 
	    <div>
		<h2>My Fake Eventbrite Event</h2>
		<p>This is fake text about this event that will be taking place on:<br>
		    M d, YYYY at h:00 AM/PM
		</p>
	    </div>
    	    <button class="eb_buytickets" data-eid="34580136118">Get Tickets</button>
        </div> 
	<div class="container">
	    <img src="http://placehold.it/150x150"> 
	    <div>
		<h2>My Fake Eventbrite Event</h2>
		<p>This is fake text about this event that will be taking place on:<br>
		    M d, YYYY at h:00 AM/PM
		</p>
	    </div>
	    <button class="eb_buytickets" data-eid="34580177241">Get Tickets</button>
	</div>
</div>
<script>
    window.onload = function() {
		$(document).ready(function(){ 
			Eb.init();
		});
	}
</script>
~~~~

The script has 2 sets of argument lists. 

1. Arguments for the script 
	* scrollTop {String} true, false, mobile 
	   ( when clicked to scroll to the top of the ticket tool or only on mobile)
	* mobile_width {Number} when to break for mobile 
	* acpause {Number} how long to pause to wait for the css accordion
2. Arguments for the Eventbrite IFRAME 
	* frameborder {Number}
    * width {String}
    * vspace {Number}
    * hspace {Number}
    * marginheight {Number}
    * marginwidth {Number}
    * scrolling{String}
    * allowtransparency {String}
    * height {Number}
    * heightmobile {Number}
    * src {Object}
    	* url {String}
    		* query {Object}
    			* ref {String}
    			* eid {Null}
