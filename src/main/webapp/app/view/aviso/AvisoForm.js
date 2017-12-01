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
        allowBlank : false,
    },{
        fieldLabel: 'Título',
        name: 'titulo',
        allowBlank : false,
    },{
        fieldLabel: 'Emissão',
        name: 'emissao',
        allowBlank : false,
    },{
        fieldLabel: 'Texto',
        name: 'texto',
        allowBlank : false,
    },{
        fieldLabel: 'Validade',
        name: 'validade',
        allowBlank : false,
    },{
        fieldLabel: 'Complemento',
        name: 'complemento',
        allowBlank : true,
    },{
        fieldLabel: 'Geometria',
        name: 'geometria',
        xtype : 'hiddenfield',
        id : 'geometriaId',
        allowBlank : false,
    }],

        
    buttons: [{
          text: 'Fechar',
          handler: 'onCloseAvisoForm'
    },{
          text: 'Gravar',
          handler : 'onSubmitAvisoForm'
    }],
    
    listeners: {
    	
	    afterrender : function ( cmp ) {
	    	//
	    }    

    }
    
    
});	
	
	