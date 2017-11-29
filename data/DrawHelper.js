Ext.define('Sisclaten.DrawHelper', {
	
	statics: {
		activeDrawableLayer: null,
		dirty : false,
		vectorSource : null,
		draw : null,
		drawedFeature : null,
		lastCoordinates : 0,
                drawing : false,
                theData : null,
                projectId : null,
                pointermoveEvt : null,
                mapClickEvt : null,
                //vertexPosition : null,
                defaultStyle : null,
                invalidStyle : null,
                asData : {},
                coordinates : [],
                modify : null,
		creating : false,
                projectNode : null,
                areaSobrevooFeature : null,
                
		finish : function() {
                    var me = Sisclaten.DrawHelper;
                    if ( me.draw ) Sisclaten.MapHelper.map.removeInteraction( me.draw );
                    Sisclaten.MapHelper.removeLayerByName('drawableLayer');
                    me.drawedFeature = null;
                    me.draw = null;
                    me.vectorSource = null;
                    me.activeDrawableLayer = null;
                    me.drawing = false;
                    me.theData = null;
                    me.projectId = null;
                    me.creating = false;
                    me.projectNode = null;
                    me.areaSobrevooFeature = null,
                    me.asData = {};
                    if ( me.pointermoveEvt ) {
                        ol.Observable.unByKey( me.pointermoveEvt );
                    };                    
                    if ( me.mapClickEvt ) {
                        ol.Observable.unByKey( me.mapClickEvt );
                    }; 
                    
                    if ( me.modify ) Sisclaten.MapHelper.map.removeInteraction( me.modify );
                    this.modify = null;
                    
		},
		
		init : function( data, pid, projectNode ) {
                    var me = Sisclaten.DrawHelper;
                    me.dirty = false;
                    me.drawing = true;
                    me.theData = data;
                    me.projectId = pid;
                    me.creating = true;
                    me.projectNode = projectNode;
                    
                    me.pointermoveEvt = Sisclaten.MapHelper.map.on('pointermove', me.pointerMoveHandler);
                    me.mapClickEvt = Sisclaten.MapHelper.map.on('click', me.mapClickHandler);

                    me.vectorSource = new ol.source.Vector();

                    me.vectorSource.on('addfeature', function( evt ){
                        Sisclaten.MapHelper.map.removeInteraction( me.draw );
                    });				


                    me.defaultStyle =  new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(112, 128, 144, 0.2)' 
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#708090',
                                width: 1
                        })
                    });  


                    me.invalidStyle =  new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(249, 2, 2, 0.8)' 
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#708090',
                                lineDash: [10, 10],
                                width: 1
                        })
                    });  
			
                    me.activeDrawableLayer = new ol.layer.Vector({
                            source: me.vectorSource,
                            style: me.defaultStyle
                    });			


                    me.activeDrawableLayer.set('name', 'drawableLayer');
                    me.activeDrawableLayer.set('alias', 'drawableLayer');
                    me.activeDrawableLayer.set('serialId', 'drawableLayer');
                    me.activeDrawableLayer.set('baseLayer', false);
                    me.activeDrawableLayer.set('ready', true);

                    Sisclaten.MapHelper.removeLayerByName('drawableLayer');
                    Sisclaten.MapHelper.map.addLayer( me.activeDrawableLayer );
		},
                
                editFeicao : function() {
                    var layer = me.activeDrawableLayer;
                    
                },
                
		// Seta o tipo de desenho
		setDrawType : function( type ) {
                    var me = Sisclaten.DrawHelper;
                    me.addInteraction();
		},
		
		// Adiciona a interacao ao mapa
		addInteraction : function( ) {
                    var me = Sisclaten.DrawHelper;
                    if ( me.draw ) Sisclaten.MapHelper.map.removeInteraction( me.draw );

                    me.draw = new ol.interaction.Draw({
                        source: me.vectorSource,
                        type: 'Polygon',
                    });

                    me.draw.on('drawstart', function( evt ){
                        me.vectorSource.clear();
                        me.creating = true;
                    });


                    me.draw.on('drawend', function( evt ){
                        me.drawedFeature =  evt.feature;
                        me.creating = false;
                        // var geometry = me.drawedFeature.getGeometry();
                        // Se quiser adicionar informações na feição
                        // me.drawedFeature.set( 'theData', me.theData );
                        
                        // Coloca em modo de edição logo após terminar de criar
                        Sisclaten.MapHelper.map.removeInteraction( me.draw );
                        var temp = new ol.Collection( [ me.drawedFeature ] );
                        me.modify = new ol.interaction.Modify({features: temp});
                        Sisclaten.MapHelper.map.addInteraction(me.modify);
                        
                        me.verificaAreas( me.drawedFeature );
                        
                        me.modify.on('modifyend', function( evt ) {
                            
                            var featureDesenhada = evt.features.getArray()[0];
                            
                            // Terminou de editar um vértice. Atualiza a tabela de coordenadas
                            var coords = featureDesenhada.getGeometry().getCoordinates()[0];
                            
                            $("#drawGridTable tr").remove();
                            me.coordinates.length = 0;
                            for( x=0; x < coords.length; x++ ) {
                                var coord = coords[x];
                                var hdms = ol.coordinate.toStringHDMS( coord, 5 );
                                var coordData = {};
                                coordData.hdms = hdms;
                                coordData.decimal = coord;
                                coordData.parts = hdms.split(/[^\d\w]+/);  
                                me.coordinates.push( coordData );
                                $("<tr><td id='coord_"+x+"' style='border-bottom: 1px dotted #cacaca;width:95%'>" + hdms + "</td><td style='border-bottom: 1px dotted #cacaca;width:5%'>&nbsp;</td></tr>").appendTo('#drawGridTable tbody').hide().fadeIn(1000);
                            }
                            
                            me.verificaAreas( featureDesenhada );
                        }); 
                        // ----------------------------------------------------
                        
                    });

                    Sisclaten.MapHelper.map.addInteraction( me.draw );
                },
                
                verificaAreas : function( featureDesenhada ) {
                    var me = Sisclaten.DrawHelper;
                    if ( me.areaSobrevooFeature ) {

                        var format = new ol.format.GeoJSON();
                        var geojsonReader = new jsts.io.GeoJSONReader();

                        var sobrevoo = geojsonReader.read( format.writeFeatureObject(me.areaSobrevooFeature)).geometry;
                        var imageada = geojsonReader.read( format.writeFeatureObject(featureDesenhada)).geometry;

                        if ( sobrevoo.contains( imageada ) ) {
                            me.dirty = false;
                            me.activeDrawableLayer.setStyle( me.defaultStyle );
                            me.activeDrawableLayer.getSource().changed();                                    
                        } else {
                            me.dirty = true;
                            me.activeDrawableLayer.setStyle( me.invalidStyle );
                            me.activeDrawableLayer.getSource().changed();
                        }

                    }
                    
                },
                
		getAsJson : function() {
                    var me = Sisclaten.DrawHelper;
                    if ( !me.vectorSource ) return null;
                    var geojson  = new ol.format.GeoJSON();
		    var featureCollection = me.vectorSource.getFeatures();
                    if ( featureCollection.length === 0 ) return null;
		    var jsonData = geojson.writeFeatures( featureCollection,{ });
		    return jsonData;
		},
                
                mapClickHandler : function( evt ) {
                    var me = Sisclaten.DrawHelper;
                    
                    if( !me.creating ) {
                        return true;
                    }
                    
                    var hdms = ol.coordinate.toStringHDMS( evt.coordinate, 5 );
                    var coordData = {};
                    coordData.hdms = hdms;
                    coordData.decimal = evt.coordinate;
                    coordData.parts = hdms.split(/[^\d\w]+/);
                    
                    me.coordinates.push( coordData );
                    me.processClick( coordData );
                    /*
                    if ( (me.vertexPosition === 'OUT') && ( Sisclaten.DrawHelper.theData.codMenu !== 'AS'  ) ) {
                        me.dirty = true;
                        me.activeDrawableLayer.setStyle( me.invalidStyle );
                        me.activeDrawableLayer.getSource().changed();
                    }
                    */
                },
                
                
                parseDMS : function( parts ) {
                    var lat = this.convertDMSToDD(parts[0], parts[1], parts[2], parts[3], parts[4]);
                    var lng = this.convertDMSToDD(parts[5], parts[6], parts[7], parts[8], parts[9]);
                    var result = [];
                    result.push(lng);
                    result.push(lat);
                    return result;
                },
                
                processClick : function( coordData ) {
                    var coordinate = coordData.hdms;
                    var index = this.coordinates.length-1;
                    var click = "onclick=\"Sisclaten.DrawHelper.edit(\'"+index+"\')\"";
                    //var edit = "<img style='cursor:pointer' src='resources/images/edit.png' " + click + ">";
                    var edit = "&nbsp;";
                    $("<tr><td id='coord_"+index+"' style='border-bottom: 1px dotted #cacaca;width:95%'>" + coordinate + "</td><td style='border-bottom: 1px dotted #cacaca;width:5%'>" + edit + "</td></tr>").appendTo('#drawGridTable tbody').hide().fadeIn(1000);
                },
                
                
                edit : function( index ) {
                    var coordData = this.coordinates[index];
                    var editCoord = Ext.getCmp('editCoord');
                    if ( !editCoord ) {
                        editCoord = Ext.create('Sisclaten.view.projeto.DrawControlEditCoordWindow');
                    }
                    editCoord.show();
                    editCoord.currentIndex = index;
                    
                    $("#editDD").val( coordData.parts[0] );
                    $("#editMM").val( coordData.parts[1]);
                    $("#editSS").val( coordData.parts[2] );
                    $("#editMS").val( coordData.parts[3]);
                    $("#editQQ").val( coordData.parts[4] );
                    
                    $("#editDD2").val( coordData.parts[5] );
                    $("#editMM2").val( coordData.parts[6]);
                    $("#editSS2").val( coordData.parts[7] );
                    $("#editMS2").val( coordData.parts[8]);
                    $("#editQQ2").val( coordData.parts[9] );
                },

                doUpdateCoords : function() {
                    var editCoord = Ext.getCmp('editCoord');
                    var coordData = this.coordinates[ editCoord.currentIndex ];
                    var tempParts = [];
                    
                    tempParts[0] = $("#editDD").val();
                    tempParts[1] = $("#editMM").val();
                    tempParts[2] = $("#editSS").val();
                    tempParts[3] = $("#editMS").val();
                    tempParts[4] = $("#editQQ").val();
                    
                    tempParts[5] = $("#editDD2").val();
                    tempParts[6] = $("#editMM2").val();
                    tempParts[7] = $("#editSS2").val();
                    tempParts[8] = $("#editMS2").val();
                    tempParts[9] = $("#editQQ2").val();
                    
                    var asDecimal = this.parseDMS( tempParts );
                    coordData.hdms = ol.coordinate.toStringHDMS( asDecimal, 5 );
                    coordData.decimal = asDecimal;
                    coordData.parts = tempParts;
                    this.coordinates[ editCoord.currentIndex ] = coordData;
                    
                    $("#coord_" + editCoord.currentIndex).text( coordData.hdms );
                    
                    editCoord.close(); 
                },
                
                cancelUpdateCoords : function() {
                    var editCoord = Ext.getCmp('editCoord');
                    editCoord.close();    
                },
        
                convertDMSToDD : function(degrees, minutes, seconds, millis, direction) {
                    var MM = Number(minutes) / 60;
                    var SS = Number(seconds + '.' + millis)  / (60*60);
                    var MS = Number(millis);
                    var dd = Number(degrees) +  MM  + SS  ;
                    
                    if (direction === "S" || direction === "W") {
                        dd = dd * -1;
                    } 
                    return dd;
                },                
                
                pointerMoveHandler : function(evt) {
                    var me = Sisclaten.DrawHelper;
                    var found = false;
                    Sisclaten.MapHelper.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                        var layerName = feature.get('layerName');
                        if ( layerName === 'view_projetos_areas_sobrevoo' ) {
                            var gid = feature.get('gid');
                            var nome = feature.get('nome');
                            var areaSobrevooId = Ext.getCmp('areaSobrevooId');
                            if ( areaSobrevooId ) {
                                areaSobrevooId.setValue( gid );
                            }
                            me.asData.id = nome;
                            found = true;
                            me.areaSobrevooFeature = feature;
                        } 
                    });
                    
                    /*
                    if ( found === true) {
                        me.vertexPosition = 'IN';
                    } else {
                        me.vertexPosition = 'OUT';
                    }
                    */
                }

		
	}

});