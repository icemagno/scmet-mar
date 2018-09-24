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
		xtype:'combobox',
		fieldLabel:'Área',
		name:'id',
		id:'id',
		valueField: 'id',
	    forceSelection: true,
	    allowBlank: false,
	    editable : false,
		queryMode:'local',
		value : 'ALFA',
		//xtype : 'hidden',
		
		matchFieldWidth: false,
		store : Ext.create('Ext.data.Store', {
	        fields: ['id'],
	        data : [
	            {"id":"ALFA"},
	            {"id":"BRAVO"},
	            {"id":"CHARLIE"},
	            {"id":"DELTA"},
	            {"id":"ECHO"},
	            {"id":"FOXTROT"},
	            {"id":"GOLF"},
	            {"id":"HOTEL"},
	            {"id":"NOVEMBER"},
	            {"id":"SIERRA"},
	        ],
		    proxy: { type: 'memory' }
		}),
		displayField:'id',
    },{
        fieldLabel: 'Número',
        name: 'numero',
        id: 'numero',
        allowBlank : false,
    },{
        fieldLabel: 'Título',
        name: 'titulo',
        id: 'titulo',
        allowBlank : false,
    },{
        fieldLabel: 'Emissão',
        name: 'emissao',
        id: 'emissao',
        allowBlank : false,
    },{
        fieldLabel: 'Texto',
        name: 'texto',
        id: 'texto',
        allowBlank : false,
    },{
        fieldLabel: 'Validade',
        name: 'validade',
        id: 'validade',
        allowBlank : false,
    },{
        fieldLabel: 'Complemento',
        name: 'complemento',
        id: 'complemento',
        allowBlank : true,
    },{
        fieldLabel: 'Geometria',
        name: 'geometria',
        xtype : 'hiddenfield',
        id : 'geometriaId',
        allowBlank : true,
    },{
        fieldLabel: 'Ativo',
        name: 'ativo',
        id : 'ativoId',
        xtype: 'checkbox',
        inputValue: 'true',
        allowBlank : false,
    },{
        fieldLabel: 'Identificador',
        name: 'avisoId',
        xtype : 'hiddenfield',
        id : 'avisoId',
        allowBlank : true,
    }],

        
    buttons: [{
        text: 'Fechar',
        handler: 'onCloseAvisoForm'
    },{
        text: 'Gravar',
        id : 'onSubmitAvisoId',
        hidden:false,
        handler : 'onSubmitAvisoForm'
    },{
        text: 'Gravar',
        id : 'onUpdateAvisoId',
        hidden:true,
        handler : 'onUpdateAvisoForm'
    }],
    
    listeners: {
    	
	    afterrender : function ( cmp ) {
	    	//
	    }    

    }
    
    
});	
	
	