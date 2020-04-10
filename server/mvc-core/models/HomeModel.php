<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.1
 * @Entity( name="Order Model")
 * @ Table( name="orders")
 */
require_once MVCC_PATH . '/models/Model.php';

class HomeModel extends Model {

	// Model name
	public static $name = 'home';
	
	// SQL table name
	public static $table = '';
	
	// Constructor
	// @ Override
	public function __construct( $data = null) {
		parent::__construct( __CLASS__, $data);
	}
}

?>
