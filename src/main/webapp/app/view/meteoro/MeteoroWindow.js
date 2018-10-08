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
	   'MCLM.view.meteoro.BodyPanel',
	   'MCLM.view.meteoro.MeteoroBarController',
	],
	  	
	controller : 'meteoroBarController',
	
	layout: 'border',
	constrain: true,
	renderTo: Ext.getBody(),
	
	
    items : [{
        xtype: 'topBar'
    },{
        xtype: 'bodyPanel'
    }],
    
    
    listeners: {

    	close : function() {
    		Ext.tip.QuickTipManager.unregister('showP3ItemID');    	
    		Ext.tip.QuickTipManager.unregister('exportPdfID');    	
    		Ext.tip.QuickTipManager.unregister('editMeteoroID');    	
    	},
    	
	    afterrender : function ( cmp ) {
        	
    	    Ext.tip.QuickTipManager.register({
    	        target: 'showP3ItemID',
    	        title: 'Editar Parte Três',
    	        text: 'Edita os itens da parte três deste meteoromarinha.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'exportPdfID',
    	        title: 'Exportar para PDF',
    	        text: 'Exporta para PDF / Imprime.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'editMeteoroID',
    	        title: 'Editar Meteoromarinha',
    	        text: 'Edita este Meteoromarinha.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    },{
    	        target: 'newMeteoroID',
    	        title: 'Novo Meteoromarinha',
    	        text: 'Fecha o Meteoromarinha ativo e cria um novo com os mesmos elementos ativos.',
    	        width: 180,
    	        dismissDelay: 5000 
    	    });
    	    
	    },    
    	
    }	
	
});