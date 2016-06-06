#Command run through each directory and converts each .xls file into .csv 
#for dir in */;
#do
#	for f in $(find $dir -name '*.xls' -or -name '*.xlsx'); 
#		do libreoffice --headless --convert-to csv "$f" --outdir "$dir";
#	done
#done

#these commands go through each state's directory and run the data scraper
#It compiles formatted data by county into the output.csv file
python scraper.py '02' AK
python scraper.py '28' MS
python scraper.py '01' AL
python scraper.py '30' MT
python scraper.py '05' AR
python scraper.py '37' NC
python scraper.py '60' AS
python scraper.py '38' ND
python scraper.py '04' AZ
python scraper.py '31' NE
python scraper.py '06' CA
python scraper.py '33' NH
python scraper.py '08' CO
python scraper.py '34' NJ
python scraper.py '09' CT
python scraper.py '35' NM
python scraper.py '11' DC
python scraper.py '32' NV
python scraper.py '10' DE
python scraper.py '36' NY
python scraper.py '12' FL
python scraper.py '39' OH
python scraper.py '13' GA
python scraper.py '40' OK
python scraper.py '66' GU
python scraper.py '41' OR
python scraper.py '15' HI
python scraper.py '42' PA
python scraper.py '19' IA 
python scraper.py '72' PR
python scraper.py '16' ID
python scraper.py '44' RI 	
python scraper.py '17' IL 	
python scraper.py '45' SC
python scraper.py '18' IN
python scraper.py '46' SD
python scraper.py '20' KS 
python scraper.py '47' TN
python scraper.py '21' KY 
python scraper.py '48' TX
python scraper.py '22' LA 
python scraper.py '49' UT
python scraper.py '25' MA
python scraper.py '51' VA
python scraper.py '24' MD
python scraper.py '78' VI
python scraper.py '23' ME
python scraper.py '50' VT
python scraper.py '26' MI
python scraper.py '27' MN
python scraper.py '55' WI
python scraper.py '29' MO
python scraper.py '54' WV
python scraper.py '56' WY
