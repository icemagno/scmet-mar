
Ext.define('MCLM.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

	
	toggleMagnify : function( button ) {
		MCLM.Map.toggleMagnify();
	},	
	
	toggleMapGrid : function( button ) {
		MCLM.Map.toggleMapGrid();
	},
	
	undoZoom : function() {
		MCLM.Map.undoZoom();
	},
	
    showForecastToolBar : function() {
    	
		var restWeatherWindow = Ext.getCmp('restWeatherWindow');
		if ( !restWeatherWindow ) {
			restWeatherWindow = Ext.create('MCLM.view.tools.RestWeatherWindow');
		}
		restWeatherWindow.show();
		restWeatherWindow.alignTo(Ext.getBody(), "tr-tr", [-90, 70]);
    	
    },
    	
	// --------------------------------------------------------------------------------------------
    showConfig : function ( button ) {
    	var configWindow = Ext.getCmp('configWindow');
    	if ( !configWindow ) {
    		configWindow = Ext.create('MCLM.view.config.ConfigWindow');
    	}
    	configWindow.show();
    	var configForm = Ext.getCmp('configForm');
    	configForm.getForm().setValues( MCLM.Globals.config );    	
    },
	// --------------------------------------------------------------------------------------------
    toggleQueryTool : function () {
    	MCLM.Map.toggleQueryTool();
	},
	// --------------------------------------------------------------------------------------------

	showDrawToolBar : function() {
		MCLM.DrawHelper.init();

		var avisoWindow = Ext.getCmp('avisoWindow');
		if ( !avisoWindow ) {
			avisoWindow = Ext.create('MCLM.view.aviso.AvisoWindow');
		}
		avisoWindow.show();
    },
    
    
    showMeasureTool : function() {
    	var measureWindow = Ext.getCmp('measureWindow');
    	if( !measureWindow ) {
    		measureWindow = Ext.create('MCLM.view.tools.MeasureWindow');
    	}
    	measureWindow.show();
    },

    
});
