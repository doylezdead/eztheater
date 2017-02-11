column_item = "";
media_item = "";


$( document ).ready(function() {
    column_item = Handlebars.compile($('#column-template').html());
    media_item = Handlebars.compile($('#media-template').html());
    //console.log($('#column-template').html());
    //console.log('JQuery ready');
    populate_genres_seasons();

});

function play_media(source){
    $("#vid").css("display", "inline-block");
    $("#tempmessage").css("display", "none");
    $("#vid")[0].src = source;
    $("#vid")[0].load();
    $("#vid")[0].play();
}

function submit_edit(type, id){
    if(type=="Movies"){
        var name = $("#media" + id + "name").val();
        var genre = $("#media" + id + "genre").val();
        var runtime = $("#media" + id + "runtime").val();
        var year = $("#media" + id + "year").val();
        
        //console.log("!! "+name+genre+runtime+year);

        $.get("scripts/updatemovie.php", {
            id: id,
            name: name,
            genre: genre,
            runtime: runtime,
            year: year
        }, function(data){});

    }
    else if(type=="Shows"){
        var name = $("#media" + id + "name").val();
        var season = $("#media" + id + "season").val();
        var episode = $("#media" + id + "episode").val();

        $.get("scripts/updateshow.php", {
            id: id,
            name: name,
            season: season,
            episode: episode
        }, function(data){});
    }
}

function populate_genres_seasons () {
    //console.log('Populating genres and seasons');

    var d1 = $.get("api/columns", { type: "Movies" }, function(data){$("#genre").html(column_item({data:data}));});
    var d2 = $.get("api/columns", { type: "Shows" }, function(data){$("#season").html(column_item({data:data}));});
    
    $.when(d1,d2).done(function() {
        full_update();
    });
}

function search_update () {
    var query = $("#searchbox").val();
    var title = "";
    $("li").each(function(){
       title = $(this).find(".mediaitem .info_cont .mediatitle").text();
       if(!(title.toLowerCase()).includes(query.toLowerCase()))
           $(this).css("display", "none");
       else
           $(this).css("display", "block");
    });
}

function full_update () {
    //console.log("Running a full update");
    var type = $("#type option:selected").text();

    $.get( "api/media", {
        type: type,
        column: function(){
                    if(type==='Movies'){
                        return $("#genre option:selected").text();
                    }
                    if(type==='Shows'){
                        return $("#season option:selected").text();
                    }
                }()
    }).done(function(data){
        var ret = {data:data}

        for(i in ret.data){
            if(ret.data[i].path.endsWith('mp4') || ret.data[i].path.endsWith('m4v') || ret.data[i].path.endsWith('mkv')){
                ret.data[i].playable = true
            }
            if(type==='Movies'){
                ret.data[i].is_movie = true
            }
            if(type==='Shows'){
                ret.data[i].is_show = true
            }
        }
        //console.log(ret);

        $("#medialist").html(media_item(ret));
    });

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
