// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let sateliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark,
    "Satellite Streets": sateliteStreets
};

let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/civond/Mapping_Earthquakes/main/majorAirports.json";
// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/civond/Mapping_Earthquakes/main/torontoRoutes.json";
// Accessing the Toronto airline routes GeoJSON URL.
let torontoHood = "https://raw.githubusercontent.com/civond/Mapping_Earthquakes/main/torontoNeighborhoods.json";


// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.

    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            console.log(feature);
            layer.bindPopup("<h2>" + feature.properties.name + "<hr></hr>" + "</h2>" + feature.properties.city + ', ' + feature.properties.country);
        }
    }).addTo(map);
});

let LineStyle = {
    color: "#1FD1BE",
    cap: 'round',
    opacity: '.5',
    weight: '2'
}

// Grabbing our Toronto GeoJSON data.
d3.json(torontoData).then(function(data) {
    //console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            console.log(feature);
            layer.bindPopup("<h2> Airline: " + feature.properties.airline + "<hr></hr>" + "</h2>" + "Destination: " + feature.properties.dst + " (" + feature.properties.dst_id + ') ');
        },
        style: LineStyle
    }).addTo(map);
});

//Toronto Neighborhoods
d3.json(torontoHood).then(function(data) {
    console.log(data);
    L.geoJSON(data, {
            opacity: '.5',
            color: '#1F4BD1',
            fillColor: 'yellow',
            weight: '1'
        }

    ).addTo(map);
});


// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    //console.log(city)
    L.circleMarker(city.location, {
            radius: city.population / 1000000,
            color: 'yellow',
            fillColor: 'cyan'
        })
        .addTo(map)

    L.marker(city.location)
        .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>")
        .addTo(map);
});

let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
];
L.polyline(line, {
    color: "lavender",
    cap: 'round',
    dasharray: [4, 2],
    opacity: '.5',
    weight: '4'
}).addTo(map);


//L.circle([34.0522, -118.2437], {
//    radius: 100000,
//    color: 'black',
//    fillColor: 'yellow'
//}).addTo(map);