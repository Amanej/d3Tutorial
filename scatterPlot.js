
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
            // 
          .attr('cx', function(d) {return Math.max(0 + padding, Math.random() * width - padding)})
          .attr('cy', function(d) {return Math.max(0 + padding, Math.random() * height - padding)})
            .style('stroke', 'red')
            .style('fill', function(d) {
                year = d.DATE.charAt(3)
                if (year === "3") {
                    return "blue"
                }
                else {
                    return "green"
                }
            });

     });
