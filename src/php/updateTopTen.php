<?php
    include("./CommonMethods.php");
    $COMMON = new Common(false);

    $score = $_GET['score']; $rating = "";
    if ($score <= 3000) { $rating = "Greenhorn"; }
    else if ($score <= 6000) {$rating = "Adventurer"; }
    else { $rating = "Trail guide"; }

    $sql = "SELECT MIN(`points`) as points from `oregon_top_ten`";
    $rs = mysql_fetch_array($COMMON->executeQuery($sql, $_SERVER['SCRIPT_NAME']));
    if ($rs[0] < $score) {
        $sql = "INSERT INTO `oregon_top_ten`(`name`, `points`, `rating`) VALUES ('".$_GET['name']."','".$score."','".$rating."')";
        $rs = $COMMON->executeQuery($sql, $_SERVER['SCRIPT_NAME']);
        echo("true");
    } else {
        $sql = "SELECT COUNT(*) `oregon_top_ten`";
        $rs = mysql_fetch_array($COMMON->executeQuery($sql, $_SERVER['SCRIPT_NAME']));
        if ($rs[0] < 10) {
            $sql = "INSERT INTO `oregon_top_ten`(`name`, `points`, `rating`) VALUES ('".$_GET['name']."','".$score."','".$rating."')";
            $rs = $COMMON->executeQuery($sql, $_SERVER['SCRIPT_NAME']);
            echo("true");
        } else {
            echo("false");
        }
    }
?>