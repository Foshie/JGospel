Ext.define('JGospelNet.store.LocalSettings',
{
    extend: 'Ext.data.Store',
    requires:['Ext.data.proxy.LocalStorage','JGospelNet.model.LocalSetting'],
    config:
    {
        model: 'JGospelNet.model.LocalSetting',
        storeId: 'LocalSettingsStore',
        proxy:
        {
            type: 'localstorage',
            id:   'LocalSettingsStoreProxy'
        },
        autoLoad:true
    }
});
