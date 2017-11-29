Ext.define('MCLM.view.paineis.PainelSuperior', {
	extend: 'Ext.Panel',
	xtype: 'painelSuperior',
	id: 'painelSuperior',
    region: 'north',
    floatable: false,
    margin: '0 0 0 0',
    height: 48,
    frame: false,
    collapsed: false,
    html : 	"<div id='topMainToolBar'>" +
    			"<a href='#'><img style='margin-left:17px;' src='img/logo.png'></a>" +
    			"<div id='topMainToolBarUserName'>&nbsp;</div>" +
    		"</div>",
});
