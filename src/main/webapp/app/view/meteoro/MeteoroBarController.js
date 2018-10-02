Ext.define('MCLM.view.meteoro.MeteoroBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.meteoroBarController',

    showP3Item : function() {
    	var p3Window = Ext.getCmp('p3Window'); 
		if ( !p3Window ) p3Window = Ext.create('MCLM.view.partetres.P3Window');
		p3Window.show();
		
		var meteoroWindow = Ext.getCmp('meteoroWindow'); 
		if( !meteoroWindow ) {	
			return true;
		}	
		var activeMeteoro = meteoroWindow.activeMeteoro;    	
    	
		var areaTexto = activeMeteoro[ 'aa' ];
		Ext.getCmp('texto').setValue( areaTexto );		
    	
	},
    
    showActiveMeteoro : function() {
		
    	var meteoroBarWindow = Ext.getCmp('meteoroBarWindow'); 
		meteoroBarWindow.close();    	
    	
    	
		MCLM.Functions.showActiveMeteoro();
    	
    	
    },
    

	newMeteoro : function() {
		
	},
	
	
	showMeteoros : function() {
		
	},
	
    
});