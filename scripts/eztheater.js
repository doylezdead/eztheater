$( document ).ready(function() {
    console.log('JQuery ready');
    populate_genres_seasons();
});


function populate_genres_seasons () {
    console.log('Populating genres and seasons');

    $.get("scripts/fetchcolumn.php", { type: "Movies" }, function(data){$("#genre").html(data);});
    
    $.get("scripts/fetchcolumn.php", { type: "Shows" }, function(data){$("#season").html(data);});
}

function search_update () {
    //search fn here.
}

function full_update () {
    
    newType = $("#type").val();
    var divs = "";

    $.get( "scripts/fetchmedia.php", {
        type: $("#type").val(),
        genre: $("#genre").val(),
        season: $("#season").val() }
    ).done(function(data){divs=data;});
    
    $("#medialist").html(divs);

    search_update();
}

function type_update () {
    newType = $("#type").val();
    
    if(newType=="Movies"){
        $("#genre_cont").css("display", "inline-block");
        $("#season_cont").css("display", "none");
    }
    
    if(newType=="Shows"){
        $("#season_cont").css("display", "inline-block");
        $("#genre_cont").css("display", "none");
    }
    
    full_update();
}
