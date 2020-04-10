<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.1
 * @Entity( name="Order Model")
 * @ Table( name="orders")
 */
require_once MVCC_PATH . '/models/Model.php';

class OrderModel extends Model {

	// Model name
	public static $name = 'order';
	
	// SQL table name
	public static $table = 'public.orders';
	
	// Forms fields
	protected $lastname = null;
	protected $firstname = null;
	protected $email = null;
	
	protected $brand = null;
	protected $model = null;
	protected $gearbox = null;
	protected $color = null;
	
	// 	@Column
	// JSON of an array()
	protected $options = null;

	// @Column
	protected $return_price = null;
	
	// @Column
	protected $total_price = null;
	
	// @Column( default='now()')
	protected  $date = null;
	/**
	 * @return mixed
	 */
	public function getReturn_price() {
		return $this->return_price;
	}

	/**
	 * @param mixed $return_price
	 */
	public function setReturn_price( $return_price) {
		$this->return_price = $return_price;
	}

	/**
	 * @return mixed
	 */
	public function getTotal_price() {
		return $this->total_price;
	}

	/**
	 * @param mixed $total_price
	 */
	public function setTotal_price( $total_price) {
		$this->total_price = $total_price;
	}

	//
	// Getters
	//
	/**
	 * @return mixed
	 */
	public function getLastname() {
		return $this->lastname;
	}

	/**
	 * @return mixed
	 */
	public function getFirstname() {
		return  $this->firstname;
	}

	/**
	 * @return mixed
	 */
	public function getEmail() {
		return  $this->email;
	}

	/**
	 * @return mixed
	 */
	public function getBrand() {
		return $this->brand;
	}

	/**
	 * @return mixed
	 */
	public function getModel() {
		return $this->model;
	}

	/**
	 * @return mixed
	 */
	public function getGearbox() {
		return $this->gearbox;
	}

	/**
	 * @return mixed
	 */
	public function getColor() {
		return $this->color;
	}

	/**
	 * @return multitype:
	 */
	public function getOptions() {
		return json_decode( $this->options, true);
	}

	/**
	 * @return mixed
	 */
	public function getReturnPrice() {
		return $this->return_price;
	}

	/**
	 * @return mixed
	 */
	public function getTotalPrice() {
		return $this->total_price;
	}

	/**
	 * @return mixed
	 */
	public function getDate() {
		return $this->date;
	}
	
	//
	// Setters
	//
	
	/**
	 * @param mixed $lastname
	 */
	public function setLastname( $lastname) {
		$this->lastname = $lastname;
	}

	/**
	 * @param mixed $firstname
	 */
	public function setFirstname( $firstname) {
		$this->firstname =  $firstname;
	}

	/**
	 * @param mixed $email
	 */
	public function setEmail( $email) {
		$this->email =  strtolower( $email);
	}

	/**
	 * @param mixed $brand
	 */
	public function setBrand( $brand) {
		$this->brand = $brand;
	}

	/**
	 * @param mixed $model
	 */
	public function setModel( $model) {
		$this->model = $model;
	}

	/**
	 * @param mixed $gearbox
	 */
	public function setGearbox( $gearbox) {
		$this->gearbox = $gearbox;
	}

	/**
	 * @param mixed $color
	 */
	public function setColor( $color) {
		$this->color = $color;
	}

	/**
	 * @param multitype: $options
	 */
	public function setOptions( $options) {
		$this->options = json_encode( $options);
	}

	/**
	 * @param mixed $return_price
	 */
	public function setReturnPrice( $return_price) {
		$this->return_price = $return_price;
	}

	/**
	 * @param mixed $total_price
	 */
	public function setTotalPrice( $total_price) {
		$this->total_price = $total_price;
	}

	/**
	 * @param mixed $date
	 */
	public function setDate( $date) {
		$this->date = $date;
	}

	// Constructor
	// @ Override
	public function __construct( $data = null) {
		parent::__construct( __CLASS__, $data);
		// options property is stored in JSON
		if ( ! is_null( $this->options))
			$this->options = json_encode( $this->options);
	}
	
	// Encrypts the properties that must be
	// To be used in getProperties() method below
	public function encrypt( $data) {
		if ( isset( $data['firstname']))
			$data['firstname'] =  self::$crypt->encrypt( $data['firstname']);
		if ( isset( $data['firstname']))
			$data['lastname'] =  self::$crypt->encrypt( $data['lastname']);
		if ( isset( $data['firstname']))
			$data['email'] =  self::$crypt->encrypt( $data['email']);
		return $data;
	}
	
	// Decrypts the properties that must be
	// To be used in the read() method below
	public function decrypt() {
		$this->firstname = self::$crypt->decrypt( $this->firstname);
		$this->lastname = self::$crypt->decrypt( $this->lastname);
		$this->email = self::$crypt->decrypt( $this->email);
		// Remove \" from json options field
		$this->options = str_replace( "\\", "", $this->options);
		// Remove " at the beginning and the end of options field
		$this->options = trim( $this->options, '"');
	}
	
	// Get properties
	public function getProperties( $empty = true, $default = true) {
		$properties =  parent::getProperties( $empty, $default);
		if ( $default) { // Remove properties  with a default value
			unset( $properties['date']);
		}
		return $properties;
	}
	
	// Get all properties names
	// @ Override
	public function getPropertiesNames( $default = true) {
		$properties_names = parent::getPropertiesNames( $default);
		if ( $default) { // Remove properties names with a default value
			unset( $properties_names['date']);
		}
		return $properties_names;
	}
	
}

?>
