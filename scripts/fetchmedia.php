<?php
    $server = 'localhost';
    $user = 'eztheater';
    $pass = 'eztheater';
    $dbname = 'eztheater';
    $con = mysql_connect($server, $user, $pass) or die("Can't connect");
    
    mysql_select_db($dbname);
    
    $query_type = $_GET["type"];
    $query_genre = $_GET["genre"];
    $query_season = $_GET["season"];
    


?>
