Ext.define('MCLM.view.aviso.AvisoWindow', {
	extend: 'Ext.Window',
	
	requires: [
	   'MCLM.view.aviso.AvisoForm',
	   'MCLM.view.aviso.AvisoController'
	],  
	
	controller : 'aviso',
	
	id:'avisoWindow',    	
	xtype: 'avisoWindow',
	title : "Novo Aviso",
	width : 350,
	height: 350,
	
	layout : 'fit',
	constrain: true,
	renderTo: Ext.getBody(),
    items : [{
        xtype: 'avisoForm',
    }],
    
    
    listeners: {
    	
    	
    	close : function() {
    		//
    	},
	    

    }      
    
});