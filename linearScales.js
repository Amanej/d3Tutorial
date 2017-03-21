// height and width of the svg
var height = 800,
     width = 500;

var padding = 50;

var viz = d3.select("#viz-wrapper")
                .append('svg')
                .attr('id', 'viz')
                .attr('height', height)
                .attr('width', width);

// Y scale is definition
  // Used to map data to a range
  // Could be a unit, value or color
  // We are using linear, and explicitly set it to height ie max and 0 is the origo
var yScale = d3.scale.linear()
                      .range([height, 0]);

d3.csv('data/climate_data.csv', function(data) {
  // set up minimum and maximum values for x and y scales
  yMax = d3.max(data, function(element) {
    // Make sure the checks reads the string as numeric value
    return parseInt(element.TMAX)
  });

  yMin = d3.min(data, function(element) {
    return parseInt(element.TMAX)
  });
  // Debugging and console logging yMax and yMin, gets us the max and min values for y

  // yDomain is the same as yMax and yMin
    // Performs faster because it is one iteration
      // Extra useful for large data sets
   yDomain = d3.extent(data, function(element){
     return parseInt(element.TMAX)
   });
   // yDomain [-33, 361]

  yScale.domain(yDomain);
  // yScale

  // Using the yScale
    // creating circles and using data
  dots = viz.selectAll('circle')
               .data(data)
               .enter()
              .append('circle');

  // Setting the y-axis value to scaled value with yScale
    // Ie the cy value is set for each day to be the highest measure temperature TMAX that day
      // The x value is still set randomly
  dots.attr('r', 5)
      .attr('cx', function(d) {
        return Math.max(0 + padding, Math.random() * width - padding) })
      .attr('cy', function(d) {
        // First mapped yScale
          // yScale(d.TMAX);
        return yScale(d.TMAX) })
      .style('stroke', '#00ffd2')
      .style('fill', '#006bff');
      debugger;
});
