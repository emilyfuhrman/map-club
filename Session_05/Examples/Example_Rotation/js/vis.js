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
  .scale(335)
  .translate([width/2, height/2]);  

var projection_03 = d3.geo.stereographic()
  .clipAngle(106.5)
  .scale(250)
  .translate([width/2, height/2])
  .precision(.1);

var path = d3.geo.path()
  .projection(projection);
var path_02 = d3.geo.path()
  .projection(projection_02);
var path_03 = d3.geo.path()
  .projection(projection_03);

var svg = d3.select('#map').append('svg')
  .attr('width',width)
  .attr('height',height);

var land,
    countries,
    countries_02;

//rotation
var r1 = d3.scale.linear()
  .domain([0,width])
  .range([-180,180]);
var r2 = d3.scale.linear()
  .domain([0,height])
  .range([90,-90]);

svg.on('mousemove',function(){
  var p = d3.mouse(this);
  
  projection.rotate([r2(p[0]),r1(p[1])]);
  projection_02.rotate([r1(p[0]),r2(p[1])]);
  projection_03.rotate([r1(p[0]),r2(p[1])]);


  countries.attr('d',path);
  countries_02.attr('d',path_03);
  land.attr('d',path_02);
});

d3.json('data/world-110m.json',function(e,world){
  if(!e){
    var data_land = topojson.feature(world, world.objects.land),
        data_countries = topojson.feature(world, world.objects.countries);

    countries = svg.selectAll('path.countries')
      .data([data_countries]);
    countries.enter().append('path')
      .classed('countries',true);
    countries
      .attr('d',path);
    countries.exit().remove();

    countries_02 = svg.selectAll('path.countries_02')
      .data([data_countries]);
    countries_02.enter().append('path')
      .classed('countries_02',true);
    countries_02
      .attr('d',path_03);
    countries_02.exit().remove();

    /*svg.insert('path','.countries')
      .datum(data_countries)
      .attr('class','countries')
      .attr('d',path);*/

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