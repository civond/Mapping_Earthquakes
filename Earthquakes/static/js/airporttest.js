// Add GeoJSON data.
let sanFranAirport = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {
            "id": "3469",
            "name": "San Francisco International Airport",
            "city": "San Francisco",
            "country": "United States",
            "faa": "SFO",
            "icao": "KSFO",
            "alt": "13",
            "tz-offset": "-8",
            "dst": "A",
            "tz": "America/Los_Angeles"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-122.375, 37.61899948120117]
        }
    }]
};

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
    // We turn each feature into a marker on the map.
    //pointToLayer: function(feature, latlng) {
    //    console.log(feature);
    //    return L.marker(latlng)
    //        .bindPopup("<h2>" + feature.properties.name + "<hr></hr>" + "</h2>" + feature.properties.city + ', ' + feature.properties.country)
    // }
    //}).addTo(map);

    onEachFeature: function(feature, layer) {
        console.log(layer);
        console.log(feature);
        layer.bindPopup("<h2>" + feature.properties.name + "<hr></hr>" + "</h2>" + feature.properties.city + ', ' + feature.properties.country);
    }
}).addTo(map);