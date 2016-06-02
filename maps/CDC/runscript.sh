#Command run through each directory and converts each .xls file into .csv 
#for dir in */;
#do
#	for f in $(find $dir -name '*.xls' -or -name '*.xlsx'); 
#		do libreoffice --headless --convert-to csv "$f" --outdir "$dir";
#	done
#done

#these commands go through each directory and run the data scraper
#It compiles formatted data by county into the output.csv file
python parser.py '02' AK
python parser.py '28' MS
python parser.py '01' AL
python parser.py '30' MT
python parser.py '05' AR
python parser.py '37' NC
python parser.py '60' AS
python parser.py '38' ND
python parser.py '04' AZ
python parser.py '31' NE
python parser.py '06' CA
python parser.py '33' NH
python parser.py '08' CO
python parser.py '34' NJ
python parser.py '09' CT
python parser.py '35' NM
python parser.py '11' DC
python parser.py '32' NV
python parser.py '10' DE
python parser.py '36' NY
python parser.py '12' FL
python parser.py '39' OH
python parser.py '13' GA
python parser.py '40' OK
python parser.py '66' GU
python parser.py '41' OR
python parser.py '15' HI
python parser.py '42' PA
python parser.py '19' IA 
python parser.py '72' PR
python parser.py '16' ID
python parser.py '44' RI 	
python parser.py '17' IL 	
python parser.py '45' SC
python parser.py '18' IN
python parser.py '46' SD
python parser.py '20' KS 
python parser.py '47' TN
python parser.py '21' KY 
python parser.py '48' TX
python parser.py '22' LA 
python parser.py '49' UT
python parser.py '25' MA
python parser.py '51' VA
python parser.py '24' MD
python parser.py '78' VI
python parser.py '23' ME
python parser.py '50' VT
python parser.py '26' MI
python parser.py '27' MN
python parser.py '55' WI
python parser.py '29' MO
python parser.py '54' WV
python parser.py '56' WY
