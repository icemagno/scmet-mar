Ext.define('MCLM.view.meteoro.MeteoroBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.meteoroBarController',

    
    showActiveMeteoro : function() {
		
    	var meteoroBarWindow = Ext.getCmp('meteoroBarWindow'); 
		meteoroBarWindow.close();    	
    	
    	
        Ext.Ajax.request({
            url: 'getActiveMeteoro',
            method: 'get',
            success: function (response, opts) {
            	
            	if( !response.responseText ) {
            		Ext.Msg.alert('Erro', 'Nenhum meteoro encontrado.' );
            		return true;
            	}
            	
                var activeMeteoro = Ext.decode( response.responseText );
                
                console.log( activeMeteoro );
                
                var texto = activeMeteoro.texto;
                
                var table = "<table style='width:100%;'>";
        		table = table + "<tr><td><h2>Previsão 24 Horas</h2></td></tr>";
        		table = table + "<tr><td><h3><p style='text-decoration: underline'>"+texto+"</p></h3></td></tr>";
        		
        		// Parte 1
        		table = table + "<tr><td><h3><p style='text-decoration: underline'>PARTE UM - AVISOS DE MAU TEMPO</p></h3></td></tr>";
        		var parte1 = activeMeteoro.parte1;
        		for( var xx = 0; xx < parte1.length; xx++ ) {
        			var aviso = parte1[xx];
        			
        			var avTexto = "<p style='font-weight:bold'>AVISO NR " + aviso.numero + "</p>" + aviso.titulo + "<br>EMITIDO ÀS " + 
        				aviso.emissao + "<br>" + aviso.texto + "<br>" + aviso.validade + "<br>" + aviso.complemento;
        			
        			table = table + "<tr><td>"+avTexto+"</td></tr>";
        		}
        		
        		// Parte 2
        		
        		
        		table = table + "</table>";                
                
        		var meteoroWindow = Ext.getCmp('meteoroWindow'); 
        		if( !meteoroWindow ) {	
        			meteoroWindow = Ext.create('MCLM.view.meteoro.MeteoroWindow');
        		}	
        		meteoroWindow.show();
                
        		$("#meteoroBody").html( table );
                
                
                
            },
            failure: function(conn, response, options, eOpts) {
                //
            }            
        
        });	    	
    	
    	
    },
    

	newMeteoro : function() {
		
	},
	
	
	showMeteoros : function() {
		
	},
	
    
});