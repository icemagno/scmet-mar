Ext.define('MCLM.DrawHelper', {
	
	statics: {
		activeDrawableLayer: null,
		dirty : false,
		vectorSource : null,
		draw : null,
		drawedFeature : null,
		lastCoordinates : 0,
		drawing : false,
		pointermoveEvt : null,
		mapClickEvt : null,
		defaultStyle : null,
		invalidStyle : null,
		modify : null,
		creating : false,
		
		
		finish : function() {
            var me = MCLM.DrawHelper;
            if ( me.draw ) MCLM.Map.map.removeInteraction( me.draw );
            MCLM.Map.removeLayerByName('drawableLayer');
            me.drawedFeature = null;
            me.draw = null;
            me.vectorSource = null;
            me.activeDrawableLayer = null;
            me.drawing = false;
            me.creating = false;
            if ( me.pointermoveEvt ) {
                ol.Observable.unByKey( me.pointermoveEvt );
            };                    
            if ( me.mapClickEvt ) {
                ol.Observable.unByKey( me.mapClickEvt );
            }; 
            
            if ( me.modify ) MCLM.Map.map.removeInteraction( me.modify );
            me.modify = null;
			
		},
		
		init : function() {
            var me = MCLM.DrawHelper;
            
            me.dirty = false;
            me.drawing = true;
            me.creating = true;
            
            me.pointermoveEvt = MCLM.Map.map.on('pointermove', me.pointerMoveHandler);
            me.mapClickEvt = MCLM.Map.map.on('click', me.mapClickHandler);

            me.vectorSource = new ol.source.Vector();

            me.vectorSource.on('addfeature', function( evt ){
                MCLM.Map.map.removeInteraction( me.draw );
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

            MCLM.Map.removeLayerByName('drawableLayer');
            MCLM.Map.map.addLayer( me.activeDrawableLayer );
            
            me.addInteraction();
            
		},
		
		
		addInteraction : function( ) {
            var me = MCLM.DrawHelper;
            if ( me.draw ) MCLM.Map.map.removeInteraction( me.draw );

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
                
                // Coloca em modo de edição logo após terminar de criar
                MCLM.Map.map.removeInteraction( me.draw );
                
                var temp = new ol.Collection( [ me.drawedFeature ] );
                me.modify = new ol.interaction.Modify({features: temp});
                MCLM.Map.map.addInteraction(me.modify);

                
                me.modify.on('modifyend', function( evt ) {
                    var featureDesenhada = evt.features.getArray()[0];
                    // Nada a fazer com a nova geometria por enquanto.
                });
                
                
            });

            MCLM.Map.map.addInteraction( me.draw );
        },		
		
		
        
        pointerMoveHandler : function(evt) {
        	//
        },       
        
        
        mapClickHandler : function( evt ) {
        	//
        },
        
        haveData : function() {
			var geojson  = new ol.format.GeoJSON();
		    var features = MCLM.DrawHelper.vectorSource.getFeatures();
		    return ( features.length > 0 );
        },
        
		getAsJson : function() {
			var geojson  = new ol.format.GeoJSON();
		    var features = MCLM.DrawHelper.vectorSource.getFeatures();
		    var jsonData = geojson.writeFeatures( features, {} );
		    return jsonData;
		}
        
	}

});