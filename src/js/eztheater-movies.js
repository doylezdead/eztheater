var MEDIA_DIR = '/secure/static/media';
var main_index = {};
var results_template = Handlebars.compile($('#result-template').html());

$( document ).ready(function() {
  $.getJSON(`${MEDIA_DIR}/index.json`, function(res){
    main_index = res;
    populate_genres();
    populate_results();
  });
  $('#searchbox').focus();
});

function populate_genres(){
  var genres = []; 
  var genres_dom = $('#genres');
  for(var i in main_index.movies){
    let movie = main_index.movies[i];
    if((genres.indexOf(movie.genre)) < 0){
      genres.push(movie.genre);
      genres_dom.append(`<option>${movie.genre}</option>`);
    }
  }
}

function populate_results(){
  var string_filter = $("#searchbox").val();
  var year_low = $("#yearlow").val();
  var year_high = $("#yearhigh").val();
  var genres = $("#genres").val();
  var container = $("#container");
  container.html("");
  for(var i in main_index.movies){
    let movie = main_index.movies[i];
    if((movie.name.toLowerCase().indexOf(string_filter.toLowerCase())) >= 0 &&
       (movie.genre == genres || genres == "All Genres") &&
       movie.year >= year_low &&
       movie.year <= year_high){
      container.append(results_template(movie));
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
