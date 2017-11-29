Ext.define('MCLM.view.main.TelaPrincipal', {
	extend: 'Ext.Panel',
	xtype: 'telaPrincipal',
	id:'telaPrincipal',
	plugins: 'viewport',
	
	
	
    requires: [
       'Ext.plugin.Viewport',
       'MCLM.view.paineis.PainelSuperior',
       'MCLM.view.paineis.PainelCentral',
       'MCLM.view.paineis.PainelDireito',
       'MCLM.view.paineis.PainelInferior',
       'MCLM.view.main.MainController',
    ],
    
    
    layout: 'border',
    margin: '0 0 0 0',
    
    controller: 'main',
    
    bodyBorder: false,
    border:false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0
    },
    
    
    items: [{
        xtype: 'painelInferior', collapsible: false
    },{
        xtype: 'painelDireito', collapsible: false
    },{
        xtype: 'painelCentral', collapsible: false
    },{
        xtype: 'painelSuperior', collapsible: false
    }]
    
    
    
});

