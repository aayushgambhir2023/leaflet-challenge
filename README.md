# leaflet-challenge
Link for map: http://127.0.0.1:5500/Leaflet-Part-1/index.html
As part of a project with the United States Geological Survey (USGS), I was tasked with developing a visualization tool to display earthquake data collected from around the world. The USGS collects vast amounts of data daily but lacks a meaningful way to visualize it for educational and informational purposes.

To begin, I created a new repository named leaflet-challenge and organized it into directories for Leaflet-Part-1 and Leaflet-Part-2. These directories will contain the HTML and JavaScript files needed to run the visualization.

For the first part of the challenge, I focused on creating the Earthquake Visualization. Here's what I did:

1. **Data Collection**: I visited the USGS GeoJSON Feed page to access earthquake data provided by the USGS. Upon selecting a dataset, such as "All Earthquakes from the Past 7 Days," I obtained a JSON representation of the earthquake data.

2. **Data Import and Visualization**: Using Leaflet, I created a map that plotted all the earthquakes from the dataset based on their longitude and latitude coordinates. To represent the magnitude of each earthquake, I adjusted the size of the data markers, with higher magnitudes resulting in larger markers. Additionally, I used different colors to indicate the depth of the earthquakes, with darker colors indicating greater depth.

3. **Popups for Additional Information**: I included popups for each earthquake marker that provide additional information about the earthquake when clicked. This additional information includes details such as the location, magnitude, and depth of the earthquake.

4. **Creation of Legend**: To provide context for the map data, I created a legend that visually represents the relationship between earthquake depth and color. The legend helps users interpret the significance of different colors on the map.

<img width="1438" alt="Screen Shot 2024-02-26 at 2 31 34 PM" src="https://github.com/aayushgambhir2023/leaflet-challenge/assets/132638124/39e3e77e-f007-422e-81f0-a2a2d3b6d5a6">
