// Basic json request with d3
d3.json('phones.json', function(error, data) {
   // do something with the data here
   console.log(error);
   console.log(data);
});

// Basic CSV request with d3
  // Using the debugger
d3.csv('climate_data.csv', function(data) {
   debugger;
});
