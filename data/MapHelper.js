Ext.define('Sisclaten.MapHelper', {

    statics: {
        iconSize : 24,
        map: null,
        theView : null,
        styleCache : [],
        querying : false,
        
        getVectorImage : function (src, size) {
            var canvas = document.createElement('canvas');
            canvas.setAttribute("width", size);
            canvas.setAttribute("height", size);
            var ctx = canvas.getContext("2d");
            var img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0, size, size);
            };
            img.src = src;
            return canvas;
        },        
        
        
        stilyzeFeature : function ( feature ) {
            var me = Sisclaten.MapHelper;
            var featureGeomType = feature.getGeometry().getType();
            //var properties = feature.getProperties();
            var layerName = feature.get('layerName');
            var theStyle = null;

            // Eh um ponto
            if ( featureGeomType == 'Point' )  {
                // Se for um ponto desconhecido usar este estilo.
                var pointStyle = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({
                            color: 'red'
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'green',
                            width: 1
                        }),
                        text : new ol.style.Text({
                            font: '12px Verdana',
                            text: '',
                            fill: new ol.style.Fill( {color: 'black'} ),
                            stroke: new ol.style.Stroke({color: 'white', width: 0.5})
                        })                    
                    })
                });    
                
                
                // Eh uma Base de Operacao
                if ( layerName === 'view_projetos_bases_operacao' ) {
                    var nome_tipo_base = feature.get('nome_tipo_base');
                    var imgName = 'base_ope_outro.png';
                    switch( nome_tipo_base ) {
                        case 'AERODROMO':
                            imgName = 'base_ope_aerodromo.png';
                            break;
                        case 'HELIPONTO':
                            imgName = 'base_ope_heliporto.png';
                            break;
                        case 'VANT':
                            imgName = 'base_ope_vant.png';
                            break;
                        case 'OUTRO':
                            imgName = 'base_ope_outro.png';
                    }                    
                    var imgSrc = 'resources/imgstyles/' + imgName;
                    

                    var cacheKey = layerName + nome_tipo_base;
                    var pointStyle = me.styleCache[ cacheKey ];
                    
                    if( !pointStyle ) {
                        // Cria um novo estilo para esta feature
                        var img = me.getVectorImage(imgSrc, me.iconSize);
                        var imageIcon = new ol.style.Icon({
                            img : img,
                            anchor: [0.5, 0.5],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',                        
                            imgSize : [me.iconSize, me.iconSize]
                        });
                        pointStyle = new ol.style.Style({
                            image: imageIcon
                        });
                        me.styleCache[ cacheKey ] = pointStyle;
                    } else {
                        // Usando estilo do cache
                    } 
                    
                }
                
                theStyle = pointStyle;
            }    
            
            
            
            if ( (featureGeomType === 'Polygon') || (featureGeomType === 'MultiPolygon') )  {
                
                if ( layerName === 'view_projetos_municipios_uf' ) {
                    theStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(112, 128, 144, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#708090',
                                width: 1
                        })
                    });  
                };

                if ( layerName === 'view_projetos_areas_intersecao_imageadas_sigilosas' ) {
                    theStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(255, 64, 0, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#ff4000',
                                //lineDash: [10, 10],
                                width: 1
                        })
                    });  
                };  

                if ( layerName === 'view_projetos_areas_intersecao_municipios_uf' ) {
                    theStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(0, 0, 77, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#00004d',
                                //lineDash: [10, 10],
                                width: 1
                        })
                    });  
                }                
                
                if ( layerName === 'view_projetos_areas_imageadas' ) {
                    theStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(46, 184, 46, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#2eb82e',
                                //lineDash: [10, 10],
                                width: 1
                        })
                    });  
                }                
                
                if ( layerName === 'view_projetos_areas_imageadas_sigilosas' ) {
                    theStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(255, 64, 0, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#ff4000',
                                //lineDash: [10, 10],
                                width: 1
                        })
                    });  
                }                   

                if ( layerName === 'view_projetos_areas_sobrevoo_eac' ) {
                    theStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(255, 64, 0, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#ff4000',
                                //lineDash: [10, 10],
                                width: 1
                        })
                    });  
                }  

                if ( layerName === 'view_projetos_areas_intersecao_sobrevoo_eac' ) {
                    theStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(255, 64, 0, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#ff4000',
                                //lineDash: [10, 10],
                                width: 1
                        })
                    });  
                }  

                if ( layerName === 'view_projetos_areas_sobrevoo' ) {
                    theStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                                color: 'rgba(255, 64, 0, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                                color: '#ff4000',
                                //lineDash: [10, 10],
                                width: 1
                        })
                    });  
                }                    
                
                
            }
            
            $('#loadingIcon').css('display','none');
            return  theStyle;
        },
        
        styleFunction : function( feature, resolution ) {
            var me = Sisclaten.MapHelper;
            var resultStyles = [];
            
            var featureStyle = me.stilyzeFeature( feature );
            if ( featureStyle !== null ) resultStyles.push( featureStyle );					
     
            return resultStyles;
            
        },
        
        showDetail : function( position, featuresToQuery ) {
            
            if ( Sisclaten.DrawHelper.drawing === true ) {
                return true;
            }
            
            var me = Sisclaten.MapHelper;
            var boxDiv = '';
            var popupContent = '';
            
            if ( featuresToQuery.length === 0 ) return true;
            
            featuresToQuery.forEach( 
                function( queryPack, index ) {
                    var properties = queryPack.feature.getProperties();
                    var layerName = properties.layerName;

                    console.log('------------  QUERY LAYER ----------------')
                    console.log( layerName );  
                    console.log( properties );
                    console.log('------------------------------------------')

                    if ( layerName === 'view_projetos_areas_intersecao_imageadas_sigilosas' ) {
                        popupContent = popupContent + '<div class="subTitle">Interseção Imageadas x Sigilosas</div><div class="subContent">' +
                        'Área a ser imageada: ' + properties.nome_area_imageada + '<br>' + 
                        'Área de Sobrevoo: ' + properties.nome_area_sobrevoo + '<br>' +
                        'Município da Área Sigilosa: ' + properties.municipio_area_sigilosa + '<br>' +
                        'Força da Área Sigilosa: ' + properties.forca_armada_area_sigilosa + '<br>' +
                        'End. da Área Sigilosa: ' + properties.endereco_area_sigilosa + '<br>' +
                        '</div>';
                    }

                    if ( layerName === 'view_projetos_areas_intersecao_municipios_uf' ) {
                        popupContent = popupContent + '<div class="subTitle">Interseção Imageadas x Municipios</div><div class="subContent">' +
                        'Área a ser imageada: ' + properties.nome_area_imageada + '<br>' +
                        'Município: ' + properties.nm_municip + ' (' + properties.sigla_uf + ')</div>'; 
                    }

                    if ( layerName === 'view_projetos_areas_imageadas' ) {
                        popupContent = popupContent + '<div class="subTitle">Área a ser imageada</div><div class="subContent">' +
                        'Nome: ' + properties.nome + '<br>' + 
                        'Descrição: ' + properties.descricao + '<br>' + 
                        'Altitude: ' + properties.altitude + ' ' + properties.unidade_altitude+ '<br>' + 
                        'Escala: ' + properties.escala +  '</div>';
                    }


                    if ( layerName === 'view_projetos_areas_imageadas_sigilosas' ) {
                        /*
                        popupContent = popupContent + '<div class="subTitle">Interseção Imageadas x Sigilosas</div><div class="subContent">' +
                        'Área a ser imageada: ' + properties.nome_area_imageada + '<br>' + 
                        'End. Área Sigilosa: ' + properties.endereco_area_sigilosa + '<br>' + 
                        'Área de Sobrevoo: ' + properties.nome_area_sobrevoo + '</div>';
                        */
                    }
                    
                    if ( layerName === 'view_projetos_areas_sobrevoo' ) {
                        popupContent = popupContent + '<div class="subTitle">Área de Sobrevoo</div><div class="subContent">' +
                        'Nome: ' + properties.nome + '<br>' + 
                        'Descrição: ' + properties.descricao + '<br>' + 
                        'Altitude: ' + properties.altitude + ' ' + properties.unidade_altitude+ '<br>' + 
                        'Altura: ' + properties.altura + ' ' + properties.unidade_altura+ '<br>' + 
                        'Escala: ' + properties.escala + '</div>';
                    }

                    if ( layerName === 'view_projetos_bases_operacao' ) {
                        popupContent = popupContent + '<div class="subTitle">Base de Operação</div><div class="subContent">' +
                        'Sigla: ' + properties.sigla + '<br>' + 
                        'Tipo: ' + properties.nome_tipo_base + '<br>' + properties.nome + '</div>';
                    }


                    if ( layerName === 'view_projetos_municipios_uf' ) {
                        popupContent = popupContent + '<div class="subTitle">Município</div><div class="subContent">' +
                        'Nome/Sigla: ' + properties.nm_municip + ' (' + properties.sigla_uf + ')</div>';
                    }

                    /*
                    popupContent = popupContent + 'Projeto (Empresa): ' + properties.nr_projeto_empresa + '<br>' + 
                                'Projeto (MD): ' + properties.nr_projeto_md;
                    */

                }
            );
    
            boxDiv = '<div class="popupText">' + 
            '<div class="popupContent">'+popupContent+'</div></div>';
    
            var detalheAreaWindow = Ext.getCmp('detalheAreaWindow');
            if ( !detalheAreaWindow ) {
                detalheAreaWindow = Ext.create('Sisclaten.view.projeto.DetalheAreaWindow');
            }
            detalheAreaWindow.update(boxDiv);
            detalheAreaWindow.show();
            
        },

        hideDetail: function () {
            //
        },

        removeLayerByName : function( layerName ) {
            var me = Sisclaten.MapHelper;
            me.map.getLayers().forEach(function (layer) {
                if (layer.get("name") === layerName) {
                    me.map.removeLayer(layer);
                    return true;
                }
            });
        },
        
        addProjetoLayer : function( projectId , layerName ) {
            
            $('#loadingIcon').css('display','block'); 
            var serviceUrl = Sisclaten.config.Path.getServer() + '/aerolevantamento/layers/' + projectId + '/' + layerName; 
            Ext.Ajax.request({
                url: serviceUrl,
                method: 'get',
                success: function (response, opts) {
                    var featuresObj = Ext.decode(response.responseText);

                    var vectorSource = new ol.source.Vector();

                    if( featuresObj.features === null ) {
                        $('#loadingIcon').css('display','none');
                        return true;
                    }

                    vectorSource.on('change', function(e) {
                        //
                    });

                    var features = new ol.format.GeoJSON().readFeatures(featuresObj, {
                        featureProjection: 'EPSG:4326'
                    });

                    for ( var i = 0; i < features.length; i++ ) {
                        features[i].set('layerName',layerName);
                        vectorSource.addFeature( features[i] );
                    }          

                    var vectorLayer = new ol.layer.Vector({
                        source: vectorSource,
                        style: Sisclaten.MapHelper.styleFunction
                    });
                    vectorLayer.set('name', layerName);

                    Sisclaten.MapHelper.theView.fit(vectorSource.getExtent(), {duration: 1500, maxZoom: 12});
                    Sisclaten.MapHelper.removeLayerByName(layerName);
                    Sisclaten.MapHelper.addLayer(vectorLayer);
                    
                },
                failure: function(conn, response, options, eOpts) {
                    //
                }
            });
            
        },

        addLayer : function( layer ) {
            var me = Sisclaten.MapHelper;
            me.map.addLayer(layer);
            
        },

        initMap: function () {
            
            var me = Sisclaten.MapHelper;
            var center = [-54.755859375, -14.765625];

            me.theView = new ol.View({
                center: center,
                zoom: 4,
                minZoom: 4,
                projection: 'EPSG:4326'
            });

            var geoserverUrl = Sisclaten.config.Path.getGeoserverOsmServer();
            var baseLayerName = Sisclaten.config.Path.getGeoserverOsmBaseLayer();

            var landSource = new ol.source.TileWMS({
                url: geoserverUrl,
                params: {
                    tiled: true,
                    'LAYERS': baseLayerName,
                    'FORMAT': 'image/png8'
                },
                projection: ol.proj.get('EPSG:4326')
            });

            var landLayer = new ol.layer.Tile({
                source: landSource
            });
            
            me.map = new ol.Map({
                target: 'projetoMap',
                layers: [landLayer],
                view: me.theView
            });

            me.map.on('click', function(event) {
                
                if ( !me.querying ) return true;
                
                var featuresToQuery = [];
                
                me.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                    var queryPack = {};
                    queryPack.feature = feature;
                    queryPack.layer = layer;
                    featuresToQuery.push( queryPack );
                });
                
                me.showDetail( event.coordinate, featuresToQuery );
                
            });
            
            me.map.on('pointermove', function(evt) {
                if (evt.dragging) {
                    return;
                }
                var feature = me.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                    return feature;
                });
                me.map.getTargetElement().style.cursor = feature ? 'pointer' : '';
            });

        },

        addCamadaApoio: function (layerName) {
            var geoserverUrl = Sisclaten.config.Path.getGeoserverServer();

            var newLayer = new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: geoserverUrl,
                    params: {
                        tiled: true,
                        'layers': layerName,
                        'VERSION': '1.1.1',
                        'FORMAT': 'image/png8'
                    },
                    projection: ol.proj.get('EPSG:4326')
                })
            });
            newLayer.set('name', layerName);
            Sisclaten.MapHelper.map.addLayer(newLayer);
        },

        panTo: function (center, zoom) {
            var me = Sisclaten.MapHelper;
            var coord = center.split(",");
            var lon = Number(coord[0].trim());
            var lat = Number(coord[1].trim());
            var coordinate = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');

            me.theView.animate({
                zoom: zoom,
                center: coordinate,
                duration: 2000
            });

        }

    }

});