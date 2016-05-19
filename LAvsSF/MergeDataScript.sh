topojson -o LAwithData.json -e LAData.csv --id-property=+FID,+area -p population=+population -p prices=prices -p income=+income -p employment=+employment -p poverty=+poverty -- LosAngeles.json


topojson -o SFwithData.json -e SFData.csv --id-property=+area,+FID -p population=+population -p prices=prices -p income=+income -p employment=+employment -p poverty=+poverty -- SanFrancisco.json