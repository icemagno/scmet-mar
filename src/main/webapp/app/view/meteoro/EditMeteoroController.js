Ext.define('MCLM.view.meteoro.EditMeteoroController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.editmeteoro',
    
    onCloseEditMeteoroForm : function( button ) {
    	var editMeteoroWindow = Ext.getCmp('editMeteoroWindow'); 
    	editMeteoroWindow.close();
    },
    
	onSubmitEditMeteoroForm : function( button ) {
		var me = this;
		var form = button.up('form').getForm();
		
		
        if ( form.isValid() ) {
      	  form.submit({
              success: function(form, action) {
            	 MCLM.Map.getAvisosVigentes();
                 Ext.Msg.alert('Sucesso', action.result.msg, me.onCloseMessage);
                 MCLM.Functions.showActiveMeteoro();
                 
		    	 var editMeteoroWindow = Ext.getCmp('editMeteoroWindow'); 
		    	 editMeteoroWindow.close();
                 
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