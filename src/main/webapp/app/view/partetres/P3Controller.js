Ext.define('MCLM.view.partetres.P3Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.partetres',
    
    onCloseP3Form : function( button ) {
    	var p3Window = Ext.getCmp('p3Window'); 
    	p3Window.close();
    },
    
    onAreaChange : function( component, newValue, oldValue ) {
    	//
    },
    
    onAreaSelect : function( component, newValue, oldValue ){
    	var areaId = newValue.data.id;
    	
		var meteoroWindow = Ext.getCmp('meteoroWindow'); 
		if( !meteoroWindow ) {	
			return true;
		}	
		var activeMeteoro = meteoroWindow.activeMeteoro;    	
    	
		var areaTexto = activeMeteoro[ areaId ];
		Ext.getCmp('texto').setValue( areaTexto );
    },
    
    
    onUpdateAvisoForm : function( button ) {

    },
    
	onSubmitP3Form : function( button ) {
		var me = this;
		var form = button.up('form').getForm();
		
        if ( form.isValid() ) {
      	  form.submit({
              success: function(form, action) {
            	 MCLM.Map.getAvisosVigentes();
                 Ext.Msg.alert('Sucesso', action.result.msg, me.onCloseMessage);
                 
                 MCLM.Functions.showActiveMeteoro();
                 
                 var p3Window = Ext.getCmp('p3Window');
                 p3Window.close();
                 
              },
              failure: function(form, action) {
                 Ext.Msg.alert('Falha', action.result.msg, me.onCloseMessage);
              }                		  
      	  });
        } else { 
            Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
        }
        
	}
    
    
});