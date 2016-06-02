
function refresh () {
    
}

function populate_categories () {

}

function populate_seasons () {

}

function update_selectionas () {
    
}

function type_update () {
    newType = document.getElementById("type").value;
    
    if(newType=="Movies"){
        document.getElementById("season_cont").style.display = "none";
        document.getElementById("category_cont").style.display = "inline-block";
    }
    
    if(newType=="Shows"){
        document.getElementById("category_cont").style.display = "none";
        document.getElementById("season_cont").style.display = "inline-block";
    }

}
