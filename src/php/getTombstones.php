<?php
    include("./CommonMethods.php");
    $COMMON = new Common(false);
    $sql = "SELECT * FROM `tombstones` ORDER BY `mile` DESC";
    $rs = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
    $info = mysql_fetch_assoc($rs);
    if ($info != NULL) {
        echo("Here lies ". $info['name']."<br>\n".$info['epitaph']);
    } else {
        echo("null");
    }
?>