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
    $in_season = $_GET["season"];
    $in_episode = $_GET["episode"];

    $query = 'UPDATE Shows SET name=\''.$in_name.'\', season=\''.$in_season.'\', episode=\''.$in_episode.'\' WHERE id=\''.$in_id."'";
    
    echo $query;

    $con->query($query);
    
    $con->close();

?>
