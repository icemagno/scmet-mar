Ext.define('MCLM.view.partetres.P3Form', {
	extend: 'Ext.form.Panel',
	xtype: 'p3Form',
	id:'p3Form',
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
    
    url: 'saveP3',
    items: [{
		xtype:'combobox',
		fieldLabel:'Área',
		name:'area',
		id:'id',
		valueField: 'id',
	    forceSelection: true,
	    allowBlank: false,
	    editable : false,
		queryMode:'local',
		value : 'aa',
		
        listeners: {
            'change': 'onAreaChange',
            'select': 'onAreaSelect'
        },		
		
		matchFieldWidth: false,
		store : Ext.create('Ext.data.Store', {
	        fields: ['id','area'],
	        data : [
	            {"id":"aa","area":"ALFA"},
	            {"id":"ab","area":"BRAVO"},
	            {"id":"ac","area":"CHARLIE"},
	            {"id":"ad","area":"DELTA"},
	            {"id":"ae","area":"ECHO"},
	            {"id":"af","area":"FOXTROT"},
	            {"id":"ag","area":"GOLF"},
	            {"id":"ah","area":"HOTEL"},
	            {"id":"ano","area":"NORTE OCEÂNICA"},
	            {"id":"aso","area":"SUL OCEÂNICA"},
	            {"id":"s30o30","area":"SUL OCEÂNICA: SUL DE 30S - OESTE DE 030W"},
	            {"id":"s30l30","area":"SUL OCEÂNICA: SUL DE 30S - LESTE DE 030W"},
	            {"id":"e25e30","area":"SUL OCEÂNICA: ENTRE 25S E 30S"},
	            {"id":"n25","area":"SUL OCEÂNICA: NORTE DE 25S"},
	        ],
		    proxy: { type: 'memory' }
		}),
		displayField:'area',
    },{
        fieldLabel: 'Texto',
        name: 'texto',
        xtype: 'textareafield',
        id: 'texto',
        grow : true,
        height : 150
    }],

        
    buttons: [{
        text: 'Fechar',
        handler: 'onCloseP3Form'
    },{
        text: 'Gravar',
        handler : 'onSubmitP3Form'
    }],
    
    listeners: {
    	
	    afterrender : function ( cmp ) {
	    	//
	    }    

    }
    
    
});	
	
	