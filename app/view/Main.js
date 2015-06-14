Ext.define('TodoApp.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    alias: 'widget.todo-main',
    requires: [
        'TodoApp.view.New',
        'TodoApp.view.Edit',
        'TodoApp.view.List'
    ],
    config: {
        layout: 'fit',
        items: { xtype: 'todo-list' }
    }
});
