var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'eztheater',
    password: 'eztheater',
    database: 'eztheater'
});

function get_columns(type, callback){
    var retdata = [];
    switch(type) {
        case 'Movies':
            conn.query('SELECT DISTINCT(genre) AS genre FROM Movies ORDER BY genre', function(err,results,fields){
                for(x in results){
                    retdata.push(results[x].genre);
                }
                callback(retdata);
            });
            break;
        case 'Shows':
            conn.query('SELECT DISTINCT(season) AS season FROM Shows ORDER BY season', function(err,results,fields){
                for(x in results){
                    retdata.push(results[x].season);
                }
                callback(retdata);
            });
            break;
        default:
            break;
    }
    return null;
}

function get_media(type, column, callback){
    var column_name = "";
    var query_where = "";
    var query_order = ' ORDER BY ';
    switch(type){
        case 'Movies':
            column_name = 'genre';
            query_order += 'name, year';
            break;
        case 'Shows':
            column_name = 'season';
            query_order += 'season, episode, name';
            break;
    }

    switch(column){
        case '*all*':
            break;
        case '*none*':
            query_where = ' WHERE '+column_name+' IS NULL';
            break;
        default:
            query_where = ' WHERE '+column_name+'="'+column+'"';
    }

    var query_string = "SELECT * FROM "+type+query_where+query_order;
    conn.query(query_string, function(err, results, fields){
        callback(results);
    });
    return null;
}

exports.columns = get_columns;
exports.media = get_media;
