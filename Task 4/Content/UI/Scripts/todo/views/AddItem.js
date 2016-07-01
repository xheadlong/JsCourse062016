//'use strict';

N13.define('JsTasks.todo.views.AddItem',
     {
         requires: ['JsTasks.todo.services.Validation'],
         extend: 'JsTasks.todo.views.BaseView',
         mixins: { Events: 'JsTasks.todo.utils.EventEmitter' },

         _validationService: null,
         _texBoxElement: null,

         _validateConfiguration: function () {
             if (typeof this.containerSelector !== 'string') {
                 throw new Error('The "containerSelector" was expected to be initialized.');
             }
         },

         _createControls: function () {
              var self = this;
               var containerElement = $(this.containerSelector).first();

               var errorElement =
                   $('<div/>').addClass('addItemError')
                       .hide();

               var textBoxElement =
                   $('<input/>').prop('type', 'text')
                       .addClass('newItemDescriptionTextBox');

               var disableAdding = function (disable) {
                   var isFocused = textBoxElement.is(":focus");

                   textBoxElement.prop("disabled", disable);
                   buttonElement.prop("disabled", disable);

                   if (isFocused) {
                       textBoxElement.focus();
                   }
               };

               var setError = function (errorMessage) {
                   errorElement.text(errorMessage)
                       .show();
                   textBoxElement.addClass('validationError')
                       .prop('title', errorMessage)
                       .focus();
               };

               var setNoError = function () {
                   textBoxElement.removeClass('validationError')
                       .prop('title', '');
                   errorElement.hide()
                       .text('');
               };

               var onItemAdding = function () {
                   var toDoItemText = textBoxElement.val().trim();

                   if (toDoItemText.length > 0) {
                       var itemData =
                           {
                               id: new Date().getTime(),
                               description: toDoItemText
                           };

                       disableAdding(true);

                       self._validationService.promiseToValidateNewItem(itemData).then(
                           function resolve(validationResult) {
                               if (validationResult.isValid) {
                                   self.emit('add', itemData);
                               } else {
                                   setError(validationResult.validationErrors.join('\n'));
                               }

                               disableAdding(false);
                           },
                           function reject(XMLHttpRequest, textStatus, errorThrown) {
                               setError(errorThrown);

                               disableAdding(false);
                           });
                   } else {
                       setError('Please enter to-do item description.');
                   }
               };

               textBoxElement.keyup(
                   function (eventArgs) {
                       var enterKey = 13;
                       if (eventArgs.keyCode === enterKey) {
                           onItemAdding();
                       }
                   }).on('input blur', setNoError);

               var buttonElement =
                   $('<input/>').prop('type', 'button')
                       .val('Add Todo Item')
                       .addClass('addItemButton')
                       .click(onItemAdding);

               containerElement.append(buttonElement, textBoxElement, errorElement);

               this._texBoxElement = textBoxElement;
         },
         
         init: function () {
             this._validationService = new JsTasks.todo.services.Validation();

             this.callParent(this, arguments);
         },
         
         clear: function () {
             this._texBoxElement.val('');             
         },
         
         focus: function () {
             this._texBoxElement.focus();
         },
     });