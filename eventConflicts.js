
    // height and width of the svg
    var height = 800,
         width = 500;

    var padding = 50;

    var defaultCircleRadius = 2;

    var zoom = d3.behavior.zoom()
                  .scaleExtent([1, 10])
                  .on("zoom", zoomed);

    var circleDrag = d3.behavior.drag()
                        .on("dragstart", dragStarted)
                        .on("drag", dragged);

    var svg = d3.select("#viz-wrapper-conflict")
                    .append('svg')
                    .attr('height', height + padding * 2 )
                    .attr('width', width + padding * 2)
                    .call(zoom);

    var viz = svg.append('g')
                  .attr('id', 'viz')
                  .attr('transform',
                    'translate(' + padding + ',' + padding + ')');

    var yScale = d3.scale.linear()
                          .range([height, 0]);

    var xScale = d3.time.scale()
                          .range([0, width]);

    var rScale = d3.scale.linear()
                          .range([5, 50]);

    var xAxis = d3.svg.axis().scale(xScale)
                              .orient("bottom")
                              .ticks(20);

    var yAxis = d3.svg.axis().scale(yScale)
                              .orient("left")
                              .ticks(20);

    var parseTime = d3.time.format("%Y%m%d");

    var solveForR = function(TMAX) {
        // area of a circle
        // Area = Pi * r * r
        Area = Math.abs( TMAX );
        r = Math.sqrt( Area / Math.PI);
        return r
      };

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

      rDomain = d3.extent(data, function(element){
        return solveForR(parseInt(element.TMAX));
      });

      yScale.domain(yDomain);
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

      dots.append('circle')
          .attr('r', defaultCircleRadius);

      dots.append('text')
          .text(function(d) {
            return d.TMAX
            })
          .style('display', 'none');

      dots.on("mouseenter", function(d, i) {
        dot = d3.select(this);
        radius = solveForR( parseInt(d.TMAX) )
        dot.select('text')
           .style('display', 'block');
        dot.select('circle')
            .attr('r', rScale( radius ));
      });

      dots.on("mouseleave", function(d, i) {
        dot = d3.select(this);
        dot.select('text')
           .style('display', 'none');
        dot.select('circle')
           .attr('r', defaultCircleRadius);
      });

      dots.call(circleDrag);

    });

    // var container = d3.select("#viz-wrapper")
    //                   .select('svg');

    function zoomed() {
      viz.attr("transform", "translate(" +
                     d3.event.translate + ")" +
                    "scale(" + d3.event.scale + ")");
    };

    function dragStarted() {
      // Using stopPropagation to avoid triggering listener for pan
      d3.event.sourceEvent.stopPropagation();
      d3.select(this)
         .select('circle')
         .style("fill", 'red');
    };

    function dragged(d) {
      // Storing the x and y position
      d.x = d3.event.x;
      d.y = d3.event.y;
      // Manipulating the data in the circle
      d3.select(this)
         .attr("transform",
          'translate(' + d.x + ',' +
                         d.y + ')');
      // We are using the invert to turn a position to a date
      date = xScale.invert(d3.event.x);
      d.DATE = parseTime(date);
      // Likewise we are using invert to turn a position to a TMAX value
      temp = yScale.invert(d3.event.y);
      d.TMAX = temp.toString();
      // Here we could post the data to the database
      console.log(d);
    };
