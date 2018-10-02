Ext.define('MCLM.view.meteoro.BodyPanel', {
	extend: 'Ext.Panel',
	xtype: 'bodyPanel',
	id:'bodyPanel',
	
    region: 'center',
    margin: '0 0 0 0',
    
    bodyBorder: false,
    border:false,
    scrollable: true,
    
    html : '<div id="meteoroBody" style="border-top:1px dotted #cacaca;width:100%;height:100%"></div>',
    
});

