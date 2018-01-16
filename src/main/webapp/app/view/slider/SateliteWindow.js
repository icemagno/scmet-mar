Ext.define('MCLM.view.slider.SateliteWindow', {
	extend: 'Ext.Window',
	id:'sateliteWindow',    	
	xtype: 'sateliteWindow',
	title : "Imagem de Satélite",
	width : 900,
	height: 490,
	constrain: true,
	resizable: false,
	renderTo: Ext.getBody(),
	html : '',
});