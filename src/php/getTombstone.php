<?php
    include("./CommonMethods.php");
    $COMMON = new Common(false);
    $sql = "SELECT * FROM `tombstones` WHERE `mile` BETWEEN '".$_GET['startMi']."' AND '".$_GET['endMi']."' ORDER BY `date` DESC";
    $rs = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
    $info = mysqli_fetch_assoc($rs);
    if ($info != NULL) {
        echo("Here lies ". $info['name']."<br>\n".$info['epitaph']);
    } else {
        echo("null");
    }
?>