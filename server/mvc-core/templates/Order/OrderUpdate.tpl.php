<?php
	defined( 'MVCC_PATH') OR exit('No direct script access allowed');
?>
<!-- 
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.0
 * 
 * Update order view template
 * 
 */
 -->
<form id= "order_update" method="post" action="">
	<h3 class="alert alert-warning" role="alert">
		Mise à Jour de la Commande N° <?php echo $this->_data_model['id'] ?>
	</h3>
	<div class="alert alert-danger" role="alert">Les champs en rouge sont obligatoires !</div>
	<fieldset class="form-group">
		<legend>Informations personnelles : </legend>
		<label for="lastname">Nom :</label><input id="lastname" name="lastname" class="form-control" type="text" required="required" value="<?php echo $this->_data_model['lastname'] ?>" />
		<label for="firstname">Prénom :</label><input id="firstname" name="firstname" class="form-control" type="text" required="required" value="<?php echo $this->_data_model['firstname'] ?>" />
		<label for="email">Email :</label><input id="email" name="email" class="form-control" type="email" required="required" value="<?php echo $this->_data_model['email'] ?>" />
	</fieldset>
	<!--  Brand choice -->
	<fieldset class="form-group">
		<legend>Marque & Modèle : </legend>
		<select id="brand" name="brand" class="form-control" required="required">
			<option value="">Marque ?</option>
			<?php
			foreach ( Cars::$brands as $brand => $models) {
				if ( $brand == $this->_data_model['brand']) {
					echo "<option value=\"$brand\" selected>$brand</option>";
				} else {
					echo "<option value=\"$brand\">$brand</option>";
				}
			}
			?>
		</select>
		<!-- Model choice -->
		<select id="model" name="model" class="form-control" required="required">
			<option value="">Modèle ?</option>
			<?php
			if ( isset( $this->_data_model['brand'])) {
				foreach ( Cars::$brands[$this->_data_model['brand']] as $model => $prices) {
					if ( $model == $this->_data_model['model']) {
						echo "<option value=\"$model\" selected>$model</option>";
					} else {
						echo "<option value=\"$model\">$model</option>";
					}
				}
			}
			?>
		</select>
		<!-- Model price -->
		<label for="model_price">Valeur (€) :</label><input id="model_price" type="number" name="model_price" class="form-control" readonly="readonly" value="<?php echo $this->_data_view['model_price'] ?>" />
		</fieldset>
	<!-- Gearbox -->
	<fieldset>
		<legend>Boite de vitesse : </legend>
		<div class="form-check">
			<input type="radio" id="gearbox_manual" name="gearbox" class="form-check-input" value="manual" <?php echo $this->_data_view['checked_gearboxes']['manual'] ?> />
			<label class="form-check-label" for="gearbox_manual">Manuelle</label>
		</div>
		<div class="form-check">
			<input type="radio" id="gearbox_robotic" name="gearbox" class="form-check-input" value="robotic" <?php echo $this->_data_view['checked_gearboxes']['robotic'] ?> />
			<label class="form-check-label" for="gearbox_robotic">Robotisée (1000€)</label>
		</div>
		<div class="form-check">
			<input type="radio" id="gearbox_automatic" name="gearbox" class="form-check-input" value="automatic" <?php echo $this->_data_view['checked_gearboxes']['automatic'] ?> />
			<label class="form-check-label" for="gearbox_automatic">Automatique (1500€)</label>
		</div>
		<!--  Gearbox price -->
		<label for="gearbox_price">Valeur (€) :</label><input id="gearbox_price" class="form-control" type="number" readonly="readonly" value="<?php echo $this->_data_view['gearbox_price'] ?>" />
	</fieldset>
	<!-- Color -->
	<fieldset>
		<legend>Couleur : </legend>
		<div class="form-check">
		<input type="radio" id="color_standard" name="color" class="form-check-input" value="standard" <?php echo $this->_data_view['checked_colors']['standard'] ?> />
		<label class="form-check-label" for="color_standard">Standard</label>
		</div>
		<div class="form-check">
		<input type="radio" id="color_metallic" name="color" class="form-check-input" value="metallic" <?php echo $this->_data_view['checked_colors']['metallic'] ?> />
		<label class="form-check-label" for="color_metallic">Métalisé (500€)</label>
		</div>
		<div class="form-check">
		<input type="radio" id="color_nacreous" name="color" class="form-check-input" value="nacreous" <?php echo $this->_data_view['checked_colors']['nacreous'] ?> />
		<label class="form-check-label" for="color_nacreous">Nacrée (750€)</label>
		</div>
		<!--  Color price -->
		<label for="color_price">Valeur (€) :</label>
		<input id="color_price" type="number" readonly="readonly" value="<?php echo $this->_data_view['color_price'] ?>" />
	</fieldset>
	<!-- Options -->
	<fieldset>
		<legend>Options : </legend>
		<div class="form-check">
			<label class="form-check-label" for="option_reversing_radar"></label>
			<input type="checkbox" id="option_reversing_radar" name="options[reversing_radar]" class=form-check-input value="reversing_radar" <?php echo $this->_data_view['checked_options']['reversing_radar'] ?> />Radar de recul (300€)
		</div>
		<div class="form-check">
			<label class="form-check-label" for="option_xenon_lighthouse"></label>
			<input type="checkbox" id="option_xenon_lighthouse"  name="options[xenon_lighthouse]" class="form-check-input" value="xenon_lighthouse" <?php echo $this->_data_view['checked_options']['xenon_lighthouse'] ?> />Phares au xénon (750€)
		</div>
		<div class="form-check">
			<label class="form-check-label" for="option_speed_regulator"></label>
			<input type="checkbox" id="option_speed_regulator" name="options[speed_regulator]" class="form-check-input" value="speed_regulator" <?php echo $this->_data_view['checked_options']['speed_regulator'] ?> />Régulateur de vitesse (300€)
		</div>
		<div class="form-check">
			<label class="form-check-label" for="option_rain_sensor"></label>
			<input type="checkbox" id="option_rain_sensor" name="options[rain_sensor]" class="form-check-input" value="rain_sensor" <?php echo $this->_data_view['checked_options']['rain_sensor'] ?> />Capteur de pluie (250€)
		</div>
		<div class="form-check">
			<label class="form-check-label" for="option_air_conditioner"></label>
			<input type="checkbox" id="option_air_conditioner" name="options[air_conditioner]" class="form-check-input" value="air_conditioner" <?php echo $this->_data_view['checked_options']['air_conditioner'] ?> />Climatisation (1000€)
		</div>
		<!-- Options price -->
		<label for="options_price" >Total des options (€) :</label><input id="options_price" class="form-control" type="number" readonly="readonly" value="<?php echo $this->_data_view['options_price'] ?>" />
	</fieldset>
	<fieldset>
		<legend>Reprise de l'ancien véhicule (€) :</legend>
		<label for="return_price">
			<input id="return_price" type="number" name="return_price" class="form-control" required="required" value="<?php echo $this->_data_model['return_price'] ?>" min="0" max="3000"/>
		</label>
	</fieldset>
	<fieldset>
		<legend>Prix total (€) :</legend>
		<label for="total_price">
			<input id="total_price" type="number" name="total_price" class="form-control" readonly="readonly" value="<?php echo $this->_data_model['total_price'] ?>" />
		</label>
	</fieldset>
	<div>
		<input id="create" type="submit" value="Valider" class="btn btn-primary" />
		<input id="update" type="submit" value="Mettre à Jour" class="btn btn-success" />
	</div>
</form>

