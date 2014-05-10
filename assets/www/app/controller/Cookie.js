Ext.define('JGospelNet.controller.Cookie', 
{
    extend: 'Ext.app.Controller',
    requires: ['JGospelNet.store.LocalSettings'],
    config:
    {
        store:'LocalSettingsStore',
        stores:['LocalSettings']
    },
    applyStore:function(storeId)
    {
        var _store = Ext.StoreManager.lookup(storeId);
        if(!_store)
        {
            _store = Ext.create('JGospelNet.store.LocalSettings');
        }
        return _store;
    },
    setCookie : function (c_name,value)
    {
        var model,i = this.getStore().findExact('key',c_name);
        if(value!==undefined)
        {
            if(i!==-1)
            {
                //update
                model = this.getStore().getAt(i);
                model.set('value',value);
                this.getStore().sync();
            }
            else
            {
                //add
                this.getStore().add({key:c_name,value:value});
                this.getStore().sync();
            }
        }
        else
        {
            //if exists and new value is undefined remove it
            if(i!==-1)
               this.removeCookie(c_name);
        }
    },
    getCookie : function(c_name)
    {
        var i = this.getStore().findExact('key',c_name);
        if(i!==-1)
        {
            return this.getStore().getAt(i).get('value');
        }
        return undefined;
    },

    removeCookie : function(c_name)
    {
        var i = this.getStore().findExact('key',c_name);
        if(i!==-1)
        {
            this.getStore().removeAt(i);
            this.getStore().sync();
        }
    }
});
