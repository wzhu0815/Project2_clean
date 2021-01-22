///practice trial for additions to change optio

var aggregate;
var scatterdelay;

function init(data){
  //console.log(data);
  aggregate= data;
  
  //populate dropdown with airport origin code; remove duplicates for dropdown(set)& sort
  //add event listener for change eveny in dropdown
  var originsSet = new Set(aggregate.map(element =>element.Origin));
  var origins=Array.from(originsSet).sort((a,b)=>a.localeCompare(b));
  var selDataset= document.getElementById("selDataset");
  selDataset.addEventListener("change",optionChanged);
  var html="";
  origins.forEach(origin => {
    html+=`<option>${origin}</option>`;
  });
  selDataset.innerHTML = html;
}
//optionchanged gets called from the html; attached to attribute on html
function optionChanged(event){
  var origin =event.target.value;
  //call scatterplot after changeevent
  
  getPlot(origin);

  console.log(origin);
  //filter the aggregate data and get airlines at that origin; filter and sort
  var airlines= aggregate.filter (element => element.Origin === origin).sort((a,b)=> a.Airline.localeCompare(b.Airline));
  console.log(airlines);


    var xAxis = airlines.map(element => element.Airline);
    var yAxis = airlines.map(element => +element["Delay (min)"]);
    //var hovertext =airlines.map(element => element.Airline);

    console.log(xAxis,yAxis);  
    var plotlyData = [
    {x: xAxis,
    y: yAxis,
    type:  "bar",
    marker: {
    colorscale:'redblue',
    type: 'heatmap',
      line: {
        color: 'rgb(8,48,107)',
        width: 1.5,
        opacity: 0.5,
      }
    } }];

    Plotly.newPlot("bar", plotlyData);

  
      

}
  function getPlot(airport){
  var data =scatterdelay.filter(element=>element.Origin===airport);
  var xAxis = data.map(element => element.depthour);
  var yAxis = data.map(element => +element.Delay);
  var hovertext =data.map(element => element.Airline);

    console.log(xAxis,yAxis);  
    var plotlyData = [
    {x: xAxis,
    y: yAxis,
    mode: "markers",
    text: hovertext,
    marker: {
    size: 8,
    opacity: .5,
      //color: ids,
    colorscale:"YlGnBu"
    },
    //colorscale: "YlGnBu",
    type: "scatter",}];
   
    Plotly.newPlot("scatter", plotlyData);
  };

function getBar(data){
  var xAxis = data.map(element => element.Origin);
  var yAxis = data.map(element => +element["Delay (min)"]);
  var hovertext=data.map(element => element.Airline);

    console.log(xAxis,yAxis);  
    var plotlyData = [
    {x: xAxis,
    y: yAxis,
    title:'Average Airline Delays (min) All Airports',
    text: hovertext,
    //colorscale:'YlGnBu',
    type: "bar",
    opacity: 0.5,
    marker: {
    color: 'rgb(158,202,225)',
    line: {
      width: 1.5,
      color: 'rgb(158,202,225)',
    }
  }}];
    Plotly.newPlot("line", plotlyData);
}

  // read the data 
  d3.csv("avdelay.csv").then((data)=> {
    console.log(data);
   
    init(data);
    getBar(data);

  });

  d3.csv("flight_time.csv").then((data)=> {
    console.log(data);
scatterdelay=data

  //getPlot(data);


  });

    

