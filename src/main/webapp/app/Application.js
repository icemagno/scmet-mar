Ext.define('MCLM.Application', {
    extend: 'Ext.app.Application',
    
    name: 'MCLM',

    requires: [
       'MCLM.view.main.TelaPrincipal',
       'MCLM.Globals',
       'MCLM.Functions',
       'MCLM.DrawHelper',
       'MCLM.ClimaHelper',
       'MCLM.MeasureHelper',
    ],
    
    stores: [
       'MCLM.store.LayerStack',
    ],
    
    onCloseWindow : function() {
    	//
    },    
   
    launch: function () {
        var me = this;
        
        
        Ext.define('Ext.form.PasswordField', {
            extend: 'Ext.form.field.Base',
            alias: 'widget.passwordfield',
            inputType: 'password',
        });        
        
    	Ext.Ajax.on("beforerequest", function (conn, options, eOpts) {
    		MCLM.Functions.showMainLoadingIcon( options.url );
    		conn.setUseDefaultXhrHeader(false);
    		conn.setWithCredentials(true);
        });    	
    	
    	Ext.Ajax.on("requestcomplete", function(conn, options, eOpts){
    		MCLM.Functions.hideMainLoadingIcon();
        });    	
    	
    	Ext.Ajax.on('requestexception', function (con, resp, op, e) {
    		$("#mainLoadingInfo").text( "" );
    		$("#mainLoadingIcon").css('display','none');
    	});    	

		Ext.Ajax.request({
			url: 'getConfig',
			success: function(response, opts) {
				var config = Ext.decode(response.responseText);
				
				// O Mapa é inicializado em 'MCLM.view.paineis.PainelCentral' no 
				// metodo 'afterRender'.
				
				// Nao modifique a ordem das chamadas abaixo
				
				/* 1. */ MCLM.Globals.config = config;				// A aplicacao precisa das configuracoes
				
				/* 2. */ Ext.create('MCLM.view.main.TelaPrincipal');	//
				
				/* 3. */ MCLM.Functions.inicializaDicas();			// As dicas dos botoes precisam dos botoes instanciados
				
				/* 4. */ MCLM.Functions.loadCoberturaImages();
		        // ---------------------------------------------
			},
			failure: function(response, opts) {
				//
			}
			
		});

		
    },


});
