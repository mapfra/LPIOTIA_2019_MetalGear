<?php

//
// Production Config
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
		const DBHOST = '10.0.2.100';
		//const DBHOST = 'linserv-info-03.iutnice.unice.fr';
		const DBPORT = 5432;

		const DBNAME = 'jmbruneau';
		const DBUSER = 'jmbruneau';
		const DBPASSWD = '<jmbuc!1920>';
	}

}
?>
