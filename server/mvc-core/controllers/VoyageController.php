<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.2.0
 * @date : 2019-12-18
 *
 * Voyage Controler class
 */
require_once MVCC_PATH . '/controllers/Controller.php';
require_once MVCC_PATH . '/views/View.php';

class VoyageController extends Controller {
	
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
		// Only from POST data
		if ( count( $_POST) > 0) {
			$this->model->setVillearr( filter_input( INPUT_POST, 'villearr', FILTER_SANITIZE_STRING));
			$this->model->setPaysarr(filter_input( INPUT_POST, 'paysarr', FILTER_SANITIZE_STRING));
			$this->model->setVilledep( filter_input( INPUT_POST, 'villedep', FILTER_SANITIZE_STRING));
			$this->model->setHotel( filter_input( INPUT_POST, 'hotel', FILTER_SANITIZE_STRING));
			$this->model->setNbetoiles( filter_input( INPUT_POST, 'nbetoiles', FILTER_SANITIZE_NUMBER_INT));
			$this->model->setDuree( filter_input( INPUT_POST, 'duree', FILTER_SANITIZE_NUMBER_INT));
		}
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
		if ( count( $models) == 1) { // Just one object, the first one !
			$this->model = $models[0];
			// Decrypt some fields
			$this->model->decrypt();
		} elseif ( count( $models) > 1) { // More than one object ( i.e. use a template with a list layout)
			$this->model = $models;
			// Decrypt some fields
			for ($n = 0; $n < count( $models); $n++) {
				$this->model[$n]->decrypt();
			}
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
				die( "No Voyage object to update with id : $id !");
			}
		} else {
			throw new UnexpectedValueException( "No Voyage object to update with an empty id !");
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
