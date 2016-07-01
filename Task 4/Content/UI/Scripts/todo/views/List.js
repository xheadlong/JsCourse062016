'use strict';

(function () {
    N13.define('JsTasks.todo.views.List',
      {
          extend: 'JsTasks.todo.views.BaseView',

          _listElement: null,

          _validateConfiguration: function (params) {
              if (typeof this.containerSelector !== 'string') {
                  throw new Error('The "containerSelector" was expected to be initialized.');
              }
          },
          _createControls: function () {
              var containerElement = $(this.containerSelector).first();            

              this._listElement = $('<ul/>');

              var listContainerElement =
                  $('<div/>').addClass('listContainer');

              listContainerElement.append(this._listElement);
              containerElement.append(listContainerElement);
          },

          addItem: function (itemData) {
              var self = this;
              var listItemElement =
                  $('<li/>').val(itemData.id);

              var listItemContainerElement =
                  $('<div/>').addClass('listItemContainer');

              var textElement =
                  $('<span/>').text(itemData.description);

              var deleteButtonElement =
                  $('<input/>').prop('type', 'button')
                      .val('Delete')
                      .addClass('listItemDeleteButton')
                      .click(function (event) {
                          self._listElement[0].removeChild(listItemElement[0]);
                      });

              listItemContainerElement.append(textElement, deleteButtonElement);
              listItemElement.append(listItemContainerElement);
              this._listElement.append(listItemElement);
          }
    });     
})();