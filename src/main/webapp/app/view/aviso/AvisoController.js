Ext.define('MCLM.view.aviso.AvisoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.aviso',
    
    onCloseAvisoForm : function( button ) {
    	var avisoWindow = Ext.getCmp('avisoWindow');
    	avisoWindow.close();    
    	MCLM.DrawHelper.finish();
    },
    
    onCloseMessage : function( ) {
    	var avisoWindow = Ext.getCmp('avisoWindow');
    	avisoWindow.close();    
    	MCLM.DrawHelper.finish();
    },
    
	onSubmitAvisoForm : function( button ) {
		var me = this;
	
		var form = button.up('form').getForm();
		
        if ( form.isValid() ) {
      	  form.submit({
              success: function(form, action) {
                 Ext.Msg.alert('Sucesso', action.result.msg, me.onCloseMessage);
              },
              failure: function(form, action) {
                 Ext.Msg.alert('Failed', action.result.msg, me.onCloseMessage);
              }                		  
      	  });
        } else { 
            Ext.Msg.alert('Dados inválidos', 'Por favor, corrija os erros assinalados.')
        }
        
	}
    
    
});