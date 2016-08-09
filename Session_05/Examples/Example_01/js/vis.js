var width = 960,
    height = 500;

var _x = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

var _y = d3.scale.linear()
    .domain([0, height])
    .range([90, -90]);

var projection = d3.geo.conicEqualArea()
    .scale(150)
    .center([0, 33])
    .translate([width * .5, height * .5])
    .precision(.3);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);

d3.json("data/world-110m.json", function(error, world) {
  if (error) throw error;

  var land = topojson.feature(world, world.objects.land),
      sphere = {type: "Sphere"},
      touch = "ontouchstart" in window;

  canvas.on(touch ? "touchmove" : "mousemove", move);

  draw();

  function move() {
    var p = touch ? d3.touches(this)[0] : d3.mouse(this);
    projection.rotate([_x(p[0]), _y(p[1])]), draw();
    d3.event.preventDefault();
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    path(land);
    context.fill();
    context.beginPath();
    path(sphere);
    context.stroke();
  }
});