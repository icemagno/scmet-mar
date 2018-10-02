Ext.define('MCLM.view.meteoro.MeteoroBarWindow', {
	
	extend: 'Ext.Window',
	
	id:'meteoroBarWindow',    	
	xtype: 'meteoroBarWindow',
	title : "Gerenciar Meteoromarinha",
	width : 286,
	height: 70,
	bodyStyle:"background:#FFFFFF;",
	resizable: false,
	constrain: true,
	renderTo: Ext.getBody(),

    requires: [
       'MCLM.view.meteoro.MeteoroBarController',
       'MCLM.view.meteoro.MeteoroBar',
    ],	
    
    activeMeteoro : null,
    
    controller : 'meteoroBarController',
	
    items: [{
        xtype: 'meteoroBar',
    }],

    listeners: {

    	close : function() {
    		Ext.tip.QuickTipManager.unregister('showActiveMeteoroID');    	
    		Ext.tip.QuickTipManager.unregister('newMeteoroID');    	
    		Ext.tip.QuickTipManager.unregister('showMeteorosID');    	
    	},
	    
	    afterrender : function ( cmp ) {
        	
    	    Ext.tip.QuickTipManager.register({
    	        target: 'showActiveMeteoroID',
    	        title: 'Exibir Meteoromarinha',
    	        text: 'Exibe Meteoromarinha aberto (ativo).',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'newMeteoroID',
    	        title: 'Novo Meteoromarinha',
    	        text: 'Fecha o Meteoromarinha ativo e cria um novo com os mesmos elementos ativos.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'showMeteorosID',
    	        title: 'Consultar Arquivo',
    	        text: 'Consulta arquivo de Meteoromarinha.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    });			
        	
        }
	
    },	
	
    
});