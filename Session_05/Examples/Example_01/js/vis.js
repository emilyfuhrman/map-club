var w = 960,
	h = 500;

var projection = d3.geo.albersUsa()
	.scale(1000)
	.translate([w/2,h/2]);

var path = d3.geo.path()
	.projection(projection);