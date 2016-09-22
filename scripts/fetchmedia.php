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

    // echo "<li>".$query_select.$query_where.$query_order."<br>".$in_season."</li>";
    
                            


    if($in_type=="Movies"){
        foreach($results as $row){
            $playbutton = "";
            $runtimeformat = $row['runtime']."m";
            
            if(strchr($row['path'], '.mp4') || strchr($row['path'], '.mkv') || strchr($row['path'], '.m4v'))
                $playbutton = '<img src="resources/play.png" onclick="play_media(\''.$row['path'].'\')"></img>';
            else
                $playbutton = '<img src="resources/noplay.png" style="cursor: default;"></img>';

            if($row['runtime']==0)
                $runtimeformat = "";

            $returntext = sprintf('

                <li>
                    <div class="mediaitem">
                        <div class="info_cont">
                            <div class="mediatitle">
                                %2$s
                            </div>
                            <div class="mediainfo">
                                %6$s %8$s %4$s
                            </div>
                        </div>
                        <div class="functions">
                            %7$s
                            <a  href="%3$s" download><img src="resources/download.png"></img></a>
                            <img src="resources/settings.png" onclick="$(\'#media%1$s\').css(\'display\', \'inline-block\')"></img>
                        </div>
                    </div>
                    
                    <div id="media%1$s" class="mediaedit" style="height: 310;">
                        Name: <input id="media%1$sname" type="text" value="%2$s"></input><br>
                        Genre: <input id="media%1$sgenre" type="text" value="%4$s"></input><br>
                        Runtime: <input id="media%1$sruntime" type="text" value="%5$s"></input><br>
                        Year: <input id="media%1$syear" type="text" value="%6$s"></input><br>
                        <input type="button" onclick="submit_edit(\'Movies\',\'%1$s\'); $(\'#media%1$s\').css(\'display\', \'none\');" value="Submit"></input>
                        <input type="button" onclick="$(\'#media%1$s\').css(\'display\', \'none\');" value="Cancel"></input>
                    </div>

                </li>
            
            ', $row['id'], $row['name'], $row['path'], $row['genre'], $row['runtime'], $row['year'], $playbutton, $runtimeformat);
            echo $returntext;
        }
    }
    else if($in_type=="Shows"){
        foreach($results as $row){
            $returntext = sprintf('

                <li>
                    <div class="mediaitem">
                        <div class="info_cont">
                            <div class="mediatitle">
                                %2$s
                            </div>
                            <div class="mediainfo">
                                S:%4$sE:%5$s
                            </div>
                        </div>
                        <div class="functions">
                            <img src="resources/play.png" onclick="play_media(\'%3$s\')"></img>
                            <a  href="%3$s" download><img src="resources/download.png"></img></a>
                            <img src="resources/settings.png" onclick="$(\'#media%1$s\').css(\'display\', \'inline-block\')"></img>
                        </div>
                    </div>
                    <div id="media%1$s" class="mediaedit">
                        Name: <input id="media%1$sname" type="text"></input><br>
                        Season: <input id="media%1$sseason" type="text"></input><br>
                        Episode: <input id="media%1$sepisode" type="text"></input><br>
                        <input type="button" onclick="submit_edit(\'Shows\',\'%1$s\'); $(\'#media%1$s\').css(\'display\', \'none\');" value="Submit"></input>
                        <input type="button" onclick="$(\'#media%1$s\').css(\'display\', \'none\');" value="Cancel"></input>
                    </div>
                </li>
            
            ', $row['id'], $row['name'], $row['path'], $row['season']." ", $row['episode']);
            echo $returntext;
        }
    }
//    else if($in_type=="Shows"){
//        continue;
//    }


    $con->close();
?>
