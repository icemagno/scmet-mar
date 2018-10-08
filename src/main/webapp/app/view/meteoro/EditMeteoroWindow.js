Ext.define('MCLM.view.meteoro.EditMeteoroWindow', {
	extend: 'Ext.Window',
	
	requires: [
	   'MCLM.view.meteoro.EditMeteoroForm',
	   'MCLM.view.meteoro.EditMeteoroController'
	],  
	
	controller : 'editmeteoro',
	
	id:'editMeteoroWindow',    	
	xtype: 'editMeteoroWindow',
	title : "Editar Meteoromarinha",
	width : 500,
	height: 400,
	
	layout : 'fit',
	constrain: true,
	renderTo: Ext.getBody(),
    items : [{
        xtype: 'editMeteoroForm',
    }],
    
    
    listeners: {
    	
    	close : function() {
    		//
    	},
	    

    }      
    
});