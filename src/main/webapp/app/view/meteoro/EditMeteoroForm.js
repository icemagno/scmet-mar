Ext.define('MCLM.view.meteoro.EditMeteoroForm', {
	extend: 'Ext.form.Panel',
	xtype: 'editMeteoroForm',
	id:'editMeteoroForm',
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
    
    url: 'updateMeteoro',
    items: [{
        fieldLabel: 'Texto',
        name: 'meteoroTexto',
        xtype: 'textareafield',
        id: 'meteoroTexto',
        grow : true,
        height : 100
    },{
        fieldLabel: 'Data da Análise',
        width: 350,
        id : 'dataAnaliseP2',
        name: 'dataAnaliseP2',
        allowBlank : false,
    },{
        fieldLabel: 'Texto da Análise',
        name: 'textoAnaliseP2',
        xtype: 'textareafield',
        id: 'textoAnaliseP2',
        grow : true,
        height : 150
    },{
        fieldLabel: 'Validade da Previsão',
        width: 350,
        id : 'validadePrevisaoP3',
        name: 'validadePrevisaoP3',
        allowBlank : false,
    }],

        
    buttons: [{
        text: 'Fechar',
        handler: 'onCloseEditMeteoroForm'
    },{
        text: 'Gravar',
        handler : 'onSubmitEditMeteoroForm'
    }],
    
    listeners: {
    	
	    afterrender : function ( cmp ) {
	    	//
	    }    

    }
    
    
});	
	
	