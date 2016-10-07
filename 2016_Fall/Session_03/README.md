# 20161007 &mdash; WORKSHOP &mdash; Interactive Maps with CARTO

This guided session explores [CARTO](https://carto.com/), a unified web mapping and visualization engine.

#### Resources

* [CARTO Documentation](https://carto.com/docs/)
* [CARTO Tutorials](https://carto.com/docs/tutorials/)

#### Data sources

The datasets for this tutorial were downloaded from the ["forest use"](http://data.globalforestwatch.org/datasets?keyword=forest%20use) section of the [Global Forest Watch Open Data Portal](http://data.globalforestwatch.org/). Each dataset comes in the form of a compressed shapefile. A shapefile is an ESRI-created format comprised of three or more files that together represent vector features (such as points, lines, or polygons) as well as any associated attributes (such as "area," "ID," and "name"). **For the first portion of this tutorial, we will only need the Indonesia Wood Fiber Plantations dataset.** I have included the other datasets as optional sources for further exploration.

* Indonesia Wood Fiber Plantations, originally downloaded from [here](http://data.globalforestwatch.org/datasets/05c3a7ee17df4f69bf3c4f974a8bece9_0).
	* [Metadata](http://data.globalforestwatch.org/datasets/05c3a7ee17df4f69bf3c4f974a8bece9_0?uiTab=metadata)
* Canada Forest Tenures, originally downloaded from [here](http://data.globalforestwatch.org/datasets/44bbf06379f545daa149ee7b237b9e18_1).
* Oil Palm Concessions (select countries), originally downloaded from [here](http://data.globalforestwatch.org/datasets/20398d4dc36e47bd92b559786670f270_1).

## Creating maps in [CARTO](https://carto.com/)

### Map #1 &mdash; Indonesia Wood Fiber Concessions

For this map, we will use the Indonesia Wood Fiber Plantations dataset to visualize the different groups to whom the listed areas are allocated. 

#### Importing data into CARTO

* Log into your CARTO account. Hit the `NEW MAP` button to create a new working project.
* Unless you have already imported data into CARTO, your `DATASETS` tab should be empty. Click `CONNECT DATASET`, and select the **zipped** Indonesia Wood Fiber Plantations dataset. Wait for the data to import. The resultant view should look something like this:

![01](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/01_Map_View.png)

* Before going any further, navigate to the `DATA VIEW` option in the top section of the CARTO window. Here, you can see the table associated with the shapefile you uploaded.

![02](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/02_Data_View.png)

* A couple of notes:
	* Next to the column titled `the_geom`, you will see an orange `GEO` tag. This is the column that CARTO has extrapolated from the shapefile, which contains the geometry for each row. 
	* Notice the data type in gray under each column name (ex. `number`, `geometry`, `string`). CARTO automatically adds these labels to the imported data to indicate the type of data that each column contains. 
* Hit `MAP VIEW` at the top of the page to return to the map preview from earlier. 
* Zoom and pan around the map a bit. Because this map is comprised of vector data, the colored regions will appear crisp at any scale. If you click on a region, CARTO will automatically provide a popup box, though it will not provide any information since we have not yet selected any fields for it to display.

#### The CARTO interface

![03](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/03_Interface.png)

The CARTO interface contains a number of controls in the right toolbar. Here's a breakdown:

* The `+` button at the top of the bar enables you to add additional datasets to your working map.
* The `1` button allows you to choose which layer to focus on. Since we only have one dataset associated with this map, `1` is the only option available.
* The `SQL` option enables you to write custom SQL queries to filter the visible data.
* The `wizards` button controls the styling of the map.
* The `infowindow` button controls the appearance of the tooltip that appears when you click or hover over a vector region.
* The `CSS` button enables you to write custom, CARTO-specific markup called CartoCSS (which has similar syntax to regular CSS) for more fine-tuned control over the appearance of the elements in the map.
* The `legends` button allows for the creation of a custom legend.
* The `filters` button enables you to filter the visible data by the attributes in a selected column. 

#### Visualizing allocations by group

This data contains a list of organizations to whom a given area is allocated. We can gain a visual overview of these allocations by color-coding each region based on the `group_comp` column.

* Navigate to the `wizards` button, the paintbrush icon right below the `SQL` button in the right navigation bar.

![04](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/04_Wizards.png)

* In the first horizontal panel, select the `CATEGORY` option. We want our color scheme to reflect the fact that the groups are not related to one another either quantitatively or qualitatively, at least as reflected in this dataset. The scale we choose should therefore be comprised of colors that are qualitatively distinct from one another.

![05](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/05_Wizards_Category.png)

* Next to the `Column` label, we can see that the default column driving this newly-selected color scheme is the `area_ha` column. This is a quantitative measure of the areas themselves, which is not what we want. Instead, select `group_comp` from the column. Your map should now look something like this:

![06](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/06_Colorized.png)

