var GLOBAL = {};
GLOBAL.curr;
GLOBAL.home;
Ext.define('JGospelNet.controller.Main',
{
	requires: ['Ext.data.Store'],
    extend: 'Ext.app.Controller',
    config: 
    {
        views: ['HomePage','Category']    
    },
    init: function()
    {
        if(Ext.os.is.Android){
			document.addEventListener('backbutton', Ext.bind(onBackKeyDown, this), false);
			
			function onBackKeyDown(e){
				e.preventDefault();
				if(GLOBAL.curr != GLOBAL.home){
					GLOBAL.curr.destroy();
					GLOBAL.curr = GLOBAL.home;
				}else{
					navigator.app.exitApp();
				}
			}
		
		}
    }
});
        