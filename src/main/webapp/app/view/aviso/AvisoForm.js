Ext.define('MCLM.view.aviso.AvisoForm', {
	extend: 'Ext.form.Panel',
	xtype: 'avisoForm',
	id:'avisoForm',
    bodyPadding: 5,
    defaultType: 'textfield',
    defaults: {
        anchor: '100%',
        msgTarget: 'under',
        labelWidth: 100
    },
    
    //height : 400,
    
	autoScroll: true,
	overflowY: 'scroll',
	scrollable: true,    
    
    url: 'saveAviso',
    items: [{
            fieldLabel: 'Número',
            name: 'numero',
            allowBlank : true,
            invalidText: 'Teste',
    }],

        
    buttons: [{
          text: 'Fechar',
          handler: 'onCloseConfigForm'
    },{
          text: 'Gravar',
          handler : 'onSubmitConfigForm'
    }],
    
    listeners: {
    	
	    afterrender : function ( cmp ) {
	    	//
	    }    

    }
    
    
});	
	
	