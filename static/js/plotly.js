var dataID = [
  "UA",
  "AS",
  "9E",
  "B6",
  "EV",
  "F9",
  "G4",
  "HA",
  "MQ",
  "NK",
  "OH",
  "OO",
  "VX",
  "WN",
  "YV",
  "YX",
  "AA",
  "DL",
];

dataID.forEach((obj) => {
  var option = d3.select("#selDataset").append("option");
  // Dynamically add 'value' attribute to option tag with D3: https://stackoverflow.com/questions/20860260/dynamically-add-value-attribute-to-option-tag-with-d3
  option.text(obj).attr("value", obj);
});
d3.selectAll("#selDataset").on("change", change);

function change() {
  var dropdownMenu = d3.select("#selDataset");
  var sampleId = dropdownMenu.node().value;
  d3.json("/flight").then((response) => {
    const data = response;
    console.log(1);
    console.log(data[0]);
    // metadata div
    var totalNum = data.length;
    var cancel = data.filter((fil) => fil.Delay == "null");
    var cancelTotalPc = Math.round((cancel.length / totalNum) * 10000) / 100;
    var filterData = data.filter((fil) => fil.Airline == sampleId);
    var delayData = filterData.filter((fil) => fil.Delay != "null");
    var cancelData = filterData.filter((fil) => fil.Delay == "null");
    var flightNum = filterData.length;
    var delaytNum = delayData.length;
    var cancelNum = cancelData.length;
    var delayArray = delayData.map((d) => d.Delay);
    var disArray = delayData.map((d) => d.Delay);
    var airArray = delayData.map((d) => d.Air_Time);
    var cancelPc = Math.round((cancelNum / flightNum) * 10000) / 100;
    // delayArray = [1, 2, 3, 4, 5];
    var delayAve = Math.round(
      delayArray.reduce((a, b) => a + b, 0) / delaytNum
    );
    console.log(cancelTotalPc);
    // console.log(delaytNum);
    // console.log(cancelNum);
    // console.log(cancelPc);
    // console.log(filterData);
    var sample = d3.select("#sample-metadata");
    sample.text("");
    sample.append("p").text("Date: " + filterData[0].Date);
    sample.append("p").text(`Airline: ${filterData[0].Airline_Info}`);
    sample.append("p").text("Total Flights: " + flightNum);
    sample.append("p").text("Canceled Flights: " + cancelNum);
    sample.append("p").text("Average Delay: " + delayAve + " min");
    trace1 = {
      y: delayArray,
      name: sampleId,
      marker: {
        color: "purple",
      },
      type: "box",
    };
    var layout1 = {
      title: `Delay (min) for ${filterData[0].Airline_Info}`,
      height: 500,
      width: 600,
      // xaxis: { title: `${sampleId}` },
    };
    data1 = [trace1];
    Plotly.newPlot("bar", data1, layout1);
    //     // bubble div: https://plotly.com/javascript/bubble-charts/

    var trace2 = {
      x: delayData.map((d) => d.Distance),
      y: delayData.map((d) => d.Air_Time),
      text: delayData.map(
        (d) =>
          `${d.Airline}${d.Flight_Num}, ${d.Origin}-${d.Destination}, delay: ${d.Delay} min `
      ),
      mode: "markers",
      marker: {
        // size: delayData.map((d) => d.Delay / 20),
        color: delayData.map((d) => d.Flight_Num),
      },
    };
    var data2 = [trace2];
    var layout2 = {
      title: `Distance vs. Airtime (${filterData[0].Airline_Info})`,
      height: 500,
      width: 1200,
      xaxis: { title: "Distance (miles)" },
      yaxis: { title: "Airtime (min)" },
    };
    Plotly.newPlot("bubble", data2, layout2);

    //     // Gauge  div:https://plotly.com/javascript/gauge-charts/
    var data3 = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: cancelPc,
        title: { text: "Cancelled (%)", font: { size: 20 } },
        type: "indicator",
        mode: "gauge+number+delta",
        delta: { reference: cancelTotalPc },
        gauge: {
          axis: { range: [null, 15] },
          steps: [
            { range: [0, cancelTotalPc], color: "lightgray" },
            // { range: [250, 400], color: "gray" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 10,
          },
        },
      },
    ];

    var layout3 = { width: 500, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot("gauge", data3, layout3);

    //     var trace3 = {
    //       domain: { x: [0, 1], y: [0, 1] },
    //       value: filterData.wfreq,
    //       title: { text: "Scrubs per Week" },
    //       type: "indicator",
    //       mode: "gauge+number",
    //       gauge: {
    //         axis: { range: [null, 9] },
    //         steps: [
    //           { range: [0, 1], color: "rgb(230,225,200)" },
    //           { range: [2, 3], color: "rgb(230,225,200)" },
    //           { range: [4, 5], color: "rgb(230,225,200)" },
    //           { range: [6, 7], color: "rgb(230,225,200)" },
    //           { range: [8, 9], color: "rgb(230,225,200)" },
    //           { range: [1, 2], color: "rgb(225,210,170)" },
    //           { range: [3, 4], color: "rgb(225,210,170)" },
    //           { range: [5, 6], color: "rgb(225,210,170)" },
    //           { range: [7, 8], color: "rgb(225,210,170)" },
    //         ],
    //       },
    //     };
    //     data3 = [trace3];
    //     var layout3 = {
    //       title: `Belly Button Washing Frequency (id: ${sampleId})`,
    //       width: 600,
    //       xaxis: { title: "OTU_ID" },
    //     };
    //     Plotly.newPlot("gauge", data3, layout3);
  });
}
