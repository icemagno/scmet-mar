Ext.define('MCLM.view.partetres.P3Window', {
	extend: 'Ext.Window',
	
	requires: [
	   'MCLM.view.partetres.P3Form',
	   'MCLM.view.partetres.P3Controller'
	],  
	
	controller : 'partetres',
	
	id:'p3Window',    	
	xtype: 'p3Window',
	title : "Item Parte Três",
	width : 500,
	height: 300,
	
	layout : 'fit',
	constrain: true,
	renderTo: Ext.getBody(),
    items : [{
        xtype: 'p3Form',
    }],
    
    
    listeners: {
    	
    	
    	close : function() {
    		//
    	},
	    

    }      
    
});