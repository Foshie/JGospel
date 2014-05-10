Ext.define('JGospelNet.model.LocalSetting',
{
    requires: ['Ext.data.identifier.Uuid'],
    extend: 'Ext.data.Model',
    config:
    {
        identifier: 'uuid',
        fields:
        [
            'key', 'value'
        ]
    }
});
