<?php
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.1
 * @Entity( name="Order Model")
 * @ Table( name="orders")
 */
require_once MVCC_PATH . '/models/Model.php';

class VoyageModel extends Model {

	// Model name
	public static $name = 'voyage';
	
	// SQL table name
	public static $table = '"tp1_bd_voyage".voyages';
	
	// Forms fields
	protected $villearr = null;
	protected $paysarr = null;
	protected $villedep = null;
	protected $hotel = null;
	protected $nbetoiles = null;
	protected $duree = null;

	/**
	 * @return mixed
	 */
	public function getVillearr() {
		return $this->villearr;
	}

	/**
	 * @param mixed $villearr
	 */
	public function setVillearr( string $villearr) {
		$this->villearr = mb_strtoupper( $villearr);
	}

	/**
	 * @return mixed
	 */
	public function getPaysarr() {
		return $this->paysarr;
	}

	/**
	 * @param mixed $paysarr
	 */
	public function setPaysarr( string $paysarr) {
		$this->paysarr = mb_strtoupper( $paysarr);
	}

	/**
	 * @return mixed
	 */
	public function getVilledep() {
		return $this->villedep;
	}

	/**
	 * @param mixed $villedep
	 */
	public function setVilledep( string $villedep) {
		$this->villedep = mb_strtoupper( $villedep);
	}

	/**
	 * @return mixed
	 */
	public function getHotel() {
		return $this->hotel;
	}

	/**
	 * @param mixed $hotel
	 */
	public function setHotel( string $hotel) {
		$this->hotel = mb_strtoupper( $hotel);
	}

	/**
	 * @return mixed
	 */
	public function getNbetoiles() {
		return $this->nbetoiles;
	}

	/**
	 * @param mixed $nbetoiles
	 */
	public function setNbetoiles( int $nbetoiles) {
		$this->nbetoiles = $nbetoiles;
	}

	/**
	 * @return mixed
	 */
	public function getDuree() {
		return $this->duree;
	}

	/**
	 * @param mixed $duree
	 */
	public function setDuree( int $duree) {
		$this->duree = $duree;
	}

	// Constructor
	// @ Override
	public function __construct( $data = null) {
		parent::__construct( __CLASS__, $data);
	}
	
}

?>
