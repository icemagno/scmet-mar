Ext.define('MCLM.view.aviso.AvisoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.aviso',
    
    onCloseAvisoForm : function( button ) {
    	var avisoWindow = Ext.getCmp('avisoWindow');
    	avisoWindow.close();    
    	MCLM.DrawHelper.finish();
    },
    
    onCloseUpdateMessage : function( ) {
    	location.reload();
    },
    
    onCloseMessage : function( ) {
    	var avisoWindow = Ext.getCmp('avisoWindow');
    	avisoWindow.close();    
    	MCLM.DrawHelper.finish();
    },
    
    onUpdateAvisoForm : function( button ) {
		var me = this;
		var form = button.up('form').getForm();
		
        if ( form.isValid() ) {
      	  form.submit({
              success: function(form, action) {
            	 MCLM.Map.getAvisosVigentes();
                 Ext.Msg.alert('Sucesso', action.result.msg, me.onCloseUpdateMessage);
                 
                  
                 
              },
              failure: function(form, action) {
                 Ext.Msg.alert('Falha', action.result.msg, me.onCloseMessage);
              }                		  
      	  });
        } else { 
            Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
        }
    },
    
	onSubmitAvisoForm : function( button ) {
		var me = this;
		var form = button.up('form').getForm();
		
		if( !MCLM.DrawHelper.haveData() ) {
			Ext.Msg.alert('Erro', 'É necessário desenhar uma área no mapa.');
			return true;
		}
		
		var geomData = MCLM.DrawHelper.getAsJson();
		var geomField = Ext.getCmp('geometriaId');
		geomField.setValue( geomData );
		
        if ( form.isValid() ) {
      	  form.submit({
              success: function(form, action) {
            	 MCLM.Map.getAvisosVigentes();
                 Ext.Msg.alert('Sucesso', action.result.msg, me.onCloseMessage);
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