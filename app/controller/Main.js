Ext.define('TodoApp.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'List',
            'New',
            'Edit',
            'TodoListItem'
        ],
        models: [
            'Item'
        ],
        stores: [
            'Item'
        ],
        refs: {
            mainPanel: 'todo-main',
            listPanel: {
                selector: 'todo-list',
                xtype: 'todo-list',
                autoCreate: true
            },
            listDataView: 'todo-list dataview',
            newPanel: {
                selector: 'todo-new',
                xtype: 'todo-new',
                autoCreate: true
            },
            newForm: 'todo-new formpanel',
            editPanel: {
                selector: 'todo-edit',
                xtype: 'todo-edit',
                autoCreate: true
            },
            editForm: 'todo-edit formpanel'
        },
        control: {
            'todo-list button[action=new]': {
                tap: 'showNewView'
            },
            'todo-list button[action=edit]': {
                tap: 'editTodoItem'
            },
            'todo-list button[action=delete]': {
                tap: 'deleteTodoItem'
            },
            'todo-new button[action=create]': {
                tap: 'createTodoItem'
            },
            'todo-new button[action=back]': {
                tap: 'showListView'
            },
            'todo-new button[action=back]': {
                tap: 'showListView'
            },
            'todo-edit button[action=save]': {
                tap: 'saveTodoItem'
            },
            'todo-edit button[action=back]': {
                tap: 'showListView'
            },
            'todo-edit button[action=back]': {
                tap: 'showListView'
            }
        }
    },
    createTodoItem: function(button, e, eOpts) {
        var store = Ext.create('TodoApp.store.Item');

        store.add(this.getNewForm().getValues())
        store.sync();
          
        this.showView(this.getListPanel());
    },
    editTodoItem: function(button, e, eOpts) {
        var store = this.getListDataView().getStore(),
          editPanel = this.getEditPanel(),
          editForm = this.getEditForm();

        editForm.setRecord(store.findRecord('id', button.getData()));

        this.showView(editPanel);
    },
    deleteTodoItem: function(button, e, eOpts) {
        var dataview = this.getListDataView(),
          store = dataview.getStore(),
          record = store.findRecord('id', button.getData()).erase();

        record.erase();
        store.load();
        dataview.refresh();
    },
    saveTodoItem: function(button, e, eOpts) {
        var store = Ext.create('TodoApp.store.Item'),
          values = this.getEditForm().getValues(),
          record = store.findRecord('id', values.id);

        record.setData(values);
        record.setDirty(); // Needed otherwise update record will not sync
        store.sync();

        this.showListView();
    },
    showView: function(view) {
        this.getMainPanel().removeAll();
        this.getMainPanel().add(view);
    },
    showListView: function() {
        this.showView(this.getListPanel());
    },
    showNewView: function() {
        this.showView(this.getNewPanel());
    },
    showEditView: function() {
        this.showView(this.getEditPanel());
    }
});
