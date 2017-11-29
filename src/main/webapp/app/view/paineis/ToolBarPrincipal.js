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
    	// Config
    	xtype: 'button',
		id: 'id111',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    iconCls: 'setting-icon',
	    handler : 'showConfig',
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
    }]
});