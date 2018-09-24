Ext.define('MCLM.view.meteoro.MeteoroBar', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	id:'meteoroBar',    	
	xtype: 'meteoroBar',

    border : false,
    style: {
        background: '#FFFFFF'
    }, 
    
    items: [{
	    iconCls: 'bluerss-icon',
        handler: 'showActiveMeteoro',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'showActiveMeteoroID',
        xtype: 'button',
    },{
	    iconCls: 'greenrss-icon',
        handler: 'newMeteoro',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'newMeteoroID',
        xtype: 'button',
    },{
	    iconCls: 'yellowrss-icon',
        handler: 'showMeteoros',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'showMeteorosID',
        xtype: 'button',
    }],

	
});