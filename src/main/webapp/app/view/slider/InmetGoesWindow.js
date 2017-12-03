Ext.define('MCLM.view.slider.InmetGoesWindow', {
	extend: 'Ext.Window',
	id:'inmetGoesWindow',    	
	xtype: 'inmetGoesWindow',
	title : "Inpe",
	width : 450,
	height: 490,
	constrain: true,
	renderTo: Ext.getBody(),
	resizable: false,
	html : 'Atenção: Imagens em Hora Universal (relativo ao meridiano de Greenwich). Desconte 3 horas para obter a Hora Oficial de Brasília correspondente.<br><img style="width:100%;height:430px" src="http://orion.cpa.unicamp.br/imagens/satelite/goesanima24.gif">',
	
});