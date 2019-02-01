<?php
    include("./CommonMethods.php");
    $COMMON = new Common(false);

    $sql = "SELECT * FROM `oregon_top_ten` ORDER BY `points` DESC LIMIT 10";
    $rs = $COMMON->executeQuery($sql, $_SERVER['SCRIPT_NAME']);

    while ($row = mysqli_fetch_assoc($rs)) {
        echo("<tr><td>".$row['name']."</td><td>".$row['points']."</td><td>".$row['rating']."</td></tr>\n");
    }
?>