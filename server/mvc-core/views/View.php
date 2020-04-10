<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.0
 * 
 * Factory View
 * 
 */
require_once MVCC_PATH . '/templates/Template.php';

abstract class View {
	
	// Debug mode
	const DEBUG = Config::DEBUG;
	
	// Model object
	protected $_model = null;
	
	// $this->_model is a list off object
	protected $list = false;
	
	// Model data used in the template view
	private $_data_model = array();

	// Specific data used in the template view
	private $_data_view = array();
	
	// Views classes path
	private static $_dir = __DIR__ . '/';
	
	private $_template = null;

	// Constructor
	public function __construct( $model, $template) {
		// Set Model
		$this->_model = $model;
		// Is $model an array of object ?
		if ( is_array( $model)) $this->list = true;
		// Set Template
		$this->_template = $template;
		// Set view specific's properties
		$this->setProperties();
	}
	
	// Factory
	public static function factory( $model, $action) {
		// Model name ( e.g. "Order")
		$model_name = ucwords( $model::$name);
		// Class directory ( e.g. "view/Order/")
		$class_dir = self::$_dir . $model_name . '/';
		// Class prefix ( e.g. "OrderCreate")
		$class_prefix = $model_name . ucwords( $action);
		// Class name ( e.g. "OrderCreateView")
		$class_name = $class_prefix . __CLASS__;
		// Classe filename : "view/Order/OrderCreateView.php"
		$class_filename = $class_dir . $class_name . ".php";
		if ( file_exists( $class_filename) && $class_filename != __CLASS__ . '.php') {
			// Load "views/OrderCreateView.php" class
			require_once $class_filename;
			
			// Template instance
			if ( is_array( $model)) // List layout
				$GLOBALS['request']['layout'] = 'List';
	
			$template = new Template( $model, $action);
			
			// Return view instance
			return new $class_name( $model, $template);
		} else {
			throw new UnexpectedValueException( "Class File $class_filename not found !");
		}
	}
	
	// Set properties
	abstract public function setProperties();

	// Get Properties
	public function getProperties( $abstract = null, $null = true) {
		$properties = get_object_vars( $this);
		// Remove the abstract view entries
		if ( $abstract)
			unset( $properties['_model']);
		// Remove null values
		if ( $null)
			foreach ( $properties as $key => $value)
				if ( is_null( $value)) unset( $properties[$key]);
		return $properties;
	}
	
	// Display template content
	public function display() {
		echo self::fetch();
	}
	
	// Fetch template content
	public function fetch() {

		// Put model data into $this->data['model']
		if ( ! $this->list) {
			$this->_data_model = $this->_model->getProperties( false, false);
			if ( self::DEBUG) var_dump( $this->_data_model);
		} else {
			for ($n = 0; $n < count( $this->_model); $n++) {
				$this->_data_model[$n] = $this->_model->getProperties( false, false);
			}
		}

		// Put model data into $this->data['view']
		$this->_data_view = $this->getProperties( false, false);
		if ( self::DEBUG) var_dump( $this->_data_view);
		
		// Turn on output buffering
		ob_start();

		// Header common template with no service
		if ( empty( $GLOBALS['request']['service'])) {
			if ( ! is_null ( $this->_template->getCommonHeader()))
				require_once $this->_template->getCommonHeader();
		
		// Header model template
			if ( ! is_null ( $this->_template->getHeader()))
				require_once $this->_template->getHeader();
		}
		
		// Body model template
		if ( ! is_null ( $this->_template->getFilename()))
			require_once $this->_template->getFilename();
		
		// Footer template with no service
		if ( empty( $GLOBALS['request']['service'])) {
			if ( ! is_null ( $this->_template->getFooter()))
				require_once $this->_template->getFooter();
		
		// Footer common template with no service
			if ( ! is_null ( $this->_template->getCommonFooter()))
				require_once $this->_template->getCommonFooter();
		}

		return ob_get_clean();
	}
}

?>
