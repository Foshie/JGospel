Ext.define('JGospelNet.model.Detail',
{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name:'name',		type: 'string'},
			{name:'id',			type: 'string'},
			{name:'imageurl', 	type: 'string'},
			{name:'brief', 		type: 'string'}
		]
	}

});