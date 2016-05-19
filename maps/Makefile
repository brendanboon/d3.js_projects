all: topo/us-counties-10m-ungrouped.json

topo/us-counties-10m-ungrouped.json: shp/us/counties.shp
	mkdir -p $(dir $@)
	topojson \
		--external-properties output.csv \
        --id-property=+FIPS \
		--properties county=county \
        --properties totaltested=+totaltested \
        --properties totalpos=+totalpos \
        --properties percent=+percent \
        -o us_counties.json \
        --simplify=7e-7 \
		-- $<