Ext.define('MCLM.view.slider.SliderWindow', {
	extend: 'Ext.Window',
	id:'sliderWindow',    	
	xtype: 'sliderWindow',
	title : "Modelos",
	width : 350,
	height: 500,
	constrain: true,
	resizable: false,
	renderTo: Ext.getBody(),
	
    buttons: [{
        text: '00',
        handler: function() {
        	MCLM.Functions.horario = '00HMG';
        }
	  },{
	    text: '12',
	    handler : function() {
	    	MCLM.Functions.horario = '12HMG';
	    }
	}],
	
	html : '',
	
});