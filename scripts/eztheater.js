$( document ).ready(function() {
    console.log('JQuery ready');
    populate_genres_seasons();
});


function populate_genres_seasons () {
    console.log('Populating genres and seasons');

    var d1 = $.get("scripts/fetchcolumn.php", { type: "Movies" }, function(data){$("#genre").html(data);});
    
    var d2 = $.get("scripts/fetchcolumn.php", { type: "Shows" }, function(data){$("#season").html(data);});
    
    $.when(d1,d2).done(function() {
        full_update();
    });
}

function search_update () {
    //search fn here.
}

function full_update () {
    console.log("Running a full update");

    $.get( "scripts/fetchmedia.php", {
        type: $("#type option:selected").text(),
        genre: $("#genre option:selected").text(),
        season: $("#season options:selected").text() }
    ).done(function(data){$("#medialist").html(data);});

    search_update();
}

function type_update () {
    newType = $("#type option:selected").text();
    
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
