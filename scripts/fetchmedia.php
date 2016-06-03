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
    
    $in_type = $_GET["type"];
    $in_genre = $_GET["genre"];
    $in_season = $_GET["season"];

    //Start building the query
    $query_select = "SELECT * FROM $in_type ";
    $query_where = "";
    $query_order = "ORDER BY name, ";

    if($in_type=="Movies"){
        if($in_genre=="*all*")
            $query_where = "";
        else if($in_genre=="*none*")
            $query_where = "WHERE genre IS NULL ";
        else
            $query_where = "WHERE genre='$in_genre' ";
        
        $query_order = $query_order."year"

    }
    else if($in_type=="Shows"){
        if($in_season=="*all*")
            $query_where = "";
        else if($in_season=="*none*")
            $query_where = "WHERE season IS NULL ";
        else
            $query_where = "WHERE season='$in_season' ";
        
        $query_order = $query_order."season, episode"

    }

    query


    

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
