<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.0
 *
 * Order Read View
 *
 */
require_once MVCC_PATH . '/views/View.php';

// Load local database
require_once MVCC_PATH . '/data/Cars.php';

class OrderReadView extends View {
	
	// View specifics fields
	
	// Checkbox fields
	protected $checked_gearboxes = array ();
	protected $checked_colors = array ();
	protected $checked_options = array ();
	
	// Resume price fields
	protected $model_price = 0;
	protected $gearbox_price = 0;
	protected $color_price = 0;
	protected $options_price = 0;
	
	//
	// Set Properties
	// @Override
	//
	public function setProperties() {
		
		// Set brand price
		if ( isset( Cars::$brands[$this->_model->getBrand()][$this->_model->getModel()])) {
			$this->model_price = Cars::$brands[$this->_model->getBrand()][$this->_model->getModel()];
		}
		// Selected gearbox (Radio button)
		if ( ! is_null( $this->_model->getGearbox())) {
			$this->gearbox_price = Cars::$gearboxes[$this->_model->getGearbox()]['price'];
		}
		// Checked gearbox
		$empty = true;
		foreach ( Cars::$gearboxes as $key => $value) {
			if ( $key == $this->_model->getGearbox()) {
				$this->checked_gearboxes[$key] = 'checked';
				$empty =false;
			} else
				$this->checked_gearboxes[$key] = '';
		}
		// Default is 'manual'
		if ( $empty) $this->checked_gearboxes['manual'] = 'checked';
		
		// Selected color (Radio button)
		if ( ! is_null( $this->_model->getColor())) {
			$this->color_price = Cars::$colors[$this->_model->getColor()]['price'];
		}
		// Checked color
		$empty = true;
		foreach ( Cars::$colors as $key => $value) {
			if ( $key == $this->_model->getColor()) {
				$this->checked_colors[$key] = 'checked';
				$empty =false;
			} else
				$this->checked_colors[$key] = '';
		}
		// Default is 'standard'
		if ( $empty) $this->checked_colors['standard'] = 'checked';
		
		// Selected options (Checkbox)
		foreach ( Cars::$options as $key => $value) {
			if ( isset( $this->_model->getOptions()[$key])) {
				$this->checked_options[$key] = 'checked';
				$this->options_price += Cars::$options[$key]['price'];
			} else {
				$this->checked_options[$key] = '';
			}
		}
	}
}

?>
