Ext.define('MCLM.view.meteoro.MeteoroWindow', {
	
	extend: 'Ext.Window',
	
	id:'meteoroWindow',    	
	xtype: 'meteoroWindow',
	title : "Meteoromarinha",
	width : 600,
	height: 750,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,

	
	requires: [
	   'MCLM.view.meteoro.TopBar',
	   'MCLM.view.meteoro.BodyPanel'
	],
	  	
	
	layout: 'border',
	constrain: true,
	renderTo: Ext.getBody(),
	
	
    items : [{
        xtype: 'topBar'
    },{
        xtype: 'bodyPanel'
    }],
	
});