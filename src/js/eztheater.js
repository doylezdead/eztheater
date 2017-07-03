RAIL_SHIFT = '0px';

$( document ).ready(function() {
   $('#load_overlay').remove()
   // column_item = Handlebars.compile($.get('templates/column'));
   RAIL_SHIFT = "-" + $('.rail').css('width');
   $('#searchbox').focus();

});

function play_media(source){
    $("#vid").css("display", "inline-block");
    $("#tempmessage").css("display", "none");
    $("#vid")[0].src = source;
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
}

function select_burger(){
  toggle_css($('.rail'), 'left', RAIL_SHIFT, '0px');
}

