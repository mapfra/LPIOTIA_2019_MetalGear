<?php
	defined( 'MVCC_PATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="Car Whorkshop Form Order">
		<meta name="author" content="Jean-Michel Bruneau">
		<title>My Car Worshop</title>
		<!-- bootstrap css -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<!-- global css go here -->
		<link href="css/index.css" rel="stylesheet">
		<!-- bootstrap scripts -->
		<script defer="defer" src="js/jquery.min.js"></script>
		<script defer="defer" src="js/bootstrap.min.js"></script>
		<!-- global scripts go here -->
	</head>
	<body class="bg-light">
		<!--  Common header -->
		<header>
			<h1>My Common header is here…</h1>
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<a class="navbar-brand" href="#">My Common Navbar</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item"><a class="nav-link" href="../index.html">M314 Project</a></li>
						<li class="nav-item active"><a class="nav-link" href="index.php">Home</a></li>
						<li class="nav-item"><a class="nav-link" href="index.php?model=order&action=create">Create Order</a></li>
						<li class="nav-item"><a class="nav-link" href="index.php?model=order&action=read&id=2">Display ( read) Order</a></li>
						<li class="nav-item"><a class="nav-link" href="index.php?model=order&action=update&id=2">Update Order</a></li>
						<li class="nav-item"><a class="nav-link" href="index.php?model=order&action=delete&id=-1">Delete Order</a></li>
						<li class="nav-item"><a class="nav-link disabled" href="#">Disabled</a></li>
					</ul>
				</div>
			</nav>
		</header>
		<!-- Main div container -->
		<div class="container">