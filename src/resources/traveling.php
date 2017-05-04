<?php session_start(); ?>
<html>
	<head></head>
	<body>

		<h2>Oregon Trail</h2>
		<?php
			include ("CommonMethods.php");
			$COMMON = new Common(false);
			
			if (isset($_SESSION['remaining'])) {
				$_SESSION['remaining']--;
			} else {
				$_SESSION['remaining'] = 10;
			}
			if (isset($_SESSION['traveled'])) {
				$_SESSION['traveled']++;
			} else {
				$_SESSION['traveled'] = 0;
			}
			echo($_SESSION['remaining'] ." miles to go!<br>\n");
			echo($_SESSION['traveled'] ." miles traveled!");
		?>
		<br>
		<form action="traveling.php" method="POST">
			<button type="submit">continue</button>
		</form>
		<?php
			$sql = "select * from `tombstones` where `mile` = '".$_SESSION['traveled']."'";
			$rs = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
			$row = mysql_fetch_array($rs);
			
			if($row != FALSE) {
				echo("Someone DIED here!");
			}
		?>

	</body>
	
</html>

