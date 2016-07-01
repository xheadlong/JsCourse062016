'use strict';

N13.define('JsTasks.todo.App',
    {
        requires: ['JsTasks.todo.controllers.Page', 'JsTasks.todo.utils.EventEmitter'],
        _pageController : null,
        init: function () {
            this._pageController = new JsTasks.todo.controllers.Page();
        }
    });