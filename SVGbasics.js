// Introduction to creating SVGs with D3
        function createSVG() {
            mySVG = d3.select('body').append('svg') // Returns a new selection, that has just been appended.
                                      .attr('height', '800')
                                      .attr('width', '500');
            mySVG.append('circle')
                  .attr('id', 'start')
                  .attr('class', 'foobar');

            mySVG.append('circle')
                  .attr('id', 'end')
                  .attr('class', 'foobar');

            mySVG.append('line')
                  .attr('class', 'foobar');
        };


        function thickenCircles() {
            var circles = d3.selectAll('circle')
                             .attr('r', '20');
        };

        function moveCircles() {
            d3.select("#start")
                .attr('cx', '100')
                .attr('cy', '100');

            d3.select("#end")
                .attr('cx', '200')
                .attr('cy', '200');
        };

        function styleLine() {
            d3.select('line')
               .attr('x1', 100)
               .attr('x2', 100)
               .attr('y1', 5)
               .attr('y2', 100)
               .style('stroke', 'cyan');
        };

        function moveLine() {
            d3.select('line')
                .attr('x1', '100')
                .attr('y1', '100')
                .attr('x2', '200')
                .attr('y2', '200');
        };

        function thickenLine() {
            d3.select('line')
                .style('stroke-width', '5');
        };

        function styleCircles() {
            d3.select('#start')
               .style('fill', 'lavender');
            d3.select('#end')
               .style('fill', 'none')
               .style('stroke', 'turquoise');
        };

        function runAll() {
            createSVG();
            thickenCircles();
            moveCircles();
            styleLine();
            moveLine();
            thickenLine();
            styleCircles();
        };
