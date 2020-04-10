var order = {
	
	// Constants 
	debug : true,
	verbose : true,

	form : {
		method : 'post',
		valid :false,
		// Form validation
		validate : function() {
			// Not valid by default
			order.form.valid = false;
			// No error
			let n = 0;
			// Check all required fields
			$( '#order_create :required, #order_update :required').each( function() {
				if ( ! this.checkValidity()) n++;
			});
			// All required field are valid
			if ( n == 0) order.form.valid = true;
			console.log( 'Is form valid : ' + order.form.valid + ', with ' + n + ' error(s)');
			return  order.form.valid;
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
			$( '#order_create, #order_update, #order_delete').each( function( index){
				// Set form action
				$( this).attr( 'action', new_url);
				//  Submit the form
				if ( order.debug) console.log( 'Submit of : ' + id + ' with URL : ' + new_url);
				this.submit();
			});
		}
	},
	
	// Application Constructor
	initialize : function() {
		// Browser
		$( document).ready( order.onReady);
	},
	
	// On document ready
	onReady : function() {
		if ( order.form.validate()) {
			if ( order.debug) console.log( '=> Validate…');
			// Disable normal submit
			$( '#create').prop( 'disabled', true).off( 'click');
			
			// Persistance button : enable & bind on click
			$( '#persist').prop( 'disabled', false).on( 'click', { action: 'persist'}, order.form.submit);
			// Update button : enable & bind on click
			$( '#update').prop( 'disabled', false).on( 'click', { action: 'update'}, order.form.submit);
			// Remove button : enable & bind on click
			$( '#remove').prop( 'disabled', false).on( 'click', { action: 'remove'}, order.form.submit);
		} else {
			if ( order.debug) console.log( '=> Not validate…');
			// Submit : allow normal submit
			$( '#create').on( 'click', function( e)  {
				return true;
			});
			// Persistance button : disable & unbind on click
			$( '#persist, #update, #remove').prop( 'disabled', true).off( 'click');
		}
		// Ajax submit on some changes for Order Create
		$( '#order_create input, #order_create select, #order_create textarea').on( 'change', { action: 'create'}, order.form.submit);
		// Ajax submit on some changes for Order Update
		$( '#order_update input, #order_update select, #order_update textarea').on( 'change', { action: 'update'}, order.form.submit);
		
		// Set Order read or delete in readonly mode by disabling all the fieldset
		$( '#order_read fieldset, #order_delete fieldset').attr( 'disabled', 'disabled');
	}
};

order.initialize();
