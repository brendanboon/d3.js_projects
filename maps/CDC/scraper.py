import csv
import glob
import os
import sys

total = []
prefix = sys.argv
path = prefix[2] + "/*.csv"

for fname in glob.glob(path):
    if fname != "output.csv":
        #print(fname)
        with open(fname,'r') as csvinput:
                reader = csv.reader(csvinput)

                for row in reader:
                    if row[0].isdigit():
                                              
                        if row[1] == '' or row[1] == 'Unknown' or row[1] == 'Unknown State' or row[1] == "Unknown County":
                            continue
                        
                        if row[2] == 'n' or row[2] == '':
                            continue
                            
                        if row[4] == 'n' or row[4] == '':
                            continue
                            
                        row[0] = prefix[1] + row[0]
                        there = False
                        
                        for i in total:
                            if int(i[0]) == int(row[0]):
                                there = True
                                if str(row[3]) != '':
                                    if str(row[3])[-1] != '%' and str(row[3])[-1] != '.':
                                        i[3] = int(i[3]) + int(row[3]) + int(row[4])
                                    else:
                                        i[3] = int(i[3]) + int(row[4])
                                    
                                i[2] = int(i[2]) + int(row[2])                               
                                break
                                
                        if not there:
                            newRow = [int(row[0]), row[1], row[2], row[4], 0]
                            total.append(newRow)
                        
            
with open('./output.csv', 'a') as csvoutput:
    writer = csv.writer(csvoutput, lineterminator='\n')
    print("written" + str(len(total)))
    for item in total:
        item[4] = (float(item[3]) / int(item[2])) * 100
    writer.writerows(total)
