'use strict';

N13.define('JsTasks.todo.controllers.Page',
    {
        requires: ['JsTasks.todo.views.List', 'JsTasks.todo.views.AddItem'],

        _firstViewBunch : null,
        _secondViewBunch : null,

        _createToDoViews: function (addContainerSelector, listContainerSelector) {
            var viewPair = {};
            viewPair.addItemView = new JsTasks.todo.views.AddItem({
                containerSelector: addContainerSelector
            });
            viewPair.listView = new JsTasks.todo.views.List({
                containerSelector: listContainerSelector
            });

            viewPair.addItemView.addListener('add', function (item) {
                viewPair.listView.addItem(item);
                viewPair.addItemView.clear();
                viewPair.addItemView.focus();
            });

            return viewPair;
        },

        init: function() {
            this._firstViewBunch = this._createToDoViews('#leftContainer .addTodo', '#leftContainer .list');
            this._secondViewBunch = this._createToDoViews('#rightContainer .addTodo', '#rightContainer .list');
        }
    });