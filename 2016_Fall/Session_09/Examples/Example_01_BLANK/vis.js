/* ------------------------------------------------------------------
 EXAMPLE 01 [BLANK]
 -------------------------------------------------------------------- */

//preset width and height
var w = window.innerWidth,
		h = window.innerHeight;

//define variables for retrieved data
var data_map,
		data_galleries;

//set svg width and height
var svg = d3.select('#container').append('svg')
	.attr('width',w)
	.attr('height',h);

/*	-----------------------------------------
		YOUR CODE GOES INSIDE THIS FUNCTION BELOW
		----------------------------------------- */

function generate(){

	//define projection

	//define path function

	//create map group

	//grab features from the GeoJSON dataset (5 boroughs)

	//draw map

	//use projection to plot galleries
}

//this function retrieves our CSV and GeoJSON files
//once it's finished, it calls generate() to render the retrieved data
function get_data(_callback){
	var loading = [1,2];

	d3.json('data/NYC_Boroughs.geojson',function(e,d){
		if(!e){ 
			data_map = d;
			loading = loading.filter(function(d){ return d !==1; }); 
			if(loading.length === 0){ _callback(); }
		}
	});
	d3.csv('data/NYC_Art_Galleries.csv',function(e,d){
		if(!e){ 
			data_galleries = d;
			loading = loading.filter(function(d){ return d !==2; }); 
			if(loading.length === 0){ _callback(); }
		}
	});
}
get_data(generate);