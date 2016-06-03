<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 'on');
    
    $server = 'localhost';
    $user = 'eztheater';
    $pass = 'eztheater';
    $dbname = 'eztheater';
    $con = new mysqli($server, $user, $pass, $dbname);
    
    if (!$con) {
        die('Not connected : ' . mysql_error());
    }
    
    $query_type = $_GET["type"];
    
    echo "<option>*all*</option>";
    echo "<option>*none*</option>";

    if($query_type=="Movies"){
        $query = "SELECT DISTINCT(genre) AS genre FROM Movies ORDER BY genre";
        $results = $con->query($query);
        foreach($results as $row){
            if($row["genre"] == ""){continue;}
            echo "<option>".$row["genre"]."</option>";
        }
    }

    if($query_type=="Shows"){
        $query = "SELECT DISTINCT(season) AS season FROM Shows ORDER BY season";
        $results = $con->query($query);
        foreach($results as $row){
            if($row["season"] == ""){continue;}
            echo "<option>".$row["season"]."</option>";
        }
    }

    $con->close();
?>
