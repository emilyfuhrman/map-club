# 20161104 &mdash; WORKSHOP &mdash; Introduction to QGIS

This guided session explores [QGIS](http://www.qgis.org/en/site/), a free and open source geographic information system that offers powerful tools for data editing, viewing, and analysis. In preparation, please [download](http://www.qgis.org/en/site/forusers/download.html) QGIS and its dependencies. 

We will be walking through the necessary steps to create a basic land use map of Manhattan and export it as a PDF file in qGIS. The workshop presented for this session is an adaptation of the introductory lecture presented by Juan Francisco Saldarriaga for the [Mapping for Architecture, Urbanism and the Humanities](https://github.com/juanfrans-courses/mapping_arch_hum) class at Columbia University.

### Datasets:
To create this map, we will be using the following datasets:
* nybb - New York City boroughs. Originally downloaded from [here](http://www1.nyc.gov/site/planning/data-maps/open-data/districts-download-metadata.page).
* MNMapPLUTO - Manhattan PLUTO file (version 16v1), containing all the lots in Manhattan and their attributes. The original PLUTO files can be downloaded [here](http://www1.nyc.gov/site/planning/data-maps/open-data.page#pluto).
* Roadbed - New York roadbed. Originally downloaded [here](https://data.cityofnewyork.us/City-Government/Roadbed/xgwd-7vhd).
* DOITT_SUBWAY_STATION_01_13SEPT2010 - New York subway stations. Originally downloaded [here](https://data.cityofnewyork.us/Transportation/Subway-Stations/arq3-7z49).
* HYDRO - New York hydrography. Originally downloaded [here](https://data.cityofnewyork.us/Environment/Hydrography/drh3-e2fd).
* hydropol - U.S. Hydrographic features. Originally downloaded from [here](http://www.rita.dot.gov/bts/sites/rita.dot.gov.bts/files/publications/national_transportation_atlas_database/2015/polygon).

### Creating a Basic Land Use Map of Manhattan
First you need to open qGIS and add the layers you downloaded:
* To add *shapefiles* click on the `Add Vector Layer` button. Other types of data will be added using the other buttons, but in this tutorial we will only be using vector data (shapefiles). Other types of data include *rasters*, *csv* (comma separated values), and *postGIS* layers.

![Add Layer](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/01_Adding_Layers.png)
* Make sure you select the files with the extension `.shp`. Remember that a *shapefile* is actually made up of 5 or 6 individual files with different extensions. Normally, these individual files are the following:
  * .shp - The main file that stores the feature geometry (required).
  * .shx - The index file that stores the index of the feature geometry (required).
  * .dbf - The dBASE table that stores the attribute information of features (required).
  * .sbn and .sbx - The files that store the spatial index of features (these might get corrupted, see note at the end of this tutorial).
  * .prj - The file that stores the coordinate system information.
  * For more information on these extensions and others see [this explanation by ESRI](http://webhelp.esri.com/arcgisdesktop/9.2/index.cfm?TopicName=Shapefile_file_extensions).
* Once you've added all the layers you downloaded, you need to organize them in the layer panel. Remember that the layers will be drawn in the same order they appear in the panel: the top layer will be drawn last, on top of the other ones.
* The final order of the layers should be something like this (from top to bottom):
  * DOITT_SUBWAY_STATION_01_13SEPT2010
  * HYDRO
  * ROADBED
  * MNMapPLUTO
  * nybb
  * hydropol
* **If when you zoom in to one of the layers some of its features disappear see the note at the end of the tutorial.**

As you may have seen, qGIS assigns random colors to each of the layers you add. To change the appearance of each layer do the following:
* First, since we are interested in creating a land use of Manhattan, you should zoom in into this layer. To do this, right-click on the MNMapPLUTO layer and click `Zoom to Layer`.

![Zoom to Layer](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/02_Zoom_To_Layers.png)
* There are multiple ways of changing the appearance of a layer. The easiest (and simplest) is to double-click on the icon (point, line or polygon) next to the layer name on the layer panel. This brings up the `Style` tab in the `Layer Properties` panel. In there you can change the fill (color), stroke weight and fill (outline) and the size of the icon (if using points or icons).

![Style Tab](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/03_Style_Layer_Properties.png)
* In this panel change the style for the following layers in the following ways (we will leave the DOITT_SUBWAY and the MNMapPLUTO for the end):
  * hydropol:
    * Border style: No Pen
    * Fill: #cccccc (HTML notation)
  * nybb:
    * Border style: No Pen
    * Fill: #ffffff (HTML notation)
  * HYDRO:
    * Border style: No Pen
    * Fill: #cccccc (HTML notation)
  * ROADBED:
    * Border style: No Pen
    * Fill: #999999 (HTML notation)
* To change the appearance of the background, select the `Project` menu, and in there select `Project Properties`. Then, in the `General` tab you can change the `Background color` to #ffffff (HTML notation).

![Project Properties](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/04_Project_Properties.png)

Next we need to change the appearance of the MNMapPLUTO layer based on each lot's land use designation. This is called *symbolizing by category*. We will use data stored in the layer's attribute table to assign a symbology (fill and stroke) to each land use category.
* First, to get an idea of the data that we will use to symbolize, right-click on the MNMapPLUTO layer and select `Open Attribute Table`. The attribute table has all the data that's associated with each of the features. Each line of data corresponds to one feature in the dataset. As you can see, the MNMapPLUTO layer has a lot of data associated with it.

![MNMapPLUTO Attribute Table](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/05_Attribute_Table.png)
* Some of the most useful fields are:
  * ZoneDist1 - The main zoning district classification of the lot.
  * BldgClass - A code describing the major use of structures on the tax lot.
  * LandUse - A code for the tax lot's land use category (this is the one we will use for this map).
  * LotArea - Total area of the lot.
  * BldgArea - Total gross area in square feet.
  * NumBldgs - Number of buildings on the lot.
  * NumFloors - Number of floors in the primary building on the lot (this filed is sometimes used to do a very approximate calculation of the height of the buildings on the lot. You could assume that each floor is 12ft high and multiply the number of floors by 12. Again, this is not an accurate measurement, just a rough approximation).
  * YearBuilt - The year construction of the building was completed.
  * BuiltFAR - The total building floor area divided by the area of the tax lot.
  * You will find a further explanation of all the fields in the [PLUTO Data Dictionary](http://www.nyc.gov/html/dcp/pdf/bytes/pluto_datadictionary.pdf?r=2).
* If you look closely at the `LandUse` field, you will see that the values range from '01' to '11'. This correspond to specific land use classifications. The PLUTO Data Dictionary has the following definitions for each of the codes:
  * 01 - One & Two Family Buildings
  * 02 - Multi-Family Walk-Up Buildings
  * 03 - Multi-Family Elevator Buildings
  * 04 - Mixed Residential & Commercial Buildings
  * 05 - Commercial & Office Buildings
  * 06 - Industrial & Manufacturing
  * 07 - Transportation & Utility
  * 08 - Public Facilities & Institutions
  * 09 - Open Space & Outdoor Recreation
  * 10 - Parking Facilities
  * 11 - Vacant Land
* Now we need to symbolize using these codes and assign a specific color to each of them.
* To do this, right-click on the MNMapPLUTO layer and select `Properties` and go to the `Style` tab. You will see that at the top of this tab there is a drop-down menu that normally says `Single Symbol` which means that every feature in the layer will be drawn with a the same appearance. To symbolize by category, change that menu to `Categorized`.
* Under the `Column` option (at the right) click on the little filter symbol (to the left of the `ε` symbol) and choose the `LandUse` filed.

![Categorize by Field](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/06_Categorize.png)
* Finally, click on `Classify` to add all the different values in that field. Once you do this, you will be able to rename each of the values and change their appearance.
* By double-clicking on the symbol and on the `Legend` value, change the appearance and the name of each value following this key (note that for all of them you should use a `Border style` `Solid Line`, with a `Border Width` of 0.1 and a `Border color` of #4d4d4d (HTML notation)):
  * 01 - One & Two Family Buildings - Fill: 255,255,0 (rgb notation)
  * 02 - Multi-Family Walk-Up Buildings - Fill: 255,200,0 (rgb notation)
  * 03 - Multi-Family Elevator Buildings - Fill: 230,175,0 (rgb notation)
  * 04 - Mixed Residential & Commercial Buildings - Fill: 255,100,0 (rgb notation)
  * 05 - Commercial & Office Buildings - Fill: 230,0,0 (rgb notation)
  * 06 - Industrial & Manufacturing - Fill: 130,0,170 (rgb notation)
  * 07 - Transportation & Utility - Fill: 235,235,235 (rgb notation)
  * 08 - Public Facilities & Institutions - Fill: 115,180,255 (rgb notation)
  * 09 - Open Space & Outdoor Recreation - Fill: 165,250,120 (rgb notation)
  * 10 - Parking Facilities - Fill: 205,205,205 (rgb notation)
  * 11 - Vacant Land - Fill: 250,205,205 (rgb notation)
  * For the values that have no `LandUse` value, use #ffffff (HTML notation)
* It should look something like this:

![Land Use Classification](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/07_Land_Use_Classification.png)
* Finally, double-click on the DOITT_SUBWAY icon and adjust it's appearance in the following way:
  * Size: 5
  * Fill: #00aaff
  * Outline width: 0.5
  * Border: #4d4d4d
* And, to add a label for each of the stations, go to the `Labels` tab and do the following:
  * Check where it says `Label this layer with` and in the drop-down menu choose the `NAME` field.
  * Under `Text style` change the size of the font to 12
  * And in the `Placement` option, change the `Distance` to 3.

![Labels Properties](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/08_Labels.png)
* Now, none of these values are final. We need to prepare the `Print Composer` first and then adjust the values based on our output format.

First, before creating a `Print Composer` check to see you are working in the right projection. Porjections will be discussed further in the coming weeks, but basically map projections are ways of transforming locations on a sphere (the Earth) to locations on a plane (a 2D map). There are many types of projections and each one of them has a specific purpose and a specific area of relevance. The one typically used for maps of New York is called `NAD_1983_StatePlane_New_York_Long_Island_FIPS_3104_Feet`. Usually a map will take on the projection of the first layer you add to it, but sometimes you need to change the projection or you add a layer with a different projection. To change (or verify) the projection of the map project, go to `Project` `Project Properties` and on the left-hand panel select `CRS` (Coordinate Reference System). The projection we are using should be under `Projected Coordinate Systems` / `Lambert Conformal Conic`; or you can also look for it using the `Filter` option at the top and type in the projection's EPSG number `102718`. Once you've selected the right projection, click `OK`.

The `Print Composer` is where you will format your map for its final output. Here you will specify the output size, you will add a legend, a scale bar, a north arrow (if needed) and any additional text (titles, sources, explanations and credits). Although the `Print Composer` exists as its own window it will still be linked to the map `Project` we have been working on.
* First, create a new `Print Composer` in `Project` `New Print Composer`.
* Give it a name if you want, although this is not necessary.
* Once you are in the `Print Composer` you need to add a new map. Think of it as if you had a blank piece of paper and you were adding a window onto the map you've been working on. That window is a link to your `Project` and if you change things in the `Project` those changes will still be reflected in the `Print Composer`.
* To add a new map, click on the button `Add new map` on the left-hand panel and draw a rectangle on the blank page.

![Add New Map](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/09_Add_New_Map.png)
* Once you add the map you can adjust its size and position by dragging it from its corners.
* You might notice that if you change the size of the map it doesn't necessarily update. To avoid this, on the right-hand panel, where it says `Main properties`, click on `Update preview`. Or, you can also click on the drop-down menu where it says `Cache` and change it to `Render` so that it is constantly updating.

![Update Preview](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/10_Update_Preview.png)
* You can also move the content of the map by clicking on the `Move item content` button just above the `Add new map` button.
* Next, you need to center and zoom in the map on the area you want to focus on. For the purposes of this tutorial, we will zoom into the area around 125th street. To do this, move the content of the map to this area and on the left hand panel, adjust your `Scale` to 15000. Center your map so that you are focusing on this area but also so that you have some space up on the left-hand corner to put the title and the legend.
* If the text of the subway stations seems too big, you can always go back to the `Project` and change the size of the font in the label. When you return to your `Print Composer` you can update your preview and the changes will be reflected.
* Add a scale bar by going to `Layout` `Add scalebar` and clicking on the map.
* The default scale bar is too big and has some values left of the zero. To change this, go to the right-hand panel and in the `Segments` section change the `Segments` to 'left 0'.
* You can also adjust the `Height` of the scale bar to 2mm.
* Under `Fonts and colors` change the values to:
  * Font color: #4d4d4d
  * Fill color: #4d4d4d
  * Stroke color: #4d4d4d
* And in the `Display` section, change the `Line width` to 0.25mm
* To add a legend click on `Layout` `Add legend` and then click on the map. You will notice that qGIS automatically puts an icon for every layer in the map. We only need the ones for the PLUTO land use, so we need to customize the legend:
  * On the right-hand panel, under `Legend items` uncheck `Auto update` and then select the layers that you don't want in the legend and remove them with the 'minus' button.
  * Select the MNMapPLUTO layer and click on the edit button right next to the 'minus' button. Change the name of the layer to 'Land Use'.
  * On the top of the `Item properties`, under `Main properties`, remove the 'Legend' in the `Title`.
  * Also, further down, uncheck the `Background` option.
* Since we did not rotate the map we don't need to add a north arrow. If you rotate your map you MUST add a north arrow. If you wanted to, you could add a north arrow by clicking on `Layout` `Add arrow`.
* Finally, to add a title and a 'source' text, click on the `Add new label` button on the left-hand panel and click on the map. Customize these labels by changing their color, size and location.
* Your final map should look something like this:

![Final Map](https://github.com/emilyfuhrman/map-club/blob/master/2016_Fall/Session_06/Images/11_Final_Map.png)

The last step is to export the map as a PDF file. Use the `Export as PDF` button on the top toolbar and save your final map.
