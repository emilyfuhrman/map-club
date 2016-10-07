# 20161007 &mdash; WORKSHOP &mdash; Interactive Maps with CARTO

This guided session explores [CARTO](https://carto.com/), a unified web mapping and visualization engine.

#### Resources

* [CARTO Documentation](https://carto.com/docs/)
* [CARTO Tutorials](https://carto.com/docs/tutorials/)
* [Topojson Command Line Reference](https://github.com/mbostock/topojson/wiki/Command-Line-Reference)

#### Data sources

The datasets for this tutorial were downloaded from the ["forest use"](http://data.globalforestwatch.org/datasets?keyword=forest%20use) section of the [Global Forest Watch Open Data Portal](http://data.globalforestwatch.org/). Each dataset comes in the form of a compressed shapefile. A shapefile is an ESRI-created format comprised of three or more files that together represent vector features (such as points, lines, or polygons) as well as any associated attributes (such as "area," "ID," and "name"). **For the first portion of this tutorial, we will only need the Indonesia Wood Fiber Plantations dataset.** I have included the other datasets as optional sources for further exploration.

* Indonesia Wood Fiber Plantations, originally downloaded from [here](http://data.globalforestwatch.org/datasets/05c3a7ee17df4f69bf3c4f974a8bece9_0).
	* [Metadata](http://data.globalforestwatch.org/datasets/05c3a7ee17df4f69bf3c4f974a8bece9_0?uiTab=metadata)
* Canada Forest Tenures, originally downloaded from [here](http://data.globalforestwatch.org/datasets/44bbf06379f545daa149ee7b237b9e18_1).
* Oil Palm Concessions (select countries), originally downloaded from [here](http://data.globalforestwatch.org/datasets/20398d4dc36e47bd92b559786670f270_1).
* New York City 311 Complaints, originally downloaded from [here](https://nycopendata.socrata.com/data?browseSearch=311).

## Creating maps in [CARTO](https://carto.com/)

### Map &mdash; Indonesia Wood Fiber Concessions

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

* CARTO automatically populated the palette with groups that had the most entries, bucketing the rest into an `OTHERS` category. Its default limit for distinct colors is 10. 
* Use `Polygon Fill` to adjust the opacity of the color.
* Use `Polygon Stroke` to adjust the width, color, and opacity of the outline of each area. 
* Navigating to the `CSS` button, you can view and edit the CartoCSS styles that control the appearance of each category.

![07](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/07_CartoCSS.png)

* Each of these colors is in HEX form. If you would like to customize the codes, visit [ColorBrewer](http://colorbrewer2.org/) or [Adobe Kuler](https://color.adobe.com/). 
* Make sure to hit `Apply Style` any time you make a change. 

#### Filtering out "No group" (optional)

Looking at this map, I realize that many of the regions are allocated to `NO GROUP`. Let's filter these rows out.

* Navigate to the `SQL` button on the side navigation bar.
* Below the default query that pulls your dataset into the map, add the following: `WHERE NOT group_comp = 'No group'`. This will exclude results that have "No group" as a value in the `group_comp` column.
* Hit `Apply query`. The color-coded "No group" results should no longer appear in the map, though they do still appear in the legend.

![08](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/08_SQL.png)

* To remove "No group" from the legend, click `create dataset from query`. This will create a new dataset with the applied filter. **Only do this if you are prepared to re-do your map styling in a new layer.** 
* **If you choose to create a new dataset from this query:**
	* Once CARTO finishes processing your request, you should see the `Data View` screen of the copied dataset.
	* Navigate back to your main map from the dashboard.
	* Use the `+` button to add the new copied dataset to the map.
	* Walk through the same styling steps as above to color-code the newly filtered data by the `group_comp` category.
	* Delete the original dataset, layer `1`, from the map.

#### Finalizing and publishing your map

* Use the `infowindow` button to customize your tooltip, if you choose.
* Use the `legend` button to customize your legend, if you choose.
* If you would like to change the basemap from its default setting, select the `Change basemap` option in the bottom left corner and choose a different style. (For those interested in reading about the process of creating the Stamen watercolor basemap, go [here](http://content.stamen.com/watercolor_process).)

![09](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/09_Basemap_Untitled.png)

* Once you have finished finalizing your map, click `Edit metadata...` under the top left title (which, by default, is currently `Untitled Map`). Here, you can edit the title to something of your choosing. I'm going to call mine "Indonesia Wood Fiber Concessions."
* Add a description and some tags, if you like. 

![10](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/10_Metadata.png)

* Click `SAVE`.
* Now, click the `PUBLISH` button in the top right corner. 
* The far left block of the resultant screen might indicate that you need to change your privacy settings in order for this map to be publicly visible. 

![11](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/11_Publish_Map_Window.png)

* Select your desired privacy setting and save. Your map is now publicly accessible! Navigate to the public link and check it out. 

![12](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_03/Images/12_Final.png)
