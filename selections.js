// First div in array
d3.select("div");

// Array of divs
d3.selectAll("div");

// All with the id three, there is only one
  // And id with all is kind of nonsensical
d3.selectAll("#tree");

  // Select all divs with class four
d3.selectAll('.four');

// Dom manipulation with D3 alone
  // Single
  d3.select('div').style('color','orange');
  // Multiple - Seems deprecated with v4
  d3.select('div').style({'color':'orange', 'font-size':'40px'})
  // Chaining with D3
  d3.selectAll('div')
    .style('background-color','#d3d3d3');
    // Multiple with data attr
    d3.selectAll('div')
    	.style('background-color','#efefef')
    	.attr('myattr', 'value');
    // Redundant classed example
    d3.selectAll('.tree')
	     .classed('tree');
    // Classed example that returns false
    d3.select('#tree')
	   .classed('tree');
    // Classed example that retuns false
      // Because it contains one div with the class four
      // that does not have the class tree
      d3.selectAll('div')
      	.classed('four');
    // Adding classes with classes
    d3.selectAll('div')
	   .classed('four',true);
     // Removing classes with classes
     d3.selectAll('div')
     .classed('four',false);
