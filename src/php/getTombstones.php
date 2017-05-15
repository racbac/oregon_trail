<?php
    include("./CommonMethods.php");
    $COMMON = new Common(false);
    $sql = "SELECT `mile`, `name`, `epitaph` FROM `tombstones` WHERE `date` IN (SELECT MAX(`date`) FROM `tombstones` GROUP BY FLOOR(`mile` / 40)) ORDER BY `mile`";
    $rs = $COMMON->executeQuery($sql, $_SERVER["SCRIPT_NAME"]);
    $results = array();
    while ($row = mysql_fetch_assoc($rs)) {
        $results[] = array(
            'mile' => $row['mile'],
            'name' => $row['name'],
            'epitaph' => $row['epitaph']
        );
    }
    echo(json_encode($results));
?>