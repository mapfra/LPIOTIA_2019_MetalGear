<?php

//
// Development Config
//

if ( ! class_exists( 'Config')) {

	class Config {
	
		// Debug mode
		const  DEBUG = false;
		// Verbose mode
		const  VERBOSE = false;
		
		// Default model
		const MODEL = 'home';
		// Default action
		const ACTION = 'display';
		
		// Database parameters
		const DBTYPE = 'pgsql';
		const DBHOST = 'localhost';
		const DBPORT = 5433;
	
		const DBNAME = 'car-workshop';
		const DBUSER = 'jmbruneau';
		const DBPASSWD = '<jmb!5433>';
	
	}

}
?>