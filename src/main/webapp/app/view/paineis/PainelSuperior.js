Ext.define('MCLM.view.paineis.PainelSuperior', {
	extend: 'Ext.Panel',
	xtype: 'painelSuperior',
	id: 'painelSuperior',
    region: 'north',
    floatable: false,
    margin: '0 0 0 0',
    height: 70,
    frame: false,
    collapsed: false,
    html : 	"<div id='topMainToolBar'>" +
    			"<div style='margin-left:20px;height:55px;float:left'><a href='http://www.mar.mil.br/dhn/chm/meteo/'><img style='margin-top:5px;height:55px;' src='img/marinha-logo.png'></a></div>" +
    			"<div style='margin-right:20px;height:55px;float:right'><img style='margin-top:5px;height:55px;' src='img/lloyds.png'></div>" +
    			"<div style='margin-right:20px;height:55px;float:right'><img style='margin-top:9px;height:51px;width:35px' src='img/dhn.gif'></div>" +
    			"<div style='margin-right:20px;height:55px;float:right'><img style='margin-top:5px;height:55px;' src='img/chm.png'></div>" +
    			"<div style='margin-right:20px;height:55px;float:right'><a target='__BLANK' href='rss'><img style='margin-top:15px;height:40px;' src='img/rss.png'></a></div>" +
    			"<div style='color:white;margin-left:15px;height:55px;float:left'>" +
    			"<span style='font-size:18px'>DIRETORIA DE HIDROGRAFIA E NAVEGAÇÃO</span><br>"+
    			"CENTRO DE HIDROGRAFIA DA MARINHA<br>"+
    			"Serviço Meteorológico Marinho<br>"+
    			"<span style='font-size:9px'>Sistema de Cadastro Meteorológico Marinho : SCMET-Mar</span></div>" +
    		"</div>",
});
