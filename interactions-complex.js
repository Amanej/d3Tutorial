
   // height and width of the svg
   var height = 800,
        width = 500;

   var padding = 50;

   // Default circle radius
    // We set the default radius smaller than circles too account for scaling
   var defaultCircleRadius = 2;

   var viz = d3.select("#viz-wrapper-complex")
                   .append('svg')
                   .attr('height', height + padding * 2 )
                   .attr('width', width + padding * 2)
                   .append('g')
                   .attr('id', 'viz')
                   .attr('transform',
                     'translate(' + padding + ',' + padding + ')');

   var yScale = d3.scale.linear()
                         .range([height, 0]);

   var xScale = d3.time.scale()
                         .range([0, width]);

   // This is a scale for the radius of the circles
    // These could be variables, but we will set them to be constant ie 5 and 50
   var rScale = d3.scale.linear()
                         .range([5, 50]);

   var xAxis = d3.svg.axis().scale(xScale)
                             .orient("bottom")
                             .ticks(20);

   var yAxis = d3.svg.axis().scale(yScale)
                             .orient("left")
                             .ticks(20);

   var parseTime = d3.time.format("%Y%m%d");

   // Basic geometric calculation to get R based on TMAX value of dot
   var solveForR = function(TMAX) {
       // area of a circle
       // Area = Pi * r * r
       Area = Math.abs( TMAX );
       r = Math.sqrt( Area / Math.PI);
       return r
     };

   d3.csv('data/climate_data.csv', function(data) {
     yDomain = d3.extent(data, function(element){
       return parseInt(element.TMAX) * 1.1
     });

     xMin = d3.min(data, function(element) {
       time = parseTime.parse(element.DATE);
       time.setMonth(time.getMonth() - 1);
       return time
     });

     xMax = d3.max(data, function(element) {
       time = parseTime.parse(element.DATE);
       time.setMonth(time.getMonth() + 1);
       return time
     });

     // Here we set the domain for the radius, ie the scaled value and then solve ForR based on TMAX
     rDomain = d3.extent(data, function(element){
       return solveForR(parseInt(element.TMAX));
     });

     yScale.domain(yDomain);
     // Here we map the rDomain to the rScale using the domain method
     rScale.domain(rDomain);
     xScale.domain([xMin, xMax]);

     // Add the X Axis
     viz.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis)
       .selectAll('text')
       .attr("transform", function() {
               return "rotate(-65)"
               })
       .style("text-anchor", "end")
       .style('font-size', '10px')
       .attr("dx", "-10px")
       .attr("dy", "10px");

     viz.append("g")
         .attr("class", "y axis")
         .call(yAxis);

     dots = viz.selectAll('g.dots')
                  .data(data)
                  .enter()
                 .append('g')
                 .attr('class', 'dots');

     dots.attr('transform', function(d) {
           // get the x position
           date = parseTime.parse(d.DATE);
           x = xScale(date)
           // get the y position
           y = yScale(d.TMAX)
           return 'translate(' + x + ',' + y + ')'
         })
         .style('stroke', '#00ffd2')
         .style('fill', '#006bff');

     // Setting the r value to the default Circle Radius
     dots.append('circle')
         .attr('r', defaultCircleRadius);

     dots.append('text')
         .text(function(d) {
           return d.TMAX
           })
         .style('display', 'none');

     dots.on("mouseenter", function(d, i) {
       dot = d3.select(this);
       // Here we calculate the radius of the circle by the TMAX value
       radius = solveForR( parseInt(d.TMAX) )
       dot.select('text')
          .style('display', 'block');
       dot.select('circle')
            // Here we use the calculated radius with the rScale, to change the radius of the circles
           .attr('r', rScale( radius ));
     });

     dots.on("mouseleave", function(d, i) {
       dot = d3.select(this);
       dot.select('text')
          .style('display', 'none');
       dot.select('circle')
          .attr('r', defaultCircleRadius);
     });

   });
