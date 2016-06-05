#!/bin/bash
cd ../media/movies

for f in *;
do
    filename=`echo "$f" | sed 's/\.[^.]*$//'`;
    filepath="/media/movies/$f"
    echo "$filename";

    mysql -u eztheater -peztheater -e "INSERT INTO eztheater.Movies (name, path) VALUES('$filename', '$filepath');";
done
