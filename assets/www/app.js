var cookie;
var filterme=[];
Ext.Loader.setConfig
({
    enabled: true
});

Ext.application
({
    name: 'JGospelNet',
    requires: ['JGospelNet.view.Viewport','Ext.MessageBox'],
    controllers: ['Main','Cookie'],
     
    launch: function () 
    {
		cookie = Ext.create('JGospelNet.controller.Cookie', { application: JGospelNet.app});
        var created = cookie.getCookie("created");
		console.log('created:');
		console.log(created);
		console.log('--------------------');
		if (created == undefined) {
			cookie.setCookie("created",true);
			for(var i=0; i<13; i++) {
				cookie.setCookie(i,true);
				filterme.push(true);
			}
		} else if (created == true) {
			for(var i=0; i<13; i++) {
				filterme.push(cookie.getCookie(i));
				console.log('cookie number: ' + i);
				console.log(filterme[i]);
			}
		}
        Ext.create('JGospelNet.view.Viewport');
		Ext.fly("splashLoading").destroy();
    },
});     
    