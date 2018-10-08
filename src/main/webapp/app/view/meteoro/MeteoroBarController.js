Ext.define('MCLM.view.meteoro.MeteoroBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.meteoroBarController',

    showP3Item : function() {
    	var p3Window = Ext.getCmp('p3Window'); 
		if ( !p3Window ) p3Window = Ext.create('MCLM.view.partetres.P3Window');
		p3Window.show();
		
		var meteoroWindow = Ext.getCmp('meteoroWindow'); 
		if( !meteoroWindow ) {	
			return true;
		}	
		var activeMeteoro = meteoroWindow.activeMeteoro;    	
    	
		var areaTexto = activeMeteoro[ 'aa' ];
		Ext.getCmp('texto').setValue( areaTexto );		
    	
	},
    
	editMeteoro : function() {
    	var editMeteoroWindow = Ext.getCmp('editMeteoroWindow'); 
    	if ( !editMeteoroWindow ) {
    		editMeteoroWindow = Ext.create('MCLM.view.meteoro.EditMeteoroWindow');
    	}
    	editMeteoroWindow.show();	
    	
    	
		var meteoroWindow = Ext.getCmp('meteoroWindow'); 
		var activeMeteoro = meteoroWindow.activeMeteoro;    	
    	
		Ext.getCmp('meteoroTexto').setValue( activeMeteoro.texto );
		Ext.getCmp('dataAnaliseP2').setValue( activeMeteoro.data_analise_p2 );
		Ext.getCmp('validadePrevisaoP3').setValue( activeMeteoro.validade_previsao_p3 );
		Ext.getCmp('textoAnaliseP2').setValue( activeMeteoro.texto_analise_p2 );
		
    	
	},
	
	exportPdf : function() {
        Ext.Ajax.request({
            url: 'exportToPdf',
            method: 'get',
            success: function (response, opts) {
            	
            	var pdf = response.responseText;
            	if ( pdf ) {
            		
            		window.open(
            		  'tempmaps/' + pdf, '_blank' 
            		);
          		
            		
            	} else {
            		Ext.Msg.alert('Erro', 'Não foi possível gerar o PDF.' );
            		return true;
            	}
            }
        
        });
        
	},
	
    showActiveMeteoro : function() {
    	/*
    	var meteoroBarWindow = Ext.getCmp('meteoroBarWindow'); 
		meteoroBarWindow.close();    	
		MCLM.Functions.showActiveMeteoro();
		*/
    },
    

	newMeteoro : function() {
		
	    var messageBox = Ext.create('Ext.window.MessageBox', {
	        buttonText: {
	            yes: 'Sim',
	            no: 'Não'
	        }
	    });
		
	    messageBox.confirm('ATENÇÃO', 'Fechar o Meteoromarinha atual e abrir um novo? O atual não poderá mais ser editado!', function (btn) {
            if (btn === 'yes') {

            	
        	    messageBox.confirm('ATENÇÃO', 'Você exportou o PDF do Meteoromarinha atual?', function (btn) {
        	    	
        	    	if (btn === 'no') {
        	    		Ext.Msg.alert('Aviso', 'Exporte o PDF do Meteoromarinha atual e armazene-o para futura referência.' );
        	    	}
        	    	
        	    	
                    if (btn === 'yes') {
		                Ext.Ajax.request({
		                    url: 'novoMeteoro',
		                    method: 'get',
		                    success: function (response, opts) {
		                    	Ext.Msg.alert('Aviso', response.responseText ); 
		                    	MCLM.Functions.showActiveMeteoro();
		                    }
		                
		                });
                    }
            	
                });
        	    
        	    
            }
        });		
		
	
	},
	

    
	showMeteoros : function() {
		
	},
	
    
});