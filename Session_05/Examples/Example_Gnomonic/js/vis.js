var width = 960,
    height = 750;

var projection = d3.geo.gnomonic()
  //.clipAngle(90 - 1e-3)
  .clipAngle(75)
  .scale(90)
  .translate([width/2, height/2])
  .precision(.1);

var projection_02 = d3.geo.orthographic()
  .clipAngle(90)
  .scale(250)
  .translate([width/2, height/2]);  

var path = d3.geo.path()
  .projection(projection);
var path_02 = d3.geo.path()
  .projection(projection_02);

//var graticule = d3.geo.graticule();

var svg = d3.select('#map').append('svg')
  .attr('width',width)
  .attr('height',height);

d3.json('data/world-50m.json',function(e,world){
  if(!e){
    var data_land = topojson.feature(world, world.objects.land),
        data_countries = topojson.feature(world, world.objects.countries);
    var land,
        counties;

    countries = svg.selectAll('path.countries')
      .data([data_countries]);
    countries.enter().append('path')
      .classed('countries',true);
    countries
      .attr('d',path);
    countries.exit().remove();

    land = svg.selectAll('path.land')
      .data([data_land]);
    land.enter().append('path')
      .classed('land',true);
    land
      .attr('d',path_02);
    land.exit().remove();

    /*svg.insert('path','.land')
      .datum(data)
      .attr('class','land')
      .attr('d',path);*/
  }
});