//Link for displaying the map on the webpage: http://127.0.0.1:5500/Leaflet-Part-1/index.html
// Define the URL for earthquake data
const earthquakeDataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a Leaflet map object
const map = L.map("map").setView([27.96044, -82.30695], 3);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch earthquake data using D3
d3.json(earthquakeDataUrl).then(function(data) {
    // Define a function to determine marker size based on magnitude
    function getMarkerSize(magnitude) {
        return magnitude * 5;
    }

    // Define a function to determine marker color based on magnitude
    function getMarkerColor(magnitude) {
        return magnitude > 5 ? "#FF0000" :
               magnitude > 4 ? "#FFA500" :
               magnitude > 3 ? "#FFFF00" :
               magnitude > 2 ? "#ADFF2F" :
               magnitude > 1 ? "#32CD32" :
                               "#008000";
    }

    // Create a GeoJSON layer for earthquake data
    const earthquakeLayer = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getMarkerSize(feature.properties.mag),
                fillColor: getMarkerColor(feature.properties.mag),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup("<strong>" + feature.properties.place + "</strong><br />Magnitude: " + feature.properties.mag);
        }
    });

    // Add the GeoJSON layer to the map
    earthquakeLayer.addTo(map);

    // Create a legend control
    const legend = L.control({ position: "bottomright" });

    // Define the legend content
    legend.onAdd = function() {
        const div = L.DomUtil.create("div", "info legend");
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const labels = [];

        for (let i = 0; i < magnitudes.length; i++) {
            labels.push(
                '<i style="background:' + getMarkerColor(magnitudes[i] + 1) + '"></i> ' +
                magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+')
            );
        }

        div.innerHTML = labels.join('');
        return div;
    };

    // Add the legend to the map
    legend.addTo(map);
});
