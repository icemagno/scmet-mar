Ext.define('MCLM.view.meteoro.TopBar', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	id:'topBar',    	
	xtype: 'topBar',

	height: 40,	
	region : 'north',
	
    border : false,
    style: {
        background: '#FFFFFF'
    }, 
    
    items: [{
	    iconCls: 'draw-icon',
        handler: 'editMeteoroID',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'editMeteoroID',
        xtype: 'button',
    },{
	    iconCls: 'three-icon',
        handler: 'showP3Item',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'showP3ItemID',
        xtype: 'button',
    },{
	    iconCls: 'pdf-icon',
        handler: 'exportPdf',
	    width: MCLM.Globals.btnWidth,
	    height: MCLM.Globals.btnHeight,
	    id : 'exportPdfID',
        xtype: 'button',
    }],

	
});