<?php

	include ("CommonMethods.php");
	$COMMON = new Common(false);
	$sql = "insert into `tombstones` (`name`, `mile`, `epitaph`) values ('".$_GET['name']."','".$_GET['mile']."','".$_GET['epitaph']."')";
	$COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"])	

?>