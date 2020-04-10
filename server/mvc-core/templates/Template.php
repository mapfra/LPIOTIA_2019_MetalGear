<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.0
 * 
 * Template Management
 * 
 */
class Template {
	
	// Debug mode
	const DEBUG = Config::DEBUG;
	
	// Template path
	private $_path = '';
	
	// Template layout
	private $_layout = '';
	
	// Views classes path
	private static $dir = __DIR__ . '/';

	// Template filename extension
	private static $filename_ext = '.tpl.php';
	
	// Template common header
	private $_common_header = __DIR__ . '/common/header.tpl.php';
	
	// Template model header
	private $_header = '.header.tpl.php';
	
	// Template filename
	private $_filename = null;
	
	// Template model footer
	private $_footer = '.footer.tpl.php';
	
	// Template common footer
	private $_common_footer = __DIR__ . '/common/footer.tpl.php';

	
	/**
	 * @return string
	 */
	public function getCommonHeader() {
		return $this->_common_header;
	}

	/**
	 * @param string $_common_header
	 */
	public function setCommonHeader( $_common_header) {
		$this->_common_header = $_common_header;
	}

	/**
	 * @return string
	 */
	public function getCommonFooter() {
		return $this->_common_footer;
	}

	/**
	 * @param string $_common_footer
	 */
	public function setCommonFooter( $_common_footer) {
		$this->_common_footer = $_common_footer;
	}

	/**
	 * @return mixed
	 */
	public function getHeader() {
		return $this->_header;
	}

	/**
	 * @param mixed $_header
	 */
	public function setHeader( $_header) {
		$this->_header = $_header;
	}

	/**
	 * @return mixed
	 */
	public function getFooter() {
		return $this->_footer;
	}

	/**
	 * @param mixed $_footer
	 */
	public function setFooter( $_footer) {
		$this->_footer = $_footer;
	}

	/**
	 * @return string
	 */
	public function getTplFilenameExt() {
		return $this->filename_ext;
	}

	/**
	 * @param string $tpl_filename_ext
	 */
	public function setTplFilenameExt( $tpl_filename_ext) {
		$this->filename_ext = $tpl_filename_ext;
	}

	/**
	 * @return string
	 */
	public function getFilename() {
		return $this->_filename;
	}

	/**
	 * @param Ambigous <string, string> $_filename
	 */
	public function setFilename( $_filename) {
		$this->_filename = $_filename;
	}

	// Constructor
	public function __construct( $model, $action, $path = '', $layout = '') {
		
		// Model name ( e.g. Order)
		$model_name = ucwords( $model::$name);
		// Model action ( e.g. Create)
		$model_action = ucwords( $action);
		
		// Template prefix (e.g. OrderCreate)
		$tpl_prefix = $model_name . $model_action;
		
		// Add a path (e.g. templates/$path/")
		if ( empty( $path))
			$path = $GLOBALS['request']['path'];
		if ( ! empty( $path)) {
			$tpl_filename = self::$dir . $path . '/' . $model_name . '/';
		} else 
			$tpl_filename = self::$dir . $model_name . '/';

			// Set template model header ( e.g. templates/Order/Order.header.tpl.php)
			if ( file_exists( $tpl_filename . $model_name. $this->_header))
				$this->_header = $tpl_filename . $model_name . $this->_header;
		else
			$this->_header = null;
		
			// Set template model footer ( e.g. templates/Order/Order.footer.tpl.php)
			if ( file_exists( $tpl_filename . $model_name . $this->_footer))
				$this->_footer = $tpl_filename . $model_name . $this->_footer;
		else
			$this->_footer = null;
		
		// Template filename (e.g. templates/Order/OrderCreate)
		$tpl_filename .= $tpl_prefix;
		
		// Add a layout (e.g. templates/Order/OrderCreate-$layout)
		if ( empty( $layout))
			$layout = $GLOBALS['request']['layout'];
		if ( ! empty( $layout)) {
			$tpl_filename .= '-' . $GLOBALS['request']['layout'];
		}
		
		// Add the extension (e.g. templates/Order/OrderCreate.tpl.php or templates/Order/OrderCreate-layout.tpl.php)
		$tpl_filename .= self::$filename_ext;
		
		// Check if template file exists
		if ( ! file_exists( $tpl_filename))
			throw new UnexpectedValueException( "Template File $tpl_filename not found !");
		else
			$this->_filename = $tpl_filename;	
	}
}

?>
