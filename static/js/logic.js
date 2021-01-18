var icons = {
  Fog: L.ExtraMarkers.icon({
    // icon: "ion-settings",
    // iconColor: "white",
    markerColor: "white",
    shape: "penta",
  }),

  Storm: L.ExtraMarkers.icon({
    // icon: "fa-coffee",
    // iconColor: "white",
    markerColor: "blue",
    shape: "star",
  }),
  Cold: L.ExtraMarkers.icon({
    // icon: "ion-minus-circled",
    // iconColor: "white",
    markerColor: "blue-dark",
    shape: "circle",
  }),
};

console.log("0");

// https://leafletjs.com/examples/choropleth/
function getColor(d) {
  return d > 90
    ? "#800026"
    : d > 70
    ? "#BD0026"
    : d > 50
    ? "#E31A1C"
    : d > 30
    ? "#FF5733"
    : d > 10
    ? "#FFC300"
    : d > -10
    ? "#DAF7A6"
    : "#2EB1BB";
}
// #DAF7A6;

var light = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY,
  }
);

var street = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    // tileSize: 512,
    maxZoom: 18,
    // zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  }
);

var sat = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY,
  }
);
const cycleScale = 100;
// Only one base layer can be shown at a time
var baseMaps = {
  Satellite: sat,
  Light: light,
  Street: street,
};

// Overlays that may be toggled on or off
// var overlayMaps = {
//   Cities: cityLayer,
// };

// Pass our map layers into our layer control
// Add the layer control to the map

// d3.json(url).then(function (response) {
//   console.log(response[0]);
// });

// console.log(1);
const url = "/airport";

d3.json(url).then(function (response) {
  var data = response;
  console.log(2);
  var coor = [];
  var cityMarkers = [];
  data.forEach((d) => {
    d.Lat = +d.Lat;
    d.Lon = +d.Lon;
    d.Cancelled = +d.Cancelled;
    d.AvgDelay = +d.AvgDelay;
    d.AvgDelay = Math.round(d.AvgDelay * 100) / 100;
    d.Flights = +d.Flights;
    coor = [d.Lat, d.Lon];
    cityMarkers.push(
      L.circle(coor, {
        color: getColor(d.AvgDelay),
        fillColor: getColor(d.AvgDelay),
        fillOpacity: 1,
        radius: d.Flights * cycleScale,
      }).bindPopup(`
          <h6> ${d.Fullname}<\h6>
          <p>${d.IATA_code}, ${d.City}, ${d.State}</p><hr>
          <p>Flights: ${d.Flights}, Cancelled: ${d.Cancelled}, AvgDelay: ${d.AvgDelay} min<\p>`)
    );
  });
  const url2 = "/severe";
  weatherType = ["Cold", "Fog", "Storm"];
  d3.json(url2).then(function (response2) {
    var data2 = response2;
    var corr2 = [];
    var sMarker = [];
    var heatArray = [];
    console.log(data2[0]);
    data2.forEach((d) => {
      d.LocationLat = +d.LocationLat;
      d.LocationLng = +d.LocationLng;
      corr2 = [d.LocationLat, d.LocationLng];
      // console.log(corr2);
      var weather = d.Type;
      // console.log(weather);
      heatArray.push(corr2);
      sMarker.push(
        L.marker(corr2, {
          icon: icons[weather],
        }).bindPopup(`
      <h6> ${weather}<\h6>`)
      );
    });
    slayer = L.layerGroup(sMarker);
    heatLayer = L.heatLayer(heatArray, {
      radius: 40,
      blur: 40,
      maxZoom: 10,
      max: 1,
      gradient: {
        0.0: "yellow",
        0.5: "green",
        1.0: "blue",
      },
    });

    var citylayer = L.layerGroup(cityMarkers);
    var overlayMaps = {
      Airports: citylayer,
      "Weather Type": slayer,
      "Severe Weather": heatLayer,
    };

    // Create map object and set default layers
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [street, citylayer],
    });

    L.control
      .layers(baseMaps, overlayMaps, {
        collapsed: false,
      })
      .addTo(myMap);

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (myMap) {
      var div = L.DomUtil.create("div", "info legend"),
        grades = [-10, 10, 30, 50, 70, 90];
      // labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      // https://leafletjs.com/examples/choropleth/
      div.innerHTML = `<p>AvgDelay (min)</p>`;
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(grades[i] + 1) +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }

      return div;
    };
    legend.addTo(myMap);
  });
});
// console.log(url2);
// const url2 = "/severe";
// weatherType = ["Cold", "Fog", "Storm"];
// d3.json(url2).then(function (response2) {
//   var data2 = response2;
//   var corr2 = [];
//   var sMarker = [];
//   console.log(data2[0]);
//   data2.forEach((d) => {
//     d.LocationLat = +d.LocationLat;
//     d.LocationLng = +d.LocationLng;
//     corr2 = [d.LocationLat, d.LocationLng];
//     sMarker.push(L.marker([corr2]));
//   });
// });
