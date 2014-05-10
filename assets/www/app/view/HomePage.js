var categories = [
	{ 'id': '68', 'name': '靈命' }, //1
	{ 'id': '63', 'name': '辯惑' }, //2
	{ 'id': '3', 'name': '詩歌' }, //3
	{ 'id': '5', 'name': '講道' }, //4
	{ 'id': '35', 'name': '見證' }, //5
	{ 'id': '65', 'name': '科技' }, //6
	{ 'id': '15', 'name': '電影' }, //7
	{ 'id': '33', 'name': '民化島' }, //8
	{ 'id': '57', 'name': '雜誌' }, //9
	{ 'id': '62', 'name': '遊戲' }, //10
	{ 'id': '53', 'name': '旅遊' }, //11
	{ 'id': '19', 'name': '美食' }, //12
	{ 'id': '13', 'name': '關於我們' }, //13
];
var morePanel = Ext.create('Ext.Panel',{
	cls: 'JGospelMenu',
	left: 0,
	padding: 0,
	hidden: true,
	width: 150,
	// height: 60,
	style: {
		'border-style': 'solid',
		'border-width': '1px',
	},
	items:[
		{
			html: '設定',
			cls: 'menuItem',
			// width: 200,			
			height: 40,
			style: {
				// 'right': '0px',
				// 'background-color': '#fff',
				'padding-top': '9px',
				'padding-bottom': '9px',
				'text-align': 'center',
				'border-bottom':'1px',
				'padding-top': '10px',
				// 'color': 'black',
			},
			listeners:{
				tap:
				{
					fn:function(e, node)
					{
						morePanel.hide();
						var settingsOverlay, toolBarTop;
						toolBarTop = new Ext.create('Ext.Toolbar', {
							docked: 'top',
							title: "設定",
							cls: 'JGospelToolbar JGospelDetailToolbar',
							defaults: {
								iconMask: true,
								height: 47,
								ui: 'plain'
							}
						});
						console.log(toolBarTop);
						var filter;
						var filters=[];
						var i=0;
						categories.forEach(function(cat, idx){
							filter = {
								xtype: 'checkboxfield',
								name: cat.id,
								label: cat.name,
								labelWidth: 150,
								height: 50,
								checked: filterme[i],
								listeners: {
									check: function() {
										var change;
										for(i=0; i<13; i++) {
											if(cat.id==categories[i].id) {
												change = i;
											}
										}
										console.log(change);
										filterme[change]=true;
										console.log(filterme[change]);
										console.log('should be true');
									},
									uncheck: function() {
										var change;
										for(i=0; i<13; i++) {
											if(cat.id==categories[i].id) {
												change = i;
											}
										}
										console.log(change);
										filterme[change]=false;
										console.log(filterme[change]);
										console.log('should be false');
									}
								}
							};
							filters.push(filter);
							i++;
						})
						var filterPanel = new Ext.Panel({
							centered: true,
							fullscreen: true,
							width:'100%',
							height:'100%',
							scrollable:'vertical',
							style: "background-color: #fff",
						});
						for(var i=0; i<filters.length; i++) {
							filterPanel.add(filters[i]);
						}
						JG.addToToolBar(toolBarTop, '', 50, 'reply', '',function () {
							settingsOverlay.destroy();
							filterme=[];
							for(var i=0; i<13; i++) {
								filterme.push(cookie.getCookie(i));
							}
						});
						var saveButton = Ext.create('Ext.Button', {
							requires: ['Ext.MessageBox'],
							text: '儲存',
							height: '50px',
							listeners:{
								tap:
								{
									fn:function(e, node)
									{
									for(var i=0; i<13; i++) {
										console.log('filterme ' + i);
										console.log(filterme[i]);
										console.log('--------------------');
										cookie.setCookie(i,filterme[i]);
									}
									// settingsOverlay.hide();
									console.log('saving...');
									// Ext.Msg.alert('重新啟動', '請重新啟動應用程式使設定生效');
									// navigator.app.exitApp();
									// console.log(navigator);
									// console.log(navigator.app);
									// setTimeout(function(){navigator.app.exitApp();}, 10000);
									console.log('before set active');
									var mainView = Ext.getCmp("HomePage");
									mainView.destroy();
									// Ext.Viewport.add({xtype:'HomePage'});
									// Ext.Viewport.remove({xtype:'HomePage'});
									Ext.Viewport.setActiveItem({xtype:'HomePage', scrollable: { direction: 'vertical', directionLock: true }});
									console.log('after set active');
									// settingsOverlay.hide();
									settingsOverlay.destroy();
									}
								}
							}
						});
						var sallButton = Ext.create('Ext.Button', {
							requires: ['Ext.MessageBox'],
							text: 'Select All',
							height: '50px',
							listeners: {
								tap:
								{
									fn:function(e, node)
									{
										// for(var i=0; i<13; i++) {
											// filterme[i]=true;
											// console.log(filters[i].name);
										// }
										// settingsOverlay.destroy();
										console.log("I'm supposed to select all");
									}
								}
							}
						});
						var dsallButton = Ext.create('Ext.Button', {
							requires: ['Ext.MessageBox'],
							text: 'Deselect All',
							height: '50px',
							listeners: {
							tap:
							{
								fn:function(e, node)
								{
									console.log("I'm supposed to deselect all");
								}
							}
							}
						});
						// var buttonPanel = new Ext.Panel({
							// docked: 'bottom',
							// centered: true,
							// style: "background-color: #fff",
							// height: '60px',
							// layout: {
								// type: 'hbox',
								// align: 'center',
								// pack: 'center'
							// },
							// items: [saveButton,sallButton,dsallButton]
						// });
						filterPanel.add(saveButton);
						filterPanel.add(sallButton);
						filterPanel.add(dsallButton);
						// filterPanel.add(buttonPanel);
						settingsOverlay = new Ext.Panel({
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
							// scrollable: 'vertical',
							items:[toolBarTop,filterPanel],
							// items:[toolBarTop,filterPanel,buttonPanel],
							cls: 'htmlcontent',
							style: "background-color: #fff",							
						});
						settingsOverlay.show();
						GLOBAL.curr = settingsOverlay;
						console.log(settingsOverlay);
						console.log("you tapped settings");
					},
					element:'element'
				}
			}
		},
		{
			html: '關於',
			cls: 'menuItem',
			// width: 200,
			height: 40,
			style: {
				// 'right': '0px',
				// 'background-color': '#fff',
				'padding-top': '9px',
				'padding-bottom': '9px',
				'border-style': 'none',
				'border-top': '1px',
				'text-align': 'center',
				// 'color': 'black',
			},
			listeners:{
				tap:
				{
					fn:function(e, node)
					{
						morePanel.hide();
						var aboutOverlay, toolBarTop;
						toolBarTop = new Ext.create('Ext.Toolbar', {
							docked: 'top',
							title: '關於',
							cls: 'JGospelToolbar JGospelDetailToolbar',
							defaults: {
								iconMask: true,
								height: 47,
								ui: 'plain'
							}
						});
						console.log(toolBarTop);
						JG.addToToolBar(toolBarTop, '', 50, 'reply', '',function () {
							aboutOverlay.destroy();
						});
						var aboutOverlay = new Ext.Panel({
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
							items:[toolBarTop],
							cls: 'htmlcontent',
							/* Add back button functionality to detailed overlay.
							 * Pops detailed overlay off the current view.
							 */
							// listeners:{
								// back: function(){
									// aboutOverlay.hide();												
								// }
							// }
							html: [
								// '<h1>This is heading 1</h1>',
								// '<h2>This is heading 2</h2>',
								// '<h3>This is heading 3</h3>',
								// '<h4>This is heading 4</h4>',
								// '<h5>This is heading 5</h5>',
								// '<h6>This is heading 6</h6>',
								'<b>JGospel</b>',
								'<p>Version: 2.0.0</p>',
								'<b>關於JGospel Net</b>',
								'<p> JGospel福音站是一個非營利的基督教組織，我們位於紐約市中心。在2006年譚俊德牧師與幾位有同一心志的弟兄姊妹建立了本站，',
								'本站致力於研發製作專業網站與提供相關服務給各種客戶。我們的客戶來自世界各地有需要的教會組織與教會事工。 </p>',
								'<p> 我們有專業的從業人員與領先技術，使我們能提供客戶完整的、高素質的產品。基於我們對耶穌基督的愛與奉獻，對客戶獻上完全忠誠的服務。 </p>',
								'<p> 身於科技公司，福音站專心致力於電腦科技領域。我們主要服務有，設計研發網站與手機應用程式、影音開發與製作。請觀看我們的網頁，',
								'裡面有更詳細的服務內容與產品介紹! <p>',
								'Developer: J Gospel Net<br>',
								'www.jgospel.net<br>',
								'facebook.com/jgospelnet'
								
							].join(""),
							style: "background-color: #fff"
						});
						aboutOverlay.show();
						GLOBAL.curr = aboutOverlay;
						console.log(aboutOverlay);
						console.log("you tapped about");
					},
					element:'element'
				}
			}
		}
	
	]
});


var mainPanel=Ext.define('JGospelNet.view.HomePage',
{
	extend: 'Ext.Panel',
	xtype:'HomePage',
	requires: ['JGospelNet.view.Category', 'Ext.field.Checkbox'],
	config: 
	{
			title:'HomePage',
			id:'HomePage',
			layout:'vbox',
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
            items: 
            [
                {
					html: '<img width="40" height="35" style="position:relative; left:5px; top:5px;" src="resources/images/jmobile.jpg"/>&nbsp;&nbsp;JGOSPEL 福音站',
                    xtype:'toolbar',
                    flex:1,
					layout:'hbox',
					height: '35',
					cls: 'JGospelToolbar JGospelLogo',					
					items:[
						{
							xtype: 'button',
							iconCls: 'more',
							style: {
								'border': 'none',
								'background-image': 'none',
								'background-color': '#F06440',
								'color': '#FFFFFF'
							},
							iconMask: true,
							docked: 'right',
							listeners:
							{
								tap: function(){
									console.log(morePanel);
									if(morePanel.isHidden()){
									//show
										morePanel.showBy(this, "tr-br");
									}else{
									//hide
										morePanel.hide();
										console.log(this);
									}
								}
							}
						}
					
					]
                }
            ]     
	},
	initialize: function()
    {
        console.log("initialize");
		var count = 1;
		var newItem;
		var newItems = [];
		
		// var cat = categories[0];
		// console.log(cat);
		// newItem = Ext.create('JGospelNet.view.Category');
		// newItem.items.items[0].setHtml(cat.name);
		// newItem.init(cat);
		// newItems.push(newItem);
		var show=0;
		console.log("creating new items");
		categories.forEach(function(cat, idx){
			if (filterme[show]) {
				newItem = Ext.create('JGospelNet.view.Category');
				newItem.items.items[0].setHtml(cat.name);
				newItem.init(cat);
				newItems.push(newItem);
			}
			show++;
		})
		console.log("adding new items to panel");
		for(var i= 0; i < newItems.length; i++){
			this.add(newItems[i]);
		}
		console.log("look at me");
		console.log(this.id);
    }	
});


