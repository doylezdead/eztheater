<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 'on');
    
    $server = 'localhost';
    $user = 'eztheater';
    $pass = 'eztheater';
    $dbname = 'eztheater';
    $con = new mysqli($server, $user, $pass, $dbname);
    
    if (!$con) {
        die('Not connected');
    }
    
    $in_id = $_GET["id"];
    $in_name = $_GET["name"];
    $in_genre = $_GET["genre"];
    $in_runtime = $_GET["runtime"];
    $in_year = $_GET["year"];

    $query = 'UPDATE Movies SET name=\''.$in_name.'\', genre=\''.$in_genre.'\', runtime=\''.$in_runtime.'\', year=\''.$in_year.'\' WHERE id=\''.$in_id."'";
    
    echo $query;

    $con->query($query);
    
    $con->close();

?>
