console.log(1);
const url = "/flight";

console.log(3);

d3.json(url).then(function (response) {
  console.log(response[0]);
  const tableData = response;
  console.log(tableData[0]);
  var tb = d3.select("tbody");
  $(document).ready(function () {
    $("#ufo-table").DataTable({
      data: tableData,
      columns: [
        { data: "Date" },
        { data: "Airline" },
        { data: "Flight_Num" },
        { data: "Origin" },
        { data: "Destination" },
        { data: "Air_Time" },
        { data: "Distance" },
        { data: "Dep_Time" },
        { data: "Delay" },
        { data: "Cancelled" },
      ],

      retrieve: true,
    });
  });
});
