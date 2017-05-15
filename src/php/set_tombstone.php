<?php

	include ("CommonMethods.php");
	$COMMON = new Common(false);
	$sql = "insert into `tombstones` (`name`, `date`, `mile`, `epitaph`) values ('".$_GET['name']."','".$date."','".$mile."','".$epitaph."')";
	$COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"])	

?>