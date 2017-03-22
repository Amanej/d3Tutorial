
// height and width of the svg
var height = 800,
     width = 500;

var padding = 50;

var viz = d3.select("#viz-wrapper-interactions")
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

// Set up the x axis
var xAxis = d3.svg.axis().scale(xScale)
                          .orient("bottom")
                          .ticks(20);
// Set up the y axis
var yAxis = d3.svg.axis().scale(yScale)
                          .orient("left")
                          .ticks(20);

var parseTime = d3.time.format("%Y%m%d");

d3.csv('climate_data.csv', function(data) {
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

  yScale.domain(yDomain);
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

  dots.append('circle')
      .attr('r', 5);

  dots.append('text')
      .text(function(d) {
        return d.TMAX
        })
        // Setting the text to by hidden by default
      .style('display', 'none');

  // Creating an event where the text is displayed upon the event, the event type is mouseenter ie hover
  dots.on("mouseenter", function(d, i) {
    // Using this gives us access to the data context
    dot = d3.select(this);
    dot.select('text')
       .style('display', 'block');
  });

  // Making the text hide when the mouse is gone
  dots.on("mouseleave", function(d, i) {
    // Using this gives us access to the data context
    dot = d3.select(this);
    dot.select('text')
       .style('display', 'none');
  });


});
