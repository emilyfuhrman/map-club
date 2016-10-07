# 20161007 &mdash; WORKSHOP &mdash; Interactive Maps with CARTO

This guided session explores [CARTO](https://carto.com/), a unified web mapping and visualization engine.

#### Data sources

The datasets for this tutorial were downloaded from the ["forest use"](http://data.globalforestwatch.org/datasets?keyword=forest%20use) section of the [Global Forest Watch Open Data Portal](http://data.globalforestwatch.org/). Each dataset comes in the form of a compressed shapefile. A shapefile is an ESRI-created format comprised of three or more files that together represent vector features (such as points, lines, or polygons) as well as any associated attributes (such as "area," "ID," and "name"). **For the first portion of this tutorial, we will only need the Indonesia Wood Fiber Plantations dataset.** I have included the other datasets as optional sources for further exploration.

* Indonesia Wood Fiber Plantations, originally downloaded from [here](http://data.globalforestwatch.org/datasets/05c3a7ee17df4f69bf3c4f974a8bece9_0).
* Canada Forest Tenures, originally downloaded from [here](http://data.globalforestwatch.org/datasets/44bbf06379f545daa149ee7b237b9e18_1).
* Oil Palm Concessions (select countries), originally downloaded from [here](http://data.globalforestwatch.org/datasets/20398d4dc36e47bd92b559786670f270_1).

## Creating a forest use map in [CARTO](https://carto.com/)

#### Importing data into CARTO

* Log into your CARTO account. Hit the `NEW MAP` button to create a new working project.
* Unless you have already imported data into CARTO, your `DATASETS` tab should be empty. Click `CONNECT DATASET`, and select the **zipped** Indonesia Wood Fiber Plantations dataset. Wait for the data to import. The resultant view should look something like this:

![01](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/01.png)

* Before going any further, navigate to the `DATA VIEW` option in the top section of the CARTO window. Here, you can see the table associated with the shapefile you uploaded.

![02](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/02.png)

* A couple of notes:
	* Next to the column titled `the_geom`, you will see an orange `GEO` tag. This is the column that CARTO has extrapolated from the shapefile, which contains the geometry for each row. 
	* Notice the data type in gray under each column name (ex. `number`, `geometry`, `string`). CARTO automatically adds these labels to the imported data to indicate the type of data that each column contains. 
* Hit `MAP VIEW` at the top of the page to return to the map preview from earlier. 
* Zoom and pan around the map a bit. Because this map is comprised of vector data, the colored regions will appear crisp at any scale. If you click on a region, CARTO will automatically provide a popup box, though it will not provide any information since we have not yet selected any fields for it to display.

#### Visualizing 

