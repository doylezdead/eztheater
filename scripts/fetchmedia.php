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
        
        $query_order = $query_order."year";

    }
    else if($in_type=="Shows"){
        if($in_season=="*all*")
            $query_where = "";
        else if($in_season=="*none*")
            $query_where = "WHERE season IS NULL ";
        else
            $query_where = "WHERE season='$in_season' ";
        
        $query_order = $query_order."season, episode";

    }

    $results = $con->query($query_select.$query_where.$query_order);


    if($in_type=="Movies"){
        foreach($results as $row){
            $returntext = sprintf('

                <li>
                    <div class="mediaitem">
                        <div class="info_cont">
                            <div class="mediatitle">
                                %2$s
                            </div>
                            <div class="mediainfo">
                                %6$s%5$s%4$s
                            </div>
                        </div>
                        <div class="functions">
                            <img src="resources/play.png" onclick="play_media("%3$s")"></img>
                            <img src="resources/download.png" onclick="download_media("%3$s")"></img>
                            <img src="resources/settings.png" onclick="settings_media("Movies",1)"></img>
                        </div>
                    </div>
                </li>
            
            ', $row['id'], $row['name'], $row['path'], $row['genre'], $row['runtime']." ", $row['year']." ");
            echo $returntext;
        }
    }
//    else if($in_type=="Shows"){
//        continue;
//    }


    $con->close();
?>
