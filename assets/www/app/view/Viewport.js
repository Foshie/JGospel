Ext.define('JGospelNet.view.Viewport',
{
	extend: 'Ext.Panel',
	requires: ['Ext.data.Model'],
	config: 
	{
	
		id: 'appViewport',
		fullscreen: true,
		width: '100%',
        height: '100%',
		scrollable:
		{
			direction : 'vertical'
		},
		plain:true,
		items: 
		[		
		  {	
		      xtype: 'HomePage'
		  }	
        ]
	}
	
});