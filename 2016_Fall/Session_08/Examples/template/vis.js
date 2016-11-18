/* ------------------------------------------------------------------
 TEMPLATE
 -------------------------------------------------------------------- */

var w = window.innerWidth,
	h = window.innerHeight;

var svg = d3.select('#vis')
	.append('svg')
	.attr('width',w)
	.attr('height',h)
	// .style('background','green')
	;

var myData = [50,100,150];
var circles = svg.selectAll('circle')
	.data(myData)
	.enter()
	.append('circle')
	// .attr('cx',500)
	.attr('cx',function(d,i){
		return (i*300) +250;
	})
	.attr('cy',300)
	.attr('r',function(d){
		return d;
	});









