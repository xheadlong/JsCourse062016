'use strict';

N13.define('JsTasks.todo.views.BaseView',
    {
        _validateConfiguration: N13.emptyFn,
        _createControls: N13.emptyFn,

        init: function () {
            this._validateConfiguration();
            this._createControls();
        }
    });