Ext.define('Detail', {
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

var ajaxURL = 'http://jgospel.net/m/ajax_ver_2_0.aspx';
//Define Templates
var JG = {};
//detail template
JG.detailTpl = [
	'<tpl for=".">',
		'<div class="JGDetailView">',
			'<h2 class="title">{name}</h2>',
			'<div class="content">{detail}</div>',
		'</div>',
	'</tpl>'
];
//video template
JG.videoTpl = [
	"<video width='270' height='250' controls>",
		'<source src="{media}"type="video/mp4; codecs=\'avc1.42E01E, mp4a.40.2\'"',
	"</video>"
];
//audio template
JG.audioTpl = [
	'<audio hidden="false" src="{media}" preload="auto" controls="controls" id="ext-gen1007"></audio>'
];
//--End templates
//external methods
JG.addToToolBar = function (toolBar, text, width, iconCls, cssClass, onTapCallBacks) {
	toolBar.add(new Ext.Button({
		text: text,
		cls: cssClass,
		width: width,
		iconCls: iconCls,
		iconAlign: 'right',
		style: {
                fontSize:'12pt'
        },
		listeners: {
			tap: function () {
				Ext.select('.JGospelDetailToolbar .x-button-pressed').removeCls('x-button-pressed');
				this.addCls('x-button-pressed');
				onTapCallBacks();
			}
		}
	}));
}
//get screen width
JG.screenSizeWidth = function () {
	if (Ext.is.Phone) {
		return 270;		//iphone width
	} else {
		return 400;		//ipad width
	}
}

// list of categories
Ext.define('JGospelNet.view.Category', 
{
	extend: 'Ext.Panel',
	xtype:'Category',
	requires: ['Detail', 'Ext.DataView', 'Ext.Carousel', 'Ext.Toolbar'],
	config: 
	{		
			title:'Category',
			listeners: 
			{
	            show: function () 
	            {
	            },
	            hide: function () 
	            {
	            },
				tap: 
	            {
	                fn: function (e, node) 
	                {
	                },
	                element: 'element'
	            }
	        },


            layout: 'vbox',
            items: 
            [
                {
					html: null,
                    cls: 'JGospelCategory',
                    height: 36,
                    xtype:'panel',
                    flex: 1
                }
            ]       
	},
	init: function(cat){
		var thisPanel = this;
		thisPanel._id = cat.id;
		Ext.Ajax.request({
			url: ajaxURL,
			params: { a: '1', tid: cat.id},
			// params: { a: '3', tid: cat.id, count:1},
			method: 'GET',
			success: function (response) {
				var responseEval = eval(response.responseText);
			
				if(Ext.os.is.Phone)
					responseEval = responseEval.slice(0,5);
				var contents = Ext.create('Ext.data.Store',{
					model: 'Detail',
					data: eval(responseEval)
				});
				//console.log(contents);
				/*Create a detail list*/
				
				var list = Ext.create('Ext.DataView',{
					title: 'DetailList',
					height: '80px',
					scrollable: 
					{
						direction: 'horizontal',
						directionLock: true,				
					},
					itemTpl:[	
							'<div class= "thumb">',
								'<img src = {imageurl} width= "120" height= "80" id="{id}" style="padding-right: 5px"/>',
								'<div style="position: absolute; bottom:0; background:rgba(0,0,0,0.5); width:115px;">',
									'<div style="padding-left: 5px; padding-bottom: 10px; padding-top:5px; font-size: 10pt; color:#fff;overflow:hidden; text-overflow: ellipsis; width: 110px">',
										'<p>{name}</p>',
									'</div>',
								'</div>',
							'</div>'
								
								//class = "thumb"><img src = {imageurl} width = "120" height = "80" id = "{id}" style = "padding-right:5px" alt="alternate text" position= "relative"/><p style="width:120; position: relative; top:-100px;>{name}</p></div>',
							],
					
					listeners: {
						show: function () 
						{
						},
						hide: function () 
						{
						},
						tap: 
						{
							fn: function (e, node) 
							{
							  // Work on Show Detail
								VP = Ext.Viewport;
								VP.setMasked({
									xtype: 'loadmask',
									message: '載入中, 請稍候…'
								});
								Ext.Ajax.request({
									url: ajaxURL,
									params: { a: '2', cid: node.id },
									method: 'GET',
									success: function (response) {
										//variables use in scope
										var detail,
											media,
											photoList,
											contentDetail,
											photoGallery,
											toolBarTop,
											detailOverlay;
										//parse response
										//console.log(response.responseText);
										detail = Ext.JSON.decode(response.responseText)[0];
										
										
										photos = detail.photos;

										photoList = [];
										//bind photos to photo list
										for (var i = 0; i < photos.length; i++) {
											photoList.push({ html: "<img width='" + JG.screenSizeWidth() + "' src='" + photos[i].src + "'/>" });
										}
										//assign template to media
										JG.mediaTpl = JG.videoTpl;
										//2 == audio
										if (detail.mediaType == '2') {
											JG.mediaTpl = JG.audioTpl;
										}

										//create detail component and assign template
										contentDetail = new Ext.create('Ext.Container', {
											scrollable: 'vertical',
											tpl: JG.detailTpl,
											cls: 'detail'
										});
										contentDetail.setData(detail); //update component
										
										//create carousel for photo
										photoGallery = new Ext.create('Ext.Carousel',{
											items: photoList
										});

										//create media component
										media = new Ext.create('Ext.Container', {
											tpl: JG.mediaTpl,
											cls: 'media'
										});
										media.setData(detail); //update component
										console.log(VP);
										//create toolBarTop
										toolBarTop = new Ext.create('Ext.Toolbar', {
											docked: 'top',
											scrollable: 'horizontal',
											cls: 'JGospelToolbar JGospelDetailToolbar',
											defaults: {
												iconMask: true,
												height: 47,
												ui: 'plain'
											}
										});
										//add back to list button to toolbar
										JG.addToToolBar(toolBarTop, '', 50, 'reply', '',function () {
											detailOverlay.destroy();
										});

										//add button if there are photos
										JG.addToToolBar(toolBarTop, '內容', 80, '', 'x-button-pressed', function () {
											detailOverlay.setActiveItem(0);
											detailOverlay.setScrollable('vertical');
										});
										
										if (photoList.length > 0) {
											JG.addToToolBar(toolBarTop, '圖片', 80, '','', function () {
												detailOverlay.setActiveItem(1);
												detailOverlay.setScrollable(false);
											});
										}
										//add button if there are media
										if (detail.mediaType != '0') {
											var mediaTxt = detail.mediaType == '1' ? '視頻' : '錄音';

											JG.addToToolBar(toolBarTop, mediaTxt, 80, '','', function () {
												detailOverlay.setActiveItem(2);
												detailOverlay.setScrollable('vertical');
											})
										}
										//init overlay and add content to it
										detailOverlay = new Ext.Panel({
											layout: 'card',
											cardSwitchAnimation: 'slide',
											top: true,
											modal: true,
											showAnimation: 'slide',
											centered: true,
											fullscreen: true,
											width:'100%',
											height: '100%',
											styleHtmlContent: true,
											scrollable: 'vertical',
											items: [toolBarTop, contentDetail, photoGallery, media],
											cls: 'htmlcontent',
											/* Add back button functionality to detailed overlay.
											 * Pops detailed overlay off the current view.
											 */
										});
										GLOBAL.curr = detailOverlay;
										detailOverlay.show();
										VP.unmask();
									}
								});
								
							},
							element: 'element'
						}
						
					},
					store: contents,
					inline: { wrap:false},
										
				});
				list.setStore(contents);
				list.getScrollable().getScroller().on({scrollend: thisPanel.onScrollEnd, scope: thisPanel});
				thisPanel.add(list);
				//console.log(thisPanel);						
			}
		});

	
	
	},
	onScrollEnd: function(scroller, x, y){
	//Change sensitivity of autoloading detection
		if((x >= scroller.maxPosition.x)){
			this.LoadMore();
		}
		var scroll = this.getItems().items[1].getScrollable().getScroller();
		scroll.setInitialOffset( {x: x, y: 0});
	},
	LoadMore: function(){
		/*	Dynamically load more content for each category if the scroller hits the end.
			If phone: load 5 at a time
			If tablet or web: load 10 at a time		
		*/
		
		//Get list from this panel
		var thisPanel = this;
		var thisList = thisPanel.getItems().items[1];
		
		var thisStore = thisList.getStore();
		
		
		//testing loadmask code 
		
		if(Ext.os.is.Phone){
			var count = thisStore.getData().length/5;
			var reqPage = Math.floor(count /2);

			Ext.Ajax.request({
				url: ajaxURL,
				params: { a: '3', tid: thisPanel._id, count:reqPage + 1},
				method: 'GET',
				success: function (response) {
					var responseEval = eval(response.responseText);
					responseEval = responseEval.slice(0, (count+1)*5);
					
					var contents = Ext.create('Ext.data.Store',{
						model: 'Detail',
						data: eval(responseEval)
					});
					thisList.setStore(contents);	
				}		
			});
		}else{
			//Get # of pages loaded from server.
			var count = thisStore.getData().length/10;
			Ext.Ajax.request({
				url: 'http://jgospel.net/m/ajax_ver_2_0.aspx',
				params: { a: '3', tid: thisPanel._id, count:count + 1},
				method: 'GET',
				success: function (response) {
					var responseEval = eval(response.responseText);
					var contents = Ext.create('Ext.data.Store',{
						model: 'Detail',
						data: eval(responseEval)
					});
					thisList.setStore(contents);	
				}	
			});
		
		}
		
	}
});
