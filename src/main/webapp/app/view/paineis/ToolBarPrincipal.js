Ext.define('MCLM.view.paineis.ToolBarPrincipal', {
	extend: 'Ext.toolbar.Toolbar',
	xtype: 'toolBarPrincipal',
	id: 'toolBarPrincipal',
	dock: 'right',
    overflowHandler: 'scroller',
    border : false,
    style: {
        background: '#FFFFFF'
    }, 
    
    
    
    items: [{
    	xtype: 'button',
		id: 'meteoroId',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'meteoro-icon',
	    handler : 'showMeteoro',
    },{ 
    	// Grade de coordenadas
    	xtype: 'button',
    	id: 'id115',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'grid-icon',
	    enableToggle: true,
        handler: 'toggleMapGrid'
    },{
    	xtype: 'button',
    	id: 'id117',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    enableToggle: true,
	    iconCls: 'query-icon',
        handler: 'toggleQueryTool'
    },{
    	iconCls: 'draw-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
    	xtype: 'button',
    	id: 'drawFeicaoBtn',
        handler : 'showDrawToolBar'
    },{
    	iconCls: 'cloud-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
    	xtype: 'button',
    	id: 'showForecastToolBarID',
        handler : 'showForecastToolBar'
    },{
    	iconCls: 'magnify-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
    	xtype: 'button',
    	id: 'magnifyID',
    	enableToggle: true,
        handler : 'toggleMagnify'
    },{
    	iconCls: 'measure-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
    	xtype: 'button',
    	id: 'measureToolID',
        handler : 'showMeasureTool'
    },{
    	iconCls: 'storm-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
    	xtype: 'button',
    	id: 'coberturaID',
        handler : 'showCobertura'
    },{
    	iconCls: 'satellite-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
    	xtype: 'button',
    	id: 'sateliteID',
        handler : 'showSatelite'
    },{
    	iconCls: 'goes-icon',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
    	xtype: 'button',
    	id: 'inmetGoesID',
        handler : 'showInmetGoes'
    }]
});