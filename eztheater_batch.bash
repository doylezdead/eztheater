#!/bin/bash
cd movies

for f in *;
do
    filename=`echo "$f" | sed 's/\.[^.]*$//'`;
    filepath="movies/$f"
    echo "$filename";

    mysql -u eztheater -peztheater -e "INSERT INTO eztheater.Movies (name, path) VALUES('$f', 'movies/$f');";
done
