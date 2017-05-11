<?php
include("./CommonMethods.php");
function getTombstone($startMi, $endMi) {
    $COMMON = new Common(false);
    $sql = "SELECT 1 FROM `tombstones` WHERE `mile` BETWEEN $startMi AND $endMi ORDER BY `date` DESC";
    $rs = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
    $info = mysql_fetch_assoc($rs);
    if ($info) {
        echo(`Here lies $info['name']<br>\n$info['epitaph']`);
    } else {
        echo("NULL")
    }
}
?>