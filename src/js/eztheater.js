RAIL_SHIFT = '0px';
MEDIA_DIR = '/secure/static/media';
var main_index = {};


$( document ).ready(function() {
   $.getJSON(`${MEDIA_DIR}/index.json`, function(res){
     main_index = res;
     populate_rail();
   });
   $('#load_overlay').remove()
   // column_item = Handlebars.compile($.get('templates/column'));
   RAIL_SHIFT = "-" + $('.rail').css('width');
   $('#searchbox').focus();
});

function populate_rail(){
  filter = $("#searchbox").val()
  $('.rail-bottom').html("")
  for(var i in main_index.movies){
    let movie = main_index.movies[i];
    if(movie.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0){
      $('.rail-bottom').append(`
        <div class='rail-item', onclick="play_media(${i})">
          ${movie.name}
        </div>
      `);
    }
  }
}

function play_media(i){
  $("#vid").css("display", "inline-block");
  $("#tempmessage").css("display", "none");
  $("#vid")[0].src = "/secure/static/media/movies/" + main_index.movies[i].file;
  $("#vid")[0].load();
  $("#vid")[0].play();
}

function toggle_css(element, attr, v1, v2){
  var current = element.css(attr);
  if(current === v2){
    element.css(attr, v1);
  } else {
    element.css(attr, v2);
  }
}


function search_update(){
  $('.rail').css('left', '0px');
  populate_rail();
}

function select_burger(){
  toggle_css($('.rail'), 'left', RAIL_SHIFT, '0px');
}

