#Ryan Brounley 
#Student at UC Santa Cruz
#
#This is a data scraper that reads all of the CDC reported children lead blood levels across US counties
#and combines them into a single organized csv file. This python script is ran with a bash script in this
#same directory.

import csv
import glob
import os
import sys

#total is going to be the final csv data
total = []
prefix = sys.argv

#takes in a parameter from the command line args
#and combines with only csv files
path = prefix[2] + "/*.csv"

#Enters directory with command line 
#specified state and goes through each *csv inside 
for fname in glob.glob(path):
    if fname != "output.csv":
        
        #opens the current fname with reading abilities
        #this loop reads all the data in the *csv file 
        #and either accumulates it to an already submitted county
        #or submits the new county with the *csv's data.
        with open(fname,'r') as csvinput:
                reader = csv.reader(csvinput)

                for row in reader:
                    if row[0].isdigit():
                        
                        #error checking to catch inconsistent data                      
                        if row[1] == '' or row[1] == 'Unknown' or row[1] == 'Unknown State' or row[1] == "Unknown County":
                            continue
                        
                        if row[2] == 'n' or row[2] == '':
                            continue
                            
                        if row[4] == 'n' or row[4] == '':
                            continue
                            
                        row[0] = prefix[1] + row[0]
                        there = False
                        
                        #Checks if the county was already found
                        #using the data in total. If it finds the county, it 
                        #adds their data together
                        for i in total:
                            if int(i[0]) == int(row[0]):
                                there = True
                                
                                #all error handling unique to the data being parsed.
                                if str(row[3]) != '':
                                    if str(row[3])[-1] != '%' and str(row[3])[-1] != '.':
                                        i[3] = int(i[3]) + int(row[3]) + int(row[4])
                                    else:
                                        i[3] = int(i[3]) + int(row[4])
                                    
                                i[2] = int(i[2]) + int(row[2])                               
                                break
                                
                        #if the above loop didn't find the county, this conditional adds
                        #a new item in total with the current county data.
                        if not there:
                            newRow = [int(row[0]), row[1], row[2], row[4], 0]
                            total.append(newRow)
                        
#Writes all the data accumulated from the above loops
#into a file named output.csv. If successful, it should all 
#be formatted the same.
with open('./output.csv', 'a') as csvoutput:
    writer = csv.writer(csvoutput, lineterminator='\n')
    print("written" + str(len(total)))
    
    #adds a fourth column that calculates the percentage of lead per county
    for item in total:
        item[4] = (float(item[3]) / int(item[2])) * 100
        
    #writes all the rows to the csv
    writer.writerows(total)
