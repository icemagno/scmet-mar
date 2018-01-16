Ext.define('MCLM.Functions', {

	statics: {
		countLog : 0,
		coberturaImages00Hmg : [],
		coberturaImages12Hmg : [],
		ams4Kirrf : [],
		coberturaIndex : 0,
		sateliteIndex : 0,
		coberturaTimer : null,
		sateliteTimer : null,
		horario : '00HMG',
		coberturaTitle : 'Cobertura de Nuvens',
		
		sateliteAnimate : function() {
			var	sateliteWindow = Ext.getCmp('sateliteWindow');
			if ( !sateliteWindow ) {
				clearInterval( MCLM.Functions.sateliteTimer );
				return true;
			}
			
			var img = "<img style='width:50%;height:222px;float:left' src='" + MCLM.Functions.ams4Kirrf[MCLM.Functions.sateliteIndex].src + "'>";
			var img2 = "<img style='width:50%;height:222px;float:left' src='" + MCLM.Functions.ams4Kirrf[MCLM.Functions.sateliteIndex].src2 + "'>";
			var img3 = "<img style='width:50%;height:222px;float:left' src='" + MCLM.Functions.ams4Kirrf[MCLM.Functions.sateliteIndex].src3 + "'>";
			var img4 = "<img style='width:50%;height:222px;float:left' src='" + MCLM.Functions.ams4Kirrf[MCLM.Functions.sateliteIndex].src4 + "'>";
			
			var div = "<div style='width:100%;height:222px'>" + img + img2 + "</div><div style='width:100%;height:222px'>" + img3 + img4 + "</div>";
			sateliteWindow.update( div );
			
			MCLM.Functions.sateliteIndex++;
			if ( MCLM.Functions.sateliteIndex >= MCLM.Functions.ams4Kirrf.length ) {
				MCLM.Functions.sateliteIndex = 0;
			}			
			
		},
		
		coberturaAnimate : function() {
			var	sliderWindow = Ext.getCmp('sliderWindow');
			if ( !sliderWindow ) {
				clearInterval( MCLM.Functions.coberturaTimer );
				return true;
			}
			
			var who = MCLM.Functions.coberturaImages00Hmg;
			if ( MCLM.Functions.horario === '12HMG' ) {
				who = MCLM.Functions.coberturaImages12Hmg;
			}
			
			var img = "<div style='background-color:#ffffff;padding:10px;width:100%;height:30px' id='modeloTitle'>"+MCLM.Functions.coberturaTitle+
				" : Inic. "+MCLM.Functions.horario+"</div><img style='width:100%;height:420px' src='" + who[MCLM.Functions.coberturaIndex] + "'>";
			sliderWindow.update( img );
			MCLM.Functions.coberturaIndex++;
			if ( MCLM.Functions.coberturaIndex >= MCLM.Functions.coberturaImages00Hmg.length ) {
				MCLM.Functions.coberturaIndex = 0;
			}
		},

		loadCoberturaImages : function() {
			function pad(num, size) {
			    var s = "000" + num;
			    return s.substr(s.length-size);
			}			
			var index = 0;
			for ( x=0; x < 99; x=x+3) {
				var fileImage = pad(x,3);
				var fileName00H = 'https://www.mar.mil.br/dhn/chm/meteo/prev/modelos/figuras/metarea_v/00hmg/nebulos_total_'+fileImage+'.gif';
				var fileName12H = 'https://www.mar.mil.br/dhn/chm/meteo/prev/modelos/figuras/metarea_v/12hmg/nebulos_total_'+fileImage+'.gif';
				MCLM.Functions.coberturaImages00Hmg.push( fileName00H );
				MCLM.Functions.coberturaImages12Hmg.push( fileName12H );
			}
		},
		
		loadSateliteImages : function() {
			for ( x=1; x<21; x++) {
				// goesr_ret_ch07_grey_
				// goesr_ret_ch07_ircol1_
				// goesr_ret_ch08_grey_
				// goesr_ret_ch09_grey_
				// goesr_ret_ch09_wvcol1_
				// goesr_ret_ch09_wvcol2_
				
				var layer = 'goesr_ret_ch07_ircol1_' + x;
				var layer2 = 'goesr_ret_ch09_wvcol1_' + x;
				var layer3 = 'goesr_ret_ch07_grey_' + x;
				var layer4 = 'goesr_ret_ch09_grey_' + x;
				
				var src = "https://geosite.climatempo.com.br/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers="+layer+"&styles=&bbox=-9304526.579097936,-4079902.8217495675,-3072157.0408378043,812066.9885017126&width=636&height=477&srs=EPSG:3857&format=image/jpeg&transparent=true";
				var src2 = "https://geosite.climatempo.com.br/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers="+layer2+"&styles=&bbox=-9304526.579097936,-4079902.8217495675,-3072157.0408378043,812066.9885017126&width=636&height=477&srs=EPSG:3857&format=image/jpeg&transparent=true";
				var src3 = "https://geosite.climatempo.com.br/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers="+layer2+"&styles=&bbox=-9304526.579097936,-4079902.8217495675,-3072157.0408378043,812066.9885017126&width=636&height=477&srs=EPSG:3857&format=image/jpeg&transparent=true";
				var src4 = "https://geosite.climatempo.com.br/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers="+layer2+"&styles=&bbox=-9304526.579097936,-4079902.8217495675,-3072157.0408378043,812066.9885017126&width=636&height=477&srs=EPSG:3857&format=image/jpeg&transparent=true";
				var srcData = {};
				srcData.src = src;
				srcData.src2 = src2;
				srcData.src3 = src3;
				srcData.src4 = src4;
				
				MCLM.Functions.ams4Kirrf.push( srcData );
			}
		},
		
		getClimaDesc : function( value ) {
			var climaDesc = [];
			climaDesc["ec"] = "Encoberto com Chuvas Isoladas";
				climaDesc["ci"] = "Chuvas Isoladas";
				climaDesc["c"] = "Chuva";
				climaDesc["in"] = "Instável";
				climaDesc["pp"] = "Poss. de Pancadas de Chuva";
				climaDesc["cm"] = "Chuva pela Manhã";
				climaDesc["cn"] = "Chuva a Noite";
				climaDesc["pt"] = "Pancadas de Chuva a Tarde";
				climaDesc["pm"] = "Pancadas de Chuva pela Manhã";
				climaDesc["np"] = "Nublado e Pancadas de Chuva";
				climaDesc["pc"] = "Pancadas de Chuva";
				climaDesc["pn"] = "Parcialmente Nublado";
				climaDesc["cv"] = "Chuvisco";
				climaDesc["ch"] = "Chuvoso";
				climaDesc["t"] = "Tempestade";
				climaDesc["ps"] = "Predomínio de Sol";
				climaDesc["e"] = "Encoberto";
				climaDesc["n"] = "Nublado";
				climaDesc["cl"] = "Céu Claro";
				climaDesc["nv"] = "Nevoeiro";
				climaDesc["g"] = "Geada";
				climaDesc["ne"] = "Neve";
				climaDesc["nd"] = "Não Definido";
				climaDesc["pnt"] = "Pancadas de Chuva a Noite";
				climaDesc["psc"] = "Possibilidade de Chuva";
				climaDesc["pcm"] = "Possibilidade de Chuva pela Manhã";
				climaDesc["pct"] = "Possibilidade de Chuva a Tarde";
				climaDesc["pcn"] = "Possibilidade de Chuva a Noite";
				climaDesc["npt"] = "Nublado com Pancadas a Tarde";
				climaDesc["npn"] = "Nublado com Pancadas a Noite";
				climaDesc["ncn"] = "Nublado com Poss. de Chuva a Noite";
				climaDesc["nct"] = "Nublado com Poss. de Chuva a Tarde";
				climaDesc["ncm"] = "Nubl. c/ Poss. de Chuva pela Manhã";
				climaDesc["npm"] = "Nublado com Pancadas pela Manhã";
				climaDesc["npp"] = "Nublado com Possibilidade de Chuva";
				climaDesc["vn"] = "Variação de Nebulosidade";
				climaDesc["ct"] = "Chuva a Tarde";
				climaDesc["ppn"] = "Poss. de Panc. de Chuva a Noite";
				climaDesc["ppt"] = "Poss. de Panc. de Chuva a Tarde";
				climaDesc["ppm"] = "Poss. de Panc. de Chuva pela Manhã";	
			
				return climaDesc[ value ];
			
			
		},

		shortGuid : function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			return "f" + s4() + s4();
		},		

		hexToRgbA : function(hex, transp){
			var c;
			if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
				c= hex.substring(1).split('');
				if(c.length== 3){
					c= [c[0], c[0], c[1], c[1], c[2], c[2]];
				}
				c= '0x'+c.join('');
				return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+transp+')';
			}
			throw new Error('Bad Hex');
		},			

		guid : function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
		},

		hideMainLog : function () {
			$('#mainLogDisplayContainer').css('display','none');
			$('#mainLogDisplayTable tbody').empty();
		},

		mainLog : function ( message ) {
			$('#mainLogDisplayContainer').fadeIn(2000);
			this.countLog++;
			if ( this.countLog == 5 ) {
				this.countLog--;
				$('#mainLogDisplayTable tr:first').remove();
			}
			$("<tr><td>" + message + "</td></tr>").appendTo('#mainLogDisplayTable tbody').hide().fadeIn(2000);
		},

		exibeClima : function( data, record ) {
			var objRecord = Ext.decode( record.mclm_metadata_property );
			var features = new ol.format.GeoJSON().readFeatures( objRecord , {
				//featureProjection: 'EPSG:3857'
			});			
			
			var theFeature = features[0];
		    var aa = theFeature.getGeometry().getExtent();
		    var center = ol.extent.getCenter(aa);			
			
	    	var center2 = center;//ol.proj.transform( center , 'EPSG:3857', 'EPSG:4326');
	    	lon = center2[0];
	    	lat = center2[1];
	    	
	    	MCLM.Map.getWeatherFromLocation( lat, lon );
		},

		showMainLoadingIcon : function( action ) {
			$("#mainLoadingIcon").css('display','block');
			$("#mainLoadingInfo").text( action );
			$('#mainLoadingIcon').hide().show(0);
		},

		hideMainLoadingIcon : function() {
			$("#mainLoadingInfo").text( "" );
			$("#mainLoadingIcon").css('display','none');			
		},

		inicializaDicas : function() {
			Ext.tip.QuickTipManager.init();

			Ext.tip.QuickTipManager.register(/*{
						target: 'id111',
						title: 'Configurações',
						text: 'Configura aspectos gerais do sistema.',
						width: 150,
						dismissDelay: 5000 
					},*/{
						target: 'id115',
						title: 'Grade Auxiliar',
						text: 'Exibe a grade auxiliar do mapa.',
						width: 150,
						dismissDelay: 5000 
					},{
						target: 'id117',
						title: 'Interrogar Camadas',
						text: 'Interroga as camadas ativas no mapa em determinada posição.',
						width: 150,
						dismissDelay: 5000 
					},{
						target: 'drawFeicaoBtn',
						title: 'Inserir Aviso',
						text: 'Cria um novo Aviso de Mau Tempo.',
						width: 150,
						dismissDelay: 5000 
					},{
						target: 'zoomMinimum',
						title: 'Zoom para todo o mapa',
						text: 'Exibe todo o mapa na tela.',
						width: 150,
						dismissDelay: 5000 
					}, {
						target: 'zoomDefault',
						title: 'Zoom inicial',
						text: 'Retorna para o zoom inicial da configuração.',
						width: 150,
						dismissDelay: 5000 
					},{
		    	        target: 'showForecastToolBarID',
		    	        title: 'Serviços Meteorológicos',
		    	        text: 'Ferramentas de Serviços Meteorológicos.',
		    	        width: 180,
		    	        dismissDelay: 5000 
		    	    },{
		    	        target: 'zoomUndo',
		    	        title: 'Voltar Zoom Anterior',
		    	        text: 'Retorna a posição e zoom anterior do mapa.',
		    	        width: 180,
		    	        dismissDelay: 5000 
		    	    },{
		    	    	target: 'measureToolID',
		    	    	title: 'Ferramentas de Medição',
		    	    	text: 'Exibe a barra de ferramentas de medição.',
		    	    	width: 180,
		    	    	dismissDelay: 5000 
		    	    },{
		    	        target: 'magnifyID',
		    	        title: 'Liga / Desliga Lupa',
		    	        text: 'Amplia a camada de base sobre qualquer camada ativa. A camada de base precisa estar ativada.',
		    	        width: 180,
		    	        dismissDelay: 5000 
		    	    },{
		    	        target: 'coberturaID',
		    	        title: 'Cobertura de Nuvens',
		    	        text: 'Exibe animação de cobertura de nuvens da CHN.',
		    	        width: 180,
		    	        dismissDelay: 5000 
		    	    },{
		    	        target: 'inmetGoesID',
		    	        title: 'Animação INPE GOES',
		    	        text: 'Exibe animação de satélite GOES do INPE.',
		    	        width: 180,
		    	        dismissDelay: 5000 
		    	    },{
		    	        target: 'sateliteID',
		    	        title: 'Animação de Satélite',
		    	        text: 'Exibe animação de satélite. Origem: Climatempo.',
		    	        width: 180,
		    	        dismissDelay: 5000 
		    	    }); 	
		},

		latLonToUTM : function(lon, lat) {
			var latitude,longitude,utmZone,utmEast,utmNorth,defaultUtm ,letra;

			var arrayUTM = [
			                {
			                	nome : 'Airy',
			                	raioEquatorial : 6377563,
			                	eccQuadrado : 0.00667054,
			                	latitudeMax : 60,
			                	latitudeMin : 51,
			                	longitudeMax : 2,
			                	longitudeMin : -6
			                },
			                {
			                	nome : 'Australian National',
			                	raioEquatorial : 6378160,
			                	eccQuadrado : 0.006694542,
			                	latitudeMax : -12,
			                	latitudeMin : -48,
			                	longitudeMax : 156,
			                	longitudeMin : 108
			                },
			                {
			                	nome : 'Bessel 1841l',
			                	raioEquatorial : 6377397,
			                	eccQuadrado : 0.006674372,
			                	latitudeMax : 160,
			                	latitudeMin : 120,
			                	longitudeMax : 45,
			                	longitudeMin : 30
			                },
			                {
			                	nome : 'Bessel 1841 (Nambia)',
			                	raioEquatorial : 6377484,
			                	eccQuadrado : 0.006674372,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Clarke 1866',
			                	raioEquatorial : 6378206,
			                	eccQuadrado : 0.006768658,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Clarke 1880',
			                	raioEquatorial : 6378249,
			                	eccQuadrado : 0.006803511,
			                	latitudeMax : 35,
			                	latitudeMin : -35,
			                	longitudeMax : 40,
			                	longitudeMin : -20
			                },
			                {
			                	nome : 'Everest',
			                	raioEquatorial : 6377276 ,
			                	eccQuadrado : 0.006637847,
			                	latitudeMax : 30,
			                	latitudeMin : -12,
			                	longitudeMax : 140,
			                	longitudeMin : 70
			                },
			                {
			                	nome : 'Fischer 1960 (Mercury)',
			                	raioEquatorial : 6378166,
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Fischer 1968',
			                	raioEquatorial : 6378150,
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'GRS 1967',
			                	raioEquatorial : 6378160,
			                	eccQuadrado : 0.006694605,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'GRS 1980',
			                	raioEquatorial : 6378137,
			                	eccQuadrado : 0.00669438,
			                	latitudeMax : 80,
			                	latitudeMin : 15,
			                	longitudeMax : -60,
			                	longitudeMin : -170
			                },
			                {
			                	nome : 'Helmert 1906',
			                	raioEquatorial : 6378200,
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Hough',
			                	raioEquatorial : 6378270, 
			                	eccQuadrado : 0.00672267,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'International',
			                	raioEquatorial : 6378388,
			                	eccQuadrado : 0.00672267,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Krassovsky',
			                	raioEquatorial : 6378245,
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : 80,
			                	latitudeMin : 45,
			                	longitudeMax : 180,
			                	longitudeMin : 30
			                },
			                {
			                	nome : 'Modified Airy',
			                	raioEquatorial : 6377340,
			                	eccQuadrado : 0.00667054,
			                	latitudeMax : 55,
			                	latitudeMin : 51,
			                	longitudeMax : 11,
			                	longitudeMin : 6
			                },
			                {
			                	nome : 'Modified Everest',
			                	raioEquatorial : 6377304,
			                	eccQuadrado : 0.006637847,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'Modified Fischer 1960',
			                	raioEquatorial : 6378155, 
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'South American 1969',
			                	raioEquatorial : 6378160, 
			                	eccQuadrado : 0.006694542,
			                	latitudeMax : 15,
			                	latitudeMin : -60,
			                	longitudeMax : -20,
			                	longitudeMin : -80
			                },
			                {
			                	nome : 'WGS 60',
			                	raioEquatorial : 6378165, 
			                	eccQuadrado : 0.006693422,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'WGS 66',
			                	raioEquatorial : 6378145, 
			                	eccQuadrado : 0.006694542,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'WGS-72',
			                	raioEquatorial : 6378135, 
			                	eccQuadrado : 0.006694318,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                },
			                {
			                	nome : 'WGS-84',
			                	raioEquatorial : 6378137, 
			                	eccQuadrado : 0.00669438,
			                	latitudeMax : null,
			                	latitudeMin : null,
			                	longitudeMax : null,
			                	longitudeMin : null
			                }
			                ];

			var position = function(latitude, longitude) {
				setLatitude(latitude);
				setLongitude(longitude);
				setDefault();
			};

			var setDefault = function() {
				defaultUtm = 22; // wgs 84
			};

			var setLatitude = function(lat) {
				var tmpLat = lat;
				latitude = tmpLat;
			};

			var setLongitude = function(lon) {
				//var tmplon = (long/360000);
				var tmplon = lon;
				longitude = tmplon;
			};

			var getUtmLetter = function(lat) {
				// Esta rotina determina a designação de letra correta para UTM, para uma dada latitude
				// retorna 'Z' se a latitude estiver fora dos limites da UTM de 84N a 80S
				// Original de Chuck Gantz- chuck.gantz@globalstar.com
				//$Lat = (Lat/360000);
				if((84 >= lat) && (lat >= 72))  letra = 'X';
				else if ((72 > lat) && (lat >= 64))   letra = 'W';
				else if ((64 > lat) && (lat >= 56))   letra = 'V';
				else if ((56 > lat) && (lat >= 48))   letra = 'U';
				else if ((48 > lat) && (lat >= 40))   letra = 'T';
				else if ((40 > lat) && (lat >= 32))   letra = 'S';
				else if ((32 > lat) && (lat >= 24))   letra = 'R';
				else if ((24 > lat) && (lat >= 16))   letra = 'Q';
				else if ((16 > lat) && (lat >= 8))    letra = 'P';
				else if (( 8 > lat) && (lat >= 0))    letra = 'N';
				else if (( 0 > lat) && (lat >= -8))   letra = 'M';
				else if ((-8> lat) && (lat >= -16))   letra = 'L';
				else if ((-16 > lat) && (lat >= -24)) letra = 'K';
				else if ((-24 > lat) && (lat >= -32)) letra = 'J';
				else if ((-32 > lat) && (lat >= -40)) letra = 'H';
				else if ((-40 > lat) && (lat >= -48)) letra = 'G';
				else if ((-48 > lat) && (lat >= -56)) letra = 'F';
				else if ((-56 > lat) && (lat >= -64)) letra = 'E';
				else if ((-64 > lat) && (lat >= -72)) letra = 'D';
				else if ((-72 > lat) && (lat >= -80)) letra = 'C';
				else letra = 'Z'; // flag de erro para mostrar
				// que a Latitude está fora dos limites UTM
			};

			var generateUTM = function() {
				var elipsoideRef = defaultUtm;
				var deg2rad = 3.14159265359 / 180.0;

				var a = arrayUTM[elipsoideRef].raioEquatorial;
				var eccSquared = arrayUTM[elipsoideRef].eccQuadrado;
				var k0 = 0.9996;

				var LongTmp1 = Math.floor(((longitude+180)/360));
				var LongTemp =  (longitude+180)-(LongTmp1*360)-180;

				var LatRad = latitude*deg2rad;
				var LongRad = longitude*deg2rad;

				var ZoneNumber = Math.floor(((LongTemp + 180)/6)) + 1;

				if(latitude >= 56.0 && latitude < 64.0 && LongTemp >= 3.0 && LongTemp < 12.0 ) {
					ZoneNumber = 32;
				}

				// zonas especiais para Svalbard
				if(latitude >= 72.0 && latitude < 84.0 ) {
					if(LongTemp >= 0.0  && LongTemp <  9.0 ) {
						ZoneNumber = 31;
					} 
					else if(LongTemp >= 9.0  && LongTemp < 21.0 ) {
						ZoneNumber = 33;
					}
					else if(LongTemp >= 21.0 && LongTemp < 33.0 ) {
						ZoneNumber = 35;
					}
					else if(LongTemp >= 33.0 && LongTemp < 42.0 ) {
						ZoneNumber = 37;
					} 
				}

				var LongOrigin = (ZoneNumber - 1)*6 - 180 + 3;  //+3 coloca a origem no meio da zona 
				var LongOriginRad = LongOrigin * deg2rad;

				getUtmLetter(latitude);
				utmZone = ZoneNumber;

				var eccPrimeSquared = (eccSquared) / (1-eccSquared);

				var N = a/Math.sqrt(1-eccSquared*Math.sin(LatRad)*Math.sin(LatRad));
				var T = Math.tan(LatRad)*Math.tan(LatRad);
				var C = eccPrimeSquared*Math.cos(LatRad)*Math.cos(LatRad);
				var A = Math.cos(LatRad)*(LongRad-LongOriginRad);

				var M = (a * 
						( 
								( 
										(1 - eccSquared/4) - 
										(3*eccSquared*eccSquared/64) - 
										(5 * eccSquared*eccSquared*eccSquared/256) 
								)* LatRad - 
								( 
										(3 * eccSquared/8) + 
										(3*eccSquared*eccSquared/32) + 
										(45 * eccSquared * eccSquared * eccSquared/1024)
								)* Math.sin(2*LatRad) + 
								(
										(15*eccSquared*eccSquared/256) + 
										(45*eccSquared*eccSquared*eccSquared/1024)
								)*Math.sin(4*LatRad) - 
								(
										(35*eccSquared*eccSquared*eccSquared/3072)
								)*Math.sin(6*LatRad)
						));

				utmEast = (k0*N*(A+(1-T+C)*A*A*A/6 + (5-18*T+T*T+72*C-58*eccPrimeSquared)*A*A*A*A*A/120) + 500000.0 );
				utmNorth = (k0*(M+N*Math.tan(LatRad)*(A*A/2+(5-T+9*C+4*C*C)*A*A*A*A/24 + ( 61-58*T+T*T+600*C-330*eccPrimeSquared)*A*A*A*A*A*A/720))); 
				utmNorth = Math.round(utmNorth);
				utmEast = Math.round(utmEast);

				if(latitude < 0) utmNorth += 10000000.0;
			};

			position(lat,lon);
			generateUTM();

			if(utmZone &&  letra && utmNorth && utmEast) {
				return utmZone + '' + letra + ' ' + utmNorth + ' ' + utmEast;
			}

			return '';
		},	

	}

});
