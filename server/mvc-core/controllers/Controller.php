<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.2.0
 * @date : 2019-12-18
 *
 * Abstract Controler class
 */
require_once MVCC_PATH . '/dao/DAO.php';
require_once MVCC_PATH . '/helpers/Url.php';

//
// Controller Factory
//
abstract class Controller {

	// Debug mode
	const DEBUG = Config::DEBUG;

	// Controllers classes path
	public static $controller_dir = __DIR__ .'/';
	
	// Model object(s)
	protected $model;
	
	// Database access object
	protected $dao;
	
	// Constructor
	public function __construct( $model) {
		$this->model = $model;
		// New DAO
		$this->dao = new DAO( Config::DBTYPE, Config::DBHOST, Config::DBPORT, Config::DBNAME, Config::DBUSER, Config::DBPASSWD);
	}
	
	// Factory
	public static function factory( Model $model) {
		// "order" => "Order" => "OrderController"
		$class_name = ucwords( $model::$name) . __CLASS__;
		// "OrderController.php"
		$class_filename = self::$controller_dir . $class_name . ".php";
		if ( file_exists( $class_filename) && $class_filename != __CLASS__ . '.php') {
			// Load "controllers/OrderController.php" class
			require $class_filename;
			return new $class_name( $model);
		} else {
			throw new UnexpectedValueException( "Class File $class_filename not found !");
		}
	}
	
	public static function redirect( $params = array(), $anchor = '') {
		// Define the protocol
		$protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
		// Define the full current URL
		$url = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		// Url object instance
		$url = new Url( $url);
		// Add or update the URL parameters
		foreach ( $GLOBALS['request'] as $param => $value) {
			if ( isset( $params[$param]) && ! empty( $params[$param]))
				$url->add( $param, $params[$param]);
		}
		if ( self::DEBUG) var_dump ( $url->toString());
		// Set the new anchor and redirect
		$url->setAnchor( $anchor)->redirect();
	}
	
	// Display a model without persistence layer
	// @Override
	abstract public function display();
	
	// Get inputs and set model properties
	// @Override
	abstract public function input();

	//
	// Persist an object
	// @Override
	public function persist( $action = 'read') {
		// Put Input data into the model
		$this->input();
		// Get data (not the null and the default ones)
		$data = $this->model->getProperties();
		// Display data in debug mode
		if ( self::DEBUG) var_dump( $data);
		// Encrypt data
		$data = $this->model->encrypt( $data);
		// Persist the order and get the new id
		$model_class = $this->model::$class_name;
		$id = $this->dao->create( $model_class::$table, $data);
		if ( empty( $id)) {
			// Display an error !
			die( "An error was occured !");
		} else { // Redirect to "read" action with the new id
			$this->redirect( array( 'action' => $action, 'id' => $id));
		}
	}
	
	//
	// Remove an object
	// @Override
	public function remove( $action = Config::ACTION, $model = Config::MODEL) {
		// Get input id from $GLOBALS['request']
		$id = $GLOBALS['request']['id'];
		// Persist the order and get the new id
		$model_class = $this->model::$class_name;
		$result = $this->dao->delete( $model_class::$table, $id);
		if ( empty( $result)) {
			// Display an error !
			die( "An error has occured !");
		} else { // Redirect to the home page
			$this->redirect( array( 'action' => $action, 'model' => $model));
		}
	}
	
	// 
	// CRUD : Create, Read, Update, Delete, …
	//
	
	// Create an object
	// @Override
	abstract public function create();
	
	// Read an object(i.e. Display a model with persistence layer)
	// @Override
	abstract public function read();
	
	// Update an object
	// @Override
	abstract public function update();
	
	// Delete an object
	// @Override
	abstract public function delete();
	// Others…
}
?>
