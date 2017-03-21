// height and width of the svg
    var height = 800,
         width = 500;

    var padding = 50;

    var viz = d3.select("#viz-wrapper-time")
                    .append('svg')
                    .attr('id', 'viz')
                    .attr('height', height)
                    .attr('width', width);

    var yScale = d3.scale.linear()
                          .range([height, 0]);

    var xScale = d3.time.scale()
                          .range([0, width]);

    // The format of the time is specified
      // This is Year, Month, Day
      // Gives us a valid JS Date Object
    var parseTime = d3.time.format("%Y%m%d");
    // Example day
    valentinesDay = "20150214";

    d3.csv('data/climate_data.csv', function(data) {
      yDomain = d3.extent(data, function(element){
        return parseInt(element.TMAX)
      });

      // Gets the extent of the time, by using extent
      xDomain = d3.extent(data, function(element) {
        return parseTime.parse(element.DATE)
      });

      yScale.domain(yDomain);
      // xDomain - [Wed Aug 01 1973 00:00:00 GMT+0100 (CET), Tue Dec 31 1974 00:00:00 GMT+0100 (CET)]
      xScale.domain(xDomain);
      // Passing an integer to the xScale will give us the date, in that arr

      dots = viz.selectAll('circle')
                   .data(data)
                   .enter()
                  .append('circle');

      dots.attr('r', 5)
          .attr('cx', function(d) {
            // date - Wed Aug 01 1973 00:00:00 GMT+0100 (CET) - first one
            date = parseTime.parse(d.DATE);
            return xScale(date)
          })
          .attr('cy', function(d) {
            return yScale(d.TMAX)
          })
          .style('stroke', '#00ffd2')
          .style('fill', '#006bff');
    });
