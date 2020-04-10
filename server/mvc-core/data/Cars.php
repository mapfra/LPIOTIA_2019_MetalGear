<?php
class Cars {
	public static $brands = array (
		// Brand => Model => Price
		"Renault" => array (
			"Twingo" => 9990,
			"Clio" => 12990,
			"Megane" => 16990,
			"Laguna" => 19990 
		),
		"Peugeot" => array (
			"107" => 10990,
			"207" => 13990,
			"308" => 17990,
			"407" => 20990 
		),
		"Volkswagen" => array (
			"Fox" => 11490,
			"Polo" => 14490,
			"Golf" => 18490,
			"Passat" => 21490 
		) 
	);
	// Gear Boxes
	public static $gearboxes = array (
		'manual' => array (
			'desc' => "Manuelle",
			'price' => 0 
		),
		'robotic' => array (
			'desc' => "Robotisée",
			'price' => 1000 
		),
		'automatic' => array (
			'desc' => "Automatique",
			'price' => 1500 
		) 
	);
	// Colors
	public static $colors = array (
		"standard" => array (
			'desc' => "Standard",
			'price' => 0
		),
		"metallic" => array (
			'desc' => "Metalisée",
			'price' => 500
		),
		"nacreous" => array (
			'desc' => "Nacrée",
			'price' => 750
		)
	);
	// Options
	public static $options = array (
		'reversing_radar' => array(
			'desc' => "Radar de recul",
			'price' => 300
		),
		'xenon_lighthouse' => array(
			'desc' => "Phare au xenon",
			'price' => 750
		),
		'speed_regulator' => array(
			'desc' => "Régulateur de vitesse",
			'price' => 300
		),
		'rain_sensor' => array(
			'desc' => "Capteur de pluie",
			'price' => 250
		),
		'air_conditioner' => array(
			'desc' => "Climatisation",
			'price' => 1000
		)
	);
}
?>
