// var aggregate;
// function init(data) {
//   //console.log(data);
//   aggregate = data;
//   //populate dropdown with airport origin code; remove duplicates for dropdown(set)& sort
//   var originsSet = new Set(aggregate.map((element) => element.Origin));
//   var origins = Array.from(originsSet).sort((a, b) => a.localeCompare(b));
//   var selDataset = document.getElementById("selDataset");
//   var html = "";
//   origins.forEach((origin) => {
//     html += `<option>${origin}</option>`;
//   });
//   selDataset.innerHTML = html;
// }
// function optionChanged(origin) {
//   //   console.log(origin[0]);
//   //filter the aggregate data and get airlines at that origin; filter and sort
//   var airlines = aggregate
//     .filter((element) => element.Origin === origin)
//     .sort((a, b) => a.Airline.localeCompare(b.Airline));
//   console.log(airlines);
//   var xAxis = airlines.map((element) => element.Airline);
//   var yAxis = airlines.map((element) => +element.Delay);
//   //   var yAxis = airlines.map((element) => +element["Delay (min)"]);
//   //var hovertext =airlines.map(element => element.Airline);
//   console.log(xAxis, yAxis);
//   var plotlyData = [
//     {
//       x: xAxis,
//       y: yAxis,
//       type: "bar",
//       marker: {
//         colorscale: "redblue",
//         type: "heatmap",
//         line: {
//           color: "rgb(8,48,107)",
//           width: 1.5,
//           opacity: 0.5,
//         },
//       },
//     },
//   ];
//   Plotly.newPlot("bar", plotlyData);
//   /*function getPlot(data){
//     var xAxis = data.map(element => element.Dep_Time);
//     var yAxis = data.map(element => +element.Delay);
//       console.log(xAxis,yAxis);
//       var plotlyData = [
//       {x: xAxis,
//       y: yAxis,
//       mode: "markers",
//       colorscale: "YlGnBu",
//       type: "scatter",}];
//       Plotly.newPlot("scatter", plotlyData);
//   }*/
// }
// // function getPlot(data) {
// //   var xAxis = data.map((element) => element.Hour);
// //   var yAxis = data.map((element) => +element.Delay);
// //   var hovertext = data.map((element) => element.Airline);
// //   console.log(xAxis, yAxis);
// //   var plotlyData = [
// //     {
// //       x: xAxis,
// //       y: yAxis,
// //       mode: "markers",
// //       text: hovertext,
// //       marker: {
// //         size: 8,
// //         opacity: 0.5,
// //         //color: ids,
// //         colorscale: "YlGnBu",
// //       },
// //       //colorscale: "YlGnBu",
// //       type: "scatter",
// //     },
// //   ];
// //   Plotly.newPlot("scatter", plotlyData);
// // }
// function getBar(data) {
//   var xAxis = data.map((element) => element.Airline);
//   var yAxis = data.map((element) => +element.Delay);
//   var hovertext = data.map((element) => element.Airline_Info);
//   //   console.log(xAxis, yAxis);
//   var plotlyData = [
//     {
//       x: xAxis,
//       y: yAxis,
//       title: "Average Airline Delays (min) All Airports",
//       text: hovertext,
//       //colorscale:'YlGnBu',
//       type: "bar",
//       opacity: 0.5,
//       //   marker: {
//       //     color: "rgb(158,202,225)",
//       //     line: {
//       //       width: 1.5,
//       //       color: "rgb(158,202,225)",
//       //     },
//       //   },
//     },
//   ];
//   Plotly.newPlot("bar", plotlyData);
// }
// // read the data

// d3.json("/flight").then((data) => {
//   console.log(data[0]);
//   init(data);
//   getBar(data);
// });

// // d3.csv("ORD2.csv").then((data) => {
// //   console.log(data);
// //   getPlot(data);
// // });

// var aggregate;
// function init(data){
//   //console.log(data);
//   aggregate= data;
//   //populate dropdown with airport origin code; remove duplicates for dropdown(set)& sort
//   var originsSet = new Set(aggregate.map(element =>element.Origin));
//   var origins=Array.from(originsSet).sort((a,b)=>a.localeCompare(b));
//   var selDataset= document.getElementById("selDataset");
//   var html="";
//   origins.forEach(origin => {
//     html+=`<option>${origin}</option>`;
//   });
//   selDataset.innerHTML = html;
// }
// function optionChanged(origin){
//   console.log(origin);
//   //filter the aggregate data and get airlines at that origin; filter and sort
//   var airlines= aggregate.filter (element => element.Origin === origin).sort((a,b)=> a.Airline.localeCompare(b.Airline));
//   console.log(airlines);
//     var xAxis = airlines.map(element => element.Airline);
//     var yAxis = airlines.map(element => +element["Delay (min)"]);
//     //var hovertext =airlines.map(element => element.Airline);
//     console.log(xAxis,yAxis);
//     var plotlyData = [
//     {x: xAxis,
//     y: yAxis,
//     type:  "bar",
//     marker: {
//     colorscale:'redblue',
//     type: 'heatmap',
//       line: {
//         color: 'rgb(8,48,107)',
//         width: 1.5,
//         opacity: 0.5,
//       }
//     } }];
//     Plotly.newPlot("bar", plotlyData);
//   /*function getPlot(data){
//     var xAxis = data.map(element => element.Dep_Time);
//     var yAxis = data.map(element => +element.Delay);
//       console.log(xAxis,yAxis);
//       var plotlyData = [
//       {x: xAxis,
//       y: yAxis,
//       mode: "markers",
//       colorscale: "YlGnBu",
//       type: "scatter",}];
//       Plotly.newPlot("scatter", plotlyData);
//   }*/
// }
var aggregate;
function init(data) {
  //console.log(data);
  aggregate = data;
  //populate dropdown with airport origin code; remove duplicates for dropdown(set)& sort
  var originsSet = new Set(aggregate.map((element) => element.Origin));
  var origins = Array.from(originsSet).sort((a, b) => a.localeCompare(b));
  var selDataset = document.getElementById("selDataset");
  var html = "";
  origins.forEach((origin) => {
    html += `<option>${origin}</option>`;
  });
  selDataset.innerHTML = html;
}
function optionChanged(origin) {
  console.log(origin);
  //filter the aggregate data and get airlines at that origin; filter and sort
  var airlines = aggregate
    .filter((element) => element.Origin === origin)
    .sort((a, b) => a.Airline.localeCompare(b.Airline));
  console.log(airlines);
  var xAxis = airlines.map((element) => element.Airline);
  var yAxis = airlines.map((element) => +element["Delay"]);
  //var hovertext =airlines.map(element => element.Airline);
  console.log(xAxis, yAxis);
  var plotlyData = [
    {
      x: xAxis,
      y: yAxis,
      type: "bar",
      marker: {
        colorscale: "redblue",
        type: "heatmap",
        line: {
          color: "rgb(8,48,107)",
          width: 1.5,
          opacity: 0.5,
        },
      },
    },
  ];
  Plotly.newPlot("bar", plotlyData);
  /*function getPlot(data){
    var xAxis = data.map(element => element.Dep_Time);
    var yAxis = data.map(element => +element.Delay);
      console.log(xAxis,yAxis);  
      var plotlyData = [
      {x: xAxis,
      y: yAxis,
      mode: "markers",
      colorscale: "YlGnBu",
      type: "scatter",}];
      Plotly.newPlot("scatter", plotlyData);
  }*/
}
function getPlot(data) {
  var xAxis = data.map((element) => element.Hour);
  var yAxis = data.map((element) => +element.Delay);
  var hovertext = data.map((element) => element.Airline);
  console.log(xAxis, yAxis);
  var plotlyData = [
    {
      x: xAxis,
      y: yAxis,
      mode: "markers",
      text: hovertext,
      marker: {
        size: 8,
        opacity: 0.5,
        //color: ids,
        colorscale: "YlGnBu",
      },
      //colorscale: "YlGnBu",
      type: "scatter",
    },
  ];
  Plotly.newPlot("scatter", plotlyData);
}
function getBar(data) {
  var xAxis = data.map((element) => element.Origin);
  var xAxis = data.map((element) => element.Airline);
  var yAxis = data.map((element) => +element["Delay"]);
  var hovertext = data.map((element) => element.Airline);

  console.log(xAxis, yAxis);
  var plotlyData = [
    {
      x: xAxis,
      y: yAxis,
      title: "Average Airline Delays (min) All Airports",
      text: hovertext,
      //colorscale:'YlGnBu',
      type: "bar",
      opacity: 0.5,
      marker: {
        color: "rgb(158,202,225)",
        line: {
          width: 1.5,
          color: "rgb(158,202,225)",
        },
      },
    },
  ];
  Plotly.newPlot("bar", plotlyData);
}
// read the data
d3.json("/flight").then((data) => {
  //   console.log(data);
  init(data);
  getBar(data);
});
//   d3.csv("ORD2.csv").then((data)=> {
//     console.log(data);
//   getPlot(data);
//   });
