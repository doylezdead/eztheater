var MEDIA_DIR = '/secure/static/media';
var main_index = {};
var episode_template = Handlebars.compile($('#episode-template').html());
var season_template = Handlebars.compile($('#season-template').html());
var show_template = Handlebars.compile($('#show-template').html());

$( document ).ready(function() {
  $.getJSON(`${MEDIA_DIR}/index.json`, function(res){
    main_index = res;
    populate_results();
  });
  $('#searchbox').focus();
});

function populate_results(){
  var string_filter = $("#searchbox").val();
  var year_low = $("#yearlow").val();
  var year_high = $("#yearhigh").val();
  var genres = $("#genres").val();
  var container = $("#container");
  container.html("");
  console.log(main_index.shows);
  for(var i in main_index.shows){
    let show = main_index.shows[i];
    var show_dom = $(show_template({"name": show.name}));
    var show_ul = show_dom.find('div').find('ul');
    if((show.name.toLowerCase().indexOf(string_filter.toLowerCase())) >= 0){
      for(var j in show.seasons){
        let season = show.seasons[j];
        var season_dom = $(season_template({"season":j}));
        var season_ul = season_dom.find('div').find('ul');
        for(var k in season.episodes){
          let episode = season.episodes[k];
          var episode_dom = $(episode_template({
            "show": show.name,
            "path": season.path,
            "file": episode,
            "episode": k
          }));
          season_ul.append(episode_dom);
        }
        show_ul.append(season_dom);
      }
      container.append(show_dom);
    }
  }
}

function search_update(){
  populate_results();
}

function expand_result(that){
  var span = $(that).parent().parent();
  var span_div = span.children('div');
  var current_disp = span_div.css("display"); 
  if(current_disp == "none"){
    span_div.css('display', 'block');
  }else{
    span_div.css('display', 'none');
  }
}
