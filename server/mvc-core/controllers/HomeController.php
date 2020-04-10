<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.2.0
 * @date : 2019-12-18
 *
 * Home Controler class
 */
require_once MVCC_PATH . '/controllers/Controller.php';
require_once MVCC_PATH . '/views/View.php';

class HomeController extends Controller {
	
	// Debug mode
	const DEBUG = false;
	
	// Display action
	//  @Override
	public function display() {
		$view = View::factory( $this->model, __FUNCTION__);
		// Display the view
		$view->display();
	}
	
	//
	// Get inputs and set model properties
	// @Override
	public function input() {
	}
	
	//
	// Create new object
	// @Override
	public function create() {
		die( "To be defined ;)");
	}
		
	// Read an object
	// @Override
	public function read() {
		die( "To be defined ;)");
		
	}
	
	// Update an object
	// @Override
	public function update() {
		die( "To be defined ;) ;)");
	}
	
	// Delete an object
	// @Override
	public function delete() {
		die( "To be defined ;)");
	}
	
}

?>
