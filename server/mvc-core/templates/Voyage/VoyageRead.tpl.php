<?php
	defined( 'MVCC_PATH') OR exit('No direct script access allowed');
?>
<!-- 
/*
 * @author : Jean-Michel Bruneau
 * @version : 1.0
 * 
 * Create voyage view template
 * 
 */
 -->
<form id= "voyage_read" method="post" action="">
	<h3 class="alert alert-success" role="alert">
		Voyage N° <?php echo $this->_data_model['id'] ?>
	</h3>
	<fieldset class="form-group">
		<label for="villearr">Ville d'arrivée :</label><input id="villearr" name="villearr" class="form-control" type="text" required="required" value="<?php echo $this->_data_model['villearr'] ?>" />
		<label for="paysarr">Pays d'arrivé :</label><input id="paysarr" name="paysarr" class="form-control" type="text" required="required" value="<?php echo $this->_data_model['paysarr'] ?>" />
		<label for="villedep">Ville de départ :</label><input id="villedep" name="villedep" class="form-control" type="text" required="required" value="<?php echo $this->_data_model['villedep'] ?>" />
		<label for="hotel">Hôtel :</label><input id="hotel" name="hotel" class="form-control" type="text" required="required" value="<?php echo $this->_data_model['hotel'] ?>" />
		<label for="nbetoiles">Nombre d'étoile :</label><input id="nbetoiles" name="nbetoiles" class="form-control" type="number" required="required" min="0" max="5" value="<?php echo $this->_data_model['nbetoiles'] ?>" />
		<label for="duree">Durée (jours) :</label><input id="duree" name="duree" class="form-control" type="number" required="required" min="1" max="31"  value="<?php echo $this->_data_model['duree'] ?>" />
	</fieldset>
</form>

