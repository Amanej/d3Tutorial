
 // height and width of the svg
 var height = 800,
      width = 500;

 var padding = 50;

 var viz = d3.select("#viz-wrapper-axis")
                 .append('svg')
                 .attr('height', height + padding * 2 )
                 .attr('width', width + padding * 2)
                 // Added the g element, group element
                 .append('g')
                 .attr('id', 'viz')
                  // Using g to add some padding inside the actual svg
                 .attr('transform',
                   'translate(' + padding + ',' + padding + ')');

 var yScale = d3.scale.linear()
                       .range([height, 0]);

 var xScale = d3.time.scale()
                       .range([0, width]);

 // Set up the x axis
 var xAxis = d3.svg.axis().scale(xScale)
                            // Orienting the axis to the bottom
                           .orient("bottom")
                           // Appriopriate ticks number and labels
                           .ticks(8);
 // Set up the y axis
 var yAxis = d3.svg.axis().scale(yScale)
                            // Orienting the axis to the left
                           .orient("left")
                           // Given the left or y axis a few more ticks
                           .ticks(20);

 var parseTime = d3.time.format("%Y%m%d");

 d3.csv('data/climate_data.csv', function(data) {
   yDomain = d3.extent(data, function(element){
     return parseInt(element.TMAX) * 1.1 // Gives us a longer y axis and more buffer between each
   });

   /*
   xDomain = d3.extent(data, function(element) {
     return parseTime.parse(element.DATE)
   });*/

   // Custom xMin and xMax to give months more space
    // Its more complicated because we are dealing with time
  xMin = d3.min(data, function(element) {
    time = parseTime.parse(element.DATE);
    // We are using the get and set month methods, to go one month backwards
    time.setMonth(time.getMonth() - 1);
    return time
  });

  xMax = d3.max(data, function(element) {
    time = parseTime.parse(element.DATE);
    // Here we are adding one month to the time
    time.setMonth(time.getMonth() + 1);
    return time
  });


   yScale.domain(yDomain);
   //xScale.domain(xDomain);
   // Using the customization of the min and max X value
   xScale.domain([xMin,xMax]);

   // Add the X Axis
   viz.append("g")
      // Creating a class attribute for the X axis
     .attr("class", "x axis")
     // Moving the X axis to the bottom
     .attr("transform", "translate(0," + height + ")")
     // Calling the xAxis
     .call(xAxis)
     // Rotating the text
      // select text element
     .selectAll('text')
     .attr("transform", function() {
          return "rotate(-65)"
        })
      .style("text-anchor","end")
      .style('font-size','10px')
      attr("dx","10px")
      attr("dy","10px");

   viz.append("g")
       .attr("class", "y axis")
       .call(yAxis);

   dots = viz.selectAll('circle')
                .data(data)
                .enter()
               .append('circle');

   dots.attr('r', 5)
       .attr('cx', function(d) {
         date = parseTime.parse(d.DATE);
         return xScale(date)
       })
       .attr('cy', function(d) {
         return yScale(d.TMAX)
       })
       .style('stroke', '#00ffd2')
       .style('fill', '#006bff');
 });
