#These topojson commands can take a geoJSON or shapefile, imbed them with the 'properties' of a csv file, and convert them into topojson 
#It is important to preload all your data into the files because it is costly to run these same comparisons on each call of the topojson

#Command for the LA data.
topojson \
    -o LAwithData.json \ #specifies what the resulting topojson should be named
    -e LAData.csv \ #data source for the properties added
    --id-property=+FID,+area \ #the primary ids of both the csv and json/shp file where they match. These must match so the data is accurately imbedded. 
    -p population=+population \ #creates a property called 'population' in the topojson with each csv rows data in column 'population'
    -p prices=prices \ #same as above for prices
    -p income=+income \ #same as above for income
    -p employment=+employment \ #same as above for employment
    -p poverty=+poverty \ #same as above for poverty
    -- LosAngeles.json #name of the original json/shp file that is being imbed and converted.


#This command is the same process but for the San Francisco data and json.
topojson \
    -o SFwithData.json \
    -e SFData.csv \
    --id-property=+area,+FID \
    -p population=+population \
    -p prices=prices \
    -p income=+income \
    -p employment=+employment \
    -p poverty=+poverty \
    -- SanFrancisco.json
