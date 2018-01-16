Ext.define('MCLM.view.slider.SateliteWindow', {
	extend: 'Ext.Window',
	id:'sateliteWindow',    	
	xtype: 'sateliteWindow',
	title : "Animação de Satélite GOES",
	width : 750,
	height: 552,
	constrain: true,
	resizable: false,
	renderTo: Ext.getBody(),
	html : '<div style="border-bottom:1px solid black;width:100%;height:31px"><img src="img/climatempo.png"></div><div id="climatempoDiv" style="width:100%;height:260px"></div>',
});