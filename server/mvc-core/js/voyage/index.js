var voyage = {
	
	// Constants 
	debug : true,
	verbose : true,

	form : {
		method : 'post',
		valid :false,
		// Form validation
		validate : function() {
			// Not valid by default
			voyage.form.valid = false;
			// No error
			let n = 0;
			// Check all required fields
			$( '#voyage_create :required, #voyage_update :required').each( function() {
				if ( ! this.checkValidity()) n++;
			});
			// All required field are valid
			if ( n == 0) voyage.form.valid = true;
			console.log( 'Is form valid : ' + voyage.form.valid + ', with ' + n + ' error(s)');
			return  voyage.form.valid;
		},
		
		// Form submit
		submit : function( e) {
			// Get the action from the event
			let action = e.data.action;
			// Id element
			let id = $( this).attr( 'id');
			// Get the current URL and remove the anchor
			let url = new URL( window.location.toString().split('#')[0]);
			// Get the URL parameters
			let params = new URLSearchParams( url.search);
			// Update the action parameter of the URL
			params.set( 'action', action);
			// Get the update parameters
			url.search = params.toString();
			// Get the new URL
			let new_url = url.toString();
			// Add the id element as an anchor
			new_url += '#' + id;
			$( '#voyage_create, #voyage_update, #voyage_delete').each( function( index){
				// Set form action
				$( this).attr( 'action', new_url);
				//  Submit the form
				if ( voyage.debug) console.log( 'Submit of : ' + id + ' with URL : ' + new_url);
				this.submit();
			});
		}
	},
	
	// Application Constructor
	initialize : function() {
		// Browser
		$( document).ready( voyage.onReady);
	},
	
	// On document ready
	onReady : function() {
		if ( voyage.form.validate()) {
			if ( voyage.debug) console.log( '=> Validate…');
			// Disable normal submit
			$( '#create').prop( 'disabled', true).off( 'click');
			
			// Persistance button : enable & bind on click
			$( '#persist').prop( 'disabled', false).on( 'click', { action: 'persist'}, voyage.form.submit);
			// Update button : enable & bind on click
			$( '#update').prop( 'disabled', false).on( 'click', { action: 'update'}, voyage.form.submit);
			// Remove button : enable & bind on click
			$( '#remove').prop( 'disabled', false).on( 'click', { action: 'remove'}, voyage.form.submit);
		} else {
			if ( voyage.debug) console.log( '=> Not validate…');
			// Submit : allow normal submit
			$( '#create').on( 'click', function( e)  {
				return true;
			});
			// Persistance button : disable & unbind on click
			$( '#persist, #update, #remove').prop( 'disabled', true).off( 'click');
		}
		
		// Set Order read or delete in readonly mode by disabling all the fieldset
		$( '#voyage_read fieldset, #voyage_delete fieldset').attr( 'disabled', 'disabled');
	}
};

voyage.initialize();
