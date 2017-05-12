<?php

	include ("CommonMethods.php");
	$COMMON = new Common(false);
	$sql = "insert into `tombstones` (`name`, `date`, `mile`, `epitaph`) values ".($_POST["name"].", ."$_POST["date"]"., ."$_POST["mile"]"., ".$_POST["epitaph"]);

	$COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"])
	

?>