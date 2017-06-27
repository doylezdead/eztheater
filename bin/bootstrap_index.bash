#!/bin/bash
echo "{}" > index.json

# Get movies
for movie in movies/*; do
    filename=`echo $movie | rev | cut -d'/' -f1 | rev`

    name=`echo "SELECT name FROM Movies WHERE path LIKE '%$filename'" | mysql -ueztheater -peztheater eztheater`
    name=`echo $name | sed -e 's|name\ ||'`

    year=`echo "SELECT year FROM Movies WHERE path LIKE '%$filename'" | mysql -ueztheater -peztheater eztheater`
    year=`echo $year | sed -e 's|year\ ||'`

    genre=`echo "SELECT genre FROM Movies WHERE path LIKE '%$filename'" | mysql -ueztheater -peztheater eztheater`
    genre=`echo $genre | sed -e 's|genre\ ||'`

    jq ".movies |= .+ [{
        \"name\":\"$name\",
        \"genre\":\"$genre\",
        \"year\":\"$year\",
        \"file\":\"$filename\",
        \"subs\":\"\"
    }]" index.json > index2.json

    mv index2.json index.json
done
