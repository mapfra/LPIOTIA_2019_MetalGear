<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.0
 * 
 * Factory Model
 * 
 */
require_once MVCC_PATH . '/helpers/Crypt.php';

abstract class Model {
	
	// Debug mode
	const DEBUG = false;
	
	// Model name
	public static $name = null;
	
	// Model class name
	public static $class_name = null;
	
	// Models classes path
	public static $model_dir = __DIR__ . '/';
	
	// SQL table name
	public static $table = null;

	// Crypt Object instance
	public static  $crypt= null;
	
	// @Id
	// @Column( type="")
	protected $id = null;
	
	// Constructor
	public function __construct( $class_name, $data = null) {
		// Set class name
		self::$class_name = $class_name;
		// Get a Crypt instance
		self::$crypt = new Crypt();
		// Set model properties from data array
		if ( ! is_null( $data)) {
			$properties = get_object_vars( $this);
			foreach ( $properties as $property => $value) {
				if ( isset( $data[$property]) && ! is_null( $value)) {
					$this->$property = $data[$property];
				}
			}
		}
	}

	// Factory
	public static function factory( $name, $data = null) {
		// "order" -> "Order" => "OrderModel"
		$class_name =  ucwords( $name) . __CLASS__;
		// "OrderCreateView.php"
		$class_filename = self::$model_dir . $class_name . ".php";
		if ( file_exists( $class_filename) && $class_filename != __CLASS__ . '.php') {
			// charger le fichier "views/OrderCreateView.php"
			require_once $class_filename;
			return new $class_name( $data);
		} else {
			throw new UnexpectedValueException( "Class file $class_filename not found !");
		}
	}
	
	/**
	 * @return mixed
	 */
	public function getId() {
		return $this->id;
	}
	
	/**
	 * @param mixed $id
	 */
	public function setId( $id) {
		$this->id = $id;
	}
	
	// Encrypts the properties that must be
	// To be used in  persist() and update() methods below
	public function encrypt( $data) {
		return $data;
	}
	
	// Decrypts the properties that must be
	// To be used in the read() method below
	public function decrypt(){
		return;
	}
	
	// Get properties
	public function getProperties( $empty = true, $default = true) {
		$properties = get_object_vars( $this);
		if ( $empty) { // Remove empty values
			foreach ( $properties as $key => $value) {
				if ( empty( $value)) unset( $properties[$key]);
			}
		}
		if ( $default) { // Remove properties with a default value
			unset( $properties['id']);
		}
		return $properties;
	}
	
	// Get all properties names
	public function getPropertiesNames( $default = true) {
		$properties_names = array_keys( get_object_vars( $this));
		if ( $default) { // Remove properties names with a default value
			unset( $properties_names['id']);
		}
		return $properties_names;
	}
	
}

?>
