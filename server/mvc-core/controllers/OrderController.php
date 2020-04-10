<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.2.0
 * @date : 2019-12-18
 *
 * Order Controler class
 */
require_once MVCC_PATH . '/controllers/Controller.php';
require_once MVCC_PATH . '/views/View.php';

// Load local file database
require_once MVCC_PATH . '/data/Cars.php';

class OrderController extends Controller {
	
	// Debug mode
	const DEBUG = false;
	
	// Display action
	//  @Override
	public function display() {
		$view = View::factory( $this->model, __FUNCTION__);
		// Display the view
		$view->display();
	}
	
	// Compute total price
	private function _total_price() {
		$total_price = 0;
		if ( isset( Cars::$brands[$this->model->getBrand()][$this->model->getModel()])) {
			$total_price = Cars::$brands[$this->model->getBrand()][$this->model->getModel()];
		}
		// Selected gearbox (Radio button)
		if ( ! is_null( $this->model->getGearbox())) {
			$total_price += Cars::$gearboxes[$this->model->getGearbox()]['price'];
		}
		// Selected color (Radio button)
		if ( ! is_null( $this->model->getColor())) {
			$total_price += Cars::$colors[$this->model->getColor()]['price'];
		}
		// Selected options (Checkbox)
		foreach ( Cars::$options as $key => $value) {
			if ( isset( $this->model->getOptions()[$key]))
				$total_price += Cars::$options[$key]['price'];
		}
		// Return price
		if ( is_numeric( $this->model->getReturnPrice())) {
			$total_price -= $this->model->getReturnPrice();
		}
		// Set model price
		$this->model->setTotalPrice( $total_price);
	}
	
	//
	// Get inputs and set model properties
	// @Override
	public function input() {
		// Only from POST data
		if ( count( $_POST) > 0) {
			// Get and set :
			// Lastname, Firstname and Email
			$this->model->setLastname( filter_input( INPUT_POST, 'lastname', FILTER_SANITIZE_STRING));
			$this->model->setFirstname(filter_input( INPUT_POST, 'firstname', FILTER_SANITIZE_STRING));
			$this->model->setEmail( filter_input( INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
			// Brand and Model
			$this->model->setBrand( filter_input( INPUT_POST, 'brand', FILTER_SANITIZE_STRING));
			$this->model->setModel( filter_input( INPUT_POST, 'model', FILTER_SANITIZE_STRING));
			// Selected gearbox (Radio button)
			$this->model->setGearbox( filter_input( INPUT_POST, 'gearbox', FILTER_SANITIZE_STRING));
			// Selected color (Radio button)
			$this->model->setColor( filter_input( INPUT_POST, 'color', FILTER_SANITIZE_STRING));
			// Selected options (Checkbox)
			$this->model->setOptions( filter_input( INPUT_POST, 'options', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY));
			// Return price
			$this->model->setReturnPrice( filter_input( INPUT_POST, 'return_price', FILTER_SANITIZE_NUMBER_INT));
			// Total price
			$this->model->setTotalPrice( filter_input( INPUT_POST, 'total_price', FILTER_SANITIZE_NUMBER_INT));
		}
		// Compute total price
		$this->_total_price();
	}
	
	//
	// Create new order
	// @Override
	public function create() {
		// Put Input data into the model
		$this->input();

		// View instance ( model object, "create")
		$view = View::factory( $this->model, __FUNCTION__);
		
		// Display the view
		$view->display();
	}
		
	// Read an object
	// @Override
	public function read() {
		// Get input id from $GLOBALS['request']
		$id = $GLOBALS['request']['id'];
		// Model Class
		$model_class = ucwords( $this->model::$name) . 'Model';
		// Get the model(s)
		$models = $this->dao->read( $model_class::$table, $model_class, $id);
		// View instance ( model object, "read")
		if ( count( $models) == 1) { // Just one object
			$this->model = $models[0];
			// Decrypt some fields
			$this->model->decrypt();
		} elseif ( count( $models) > 1) { // More than one object ( i.e. use a template with a list layout)
			die( "To be completed ;)");
		}

		// View instance ( model object, "read")
		$view = View::factory( $this->model, __FUNCTION__);
		
		// Display the view
		$view->display();
	}
	
	// Update an object
	// @Override
	public function update() {
		// Get input id from $GLOBALS['request']
		$id = $GLOBALS['request']['id'];
		if ( ! empty( $id)) {
			// Model Class
			$model_class = ucwords( $this->model::$name) . 'Model';
			// Get the object from the database
			$models = $this->dao->read( $model_class::$table, $model_class, $id);
			if ( count( $models) == 1) { // Just one object
				$this->model = $models[0];
				// Decrypt some fields
				$this->model->decrypt();
				
				// Put POST data into the model
				$this->input();
				
				// Get data (not the null and the default ones)
				$data = $this->model->getProperties();
				// Encrypt data
				$data = $this->model->encrypt( $data);

				// Update the database object
				$this->dao->update( $model_class::$table, $data, $id);
				
				// View instance ( model object, "update")
				$view = View::factory( $this->model, __FUNCTION__);
			} else { // More than one object ( i.e. use a template with a list layout)
				die( "No Order object to update with id : $id !");
			}
		} else {
			throw new UnexpectedValueException( "No Order object to update with an empty id !");
		}
		// Display the view
		$view->display();
	}
	
	// Delete an object
	// @Override
	public function delete() {
		// Get input id from $GLOBALS['request']
		$id = $GLOBALS['request']['id'];
		// Model Class
		$model_class = ucwords( $this->model::$name) . 'Model';
		// Get the model(s)
		$models = $this->dao->read( $model_class::$table, $model_class, $id);
		// View instance ( model object, "read")
		if ( count( $models) == 1) { // Just one object
			$this->model = $models[0];
			// Decrypt some fields
			$this->model->decrypt();
		} elseif ( count( $models) > 1) { // More than one object ( i.e. use a template with a list layout)
			throw new UnexpectedValueException( "You can't delete more than one object !");
		}
		
		// View instance ( model object, "read")
		$view = View::factory( $this->model, __FUNCTION__);
		
		// Display the view
		$view->display();
	}
	
}
?>
