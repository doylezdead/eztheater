<?php
    
    $server = 'localhost';
    $user = 'eztheater';
    $pass = 'eztheater';
    $dbname = 'eztheater';
    $con = mysql_connect($server, $user, $pass) or die("Can't connect");
    
    mysql_select_db($dbname);
    
    $query_type = $_GET["type"];

    if($query_type=="Movies"){
        $query = "SELECT DISTINCT(genre) FROM Movies";
        $results = mysql_fetch_array(mysql_query($query));
        foreach($results as $row){
            echo $row[0];
        }
    }
?>
