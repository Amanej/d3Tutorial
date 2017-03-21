
    // height and width of the svg - Easier to set height and width static
    var height = 800,
         width = 500;

    // padding variable
      // Make sure the center of each circles is at least 50px from the edge of the svg
      // Works like padding in CSS
    var padding = 50;

    var viz = d3.select("#scatterPlot")
                    .append('svg')
                    .attr('id', 'viz')
                    .attr('height', height)
                    .attr('width', width);

     d3.csv('data/climate_data.csv', function(data) {

        dots = viz.selectAll('circle')
                     .data(data)
                     .enter()
                    .append('circle');

        dots.attr('r', function(d, i) {
          // The debugger is the easiest way to check where something goes wrong
            // Calling d here gets us the first data row from our data
            // Calling the i gets us the iteration
          debugger;
          // The first line returns the TMAX - max temperature value for the data object in the current iteration
          return Math.abs(d.TMAX) / 10})
          // Setting the circle to x position
            // Positioning the circle to random value, that is also offset from the padding and times the width of total SVG minus the padding
          .attr('cx', function(d) {return Math.max(0 + padding, Math.random() * width - padding)})
          // Same as cx but for the y-axis
            // Basically we are not using the data value in this callback
          .attr('cy', function(d) {return Math.max(0 + padding, Math.random() * height - padding)})
            // Setting the stroke style attribute to red
            .style('stroke', 'red')
            // We are using the data to determine which color the dots should use
              // We are using the year value(from the date method in pure JS) to determine if its 1974 or 1973
            .style('fill', function(d) {
                year = d.DATE.charAt(3)
                if (year === "3") {
                    // Blue circles are from 1973
                    return "blue"
                }
                else {
                    // Green circles are from 1974
                    return "green"
                }
            });

     });
