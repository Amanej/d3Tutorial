// Creating SVG
var viz = d3.select("#viz-wrapper")
                .append('svg')
                .attr('id', 'viz');


// Fetching data
 d3.csv('data/climate_data.csv', function(data) {

      // Manipulating the created SVG - ghost selection since no circle exists
     dots = viz.selectAll('circle')
                  // data we are fetching is passed to data - does not add the, but joins the data to the selection
                  .data(data)
                  // Returns the same number of elements as in our data
                  .enter()
                  // Now the circles are created, with the number of elements in the data.
                    //The variables are named dots, they are not SVG
                    // Calling dots, is the same as saying viz.selectAll('circle')
                 .append('circle');

    // Here we are setting the radius or r value of the circles to the TMAX value
      // TMAX is in the data - In this case its the max temperature in the data set
        // It returns some errors because it contains some negative values
    dots.attr('r', function(d) {return d.TMAX});

    // So we use the Math.abs to set the r value to be absolute, non-negative
    dots.attr('r', function(d) {return Math.abs(d.TMAX)});

    // We set the radius value to be percentage value
      // The circles where too big and the total value of the svg was big black square
        // Setting the radius to a percentage value, will make the dots small enough
          // Next up, we need to position the dots to actually create a visualization
    dots.attr('r', function(d) {return Math.abs(d.TMAX) / 100});

 });
