// Define the URL for earthquake data
var earthquakeDataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a Leaflet map object
let map = L.map("map", {
    center: [27.96044, -82.30695],
    zoom: 2
});

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch earthquake data using D3
d3.json(earthquakeDataUrl).then(function(earthquakeData) {
    // Define a function to determine marker color based on depth
    function getColor(depth) {
        return depth > 90 ? "#F06A6A" :
               depth > 70 ? "#F0A76A" :
               depth > 50 ? "#F3B94C" :
               depth > 30 ? "#F3DB4C" :
               depth > 10 ? "#E1F34C" :
                            "#B6F34C";
    }

    // Define a function to style each earthquake feature
    function style(feature) {
        return {
            stroke: true,
            radius: feature.properties.mag * 4,
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "black",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.8
        };
    }

    // Create a GeoJSON layer for earthquake data
    var earthquakeLayer = L.geoJson(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, style(feature));
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<strong>" + feature.properties.place + "</strong><br /><br />Magnitude: " +
              feature.properties.mag + "<br /><br />Depth: " + feature.geometry.coordinates[2]);
        }
    });

    // Add the GeoJSON layer to the map
    earthquakeLayer.addTo(map);

    // Create a legend control for earthquake depth
    var legend = L.control({ position: "bottomright" });

    // Define the legend content
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var depthRanges = [-10, 10, 30, 50, 70, 90];
        var colors = ['#B6F34C', '#E1F34C', '#F3DB4C', '#F3B94C', '#F0A76A', '#F06A6A'];

        // Populate the legend with color codes and depth ranges
        depthRanges.forEach(function(depth, index) {
            div.innerHTML += "<i style='background: " + colors[index] + "'></i> " +
                depth + (depthRanges[index + 1] ? "&ndash;" + depthRanges[index + 1] + "<br>" : "+");
        });

        return div;
    };

    // Add the legend to the map
    legend.addTo(map);
});
