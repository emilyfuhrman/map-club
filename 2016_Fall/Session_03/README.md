# 20161007 &mdash; WORKSHOP &mdash; Interactive Maps with CARTO

This guided session explores [CARTO](https://carto.com/), a unified web mapping and visualization engine.

#### Data sources

The datasets for this tutorial were downloaded from the ["forest use"](http://data.globalforestwatch.org/datasets?keyword=forest%20use) section of the [Global Forest Watch Open Data Portal](http://data.globalforestwatch.org/). Each dataset comes in the form of a compressed shapefile. A shapefile is an ESRI-created format comprised of three or more files that together represent vector features (such as points, lines, or polygons) as well as any associated attributes (such as "area," "ID," and "name").

* Indonesia Wood Fiber Plantations, originally downloaded from [here](http://data.globalforestwatch.org/datasets/05c3a7ee17df4f69bf3c4f974a8bece9_0).
* Canada Forest Tenures, originally downloaded from [here](http://data.globalforestwatch.org/datasets/44bbf06379f545daa149ee7b237b9e18_1).
* Oil Palm Concessions (select countries), originally downloaded from [here](http://data.globalforestwatch.org/datasets/20398d4dc36e47bd92b559786670f270_1).

## Creating a forest use map in [CARTO](https://carto.com/)

#### Indonesia Wood Fiber Plantations 

* Log into your CARTO account. Hit the `NEW MAP` button to create a new working project.
* Unless you have already imported data into CARTO, your `DATASETS` tab should be empty. Click `CONNECT DATASET`, and select the **zipped** Indonesia Wood Fiber Plantations dataset. Wait for the data to import. The resultant view should look something like this:

![01](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/01.png)