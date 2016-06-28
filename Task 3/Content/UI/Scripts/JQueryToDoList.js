// It is rather dangerous to create modules directly in global namespace
// Using YUI version of module not to write another lib function for loading module js files and sanboxing modules to get their returned object to be able to do: var ToDo = Import('ToDoUI.js') 
 
// Replace with lib function 
var JsTasks = JsTasks || {};
JsTasks.Todo = JsTasks.Todo || {};
JsTasks.Todo.UI = JsTasks.Todo.UI || {};

JsTasks.Todo.UI.List = 
    (function(){
        var validationService = JsTasks.Todo.Services.Validation;

        var normalizeCssClasses = function (cssClasses){
            var tagCssClasses = [];
            if(Array.isArray(cssClasses)){
                tagCssClasses = cssClasses;
            } else if(typeof(cssClasses) === 'string'){
                tagCssClasses = cssClasses.split(',');
            }

            for(var index = 0; index < tagCssClasses.length; index++){
                var currentClass = tagCssClasses[index];
                if(typeof(currentClass) !== 'string'){
                    throw new Error("Css class names were expected to be strings.");
                } else{
                    if(currentClass.match('/s')){
                        throw new Error("Css class names must not contain spaces.");
                    }
                }
            }

            return tagCssClasses;
        };

        var createUi = function (containersSelector, tagCssClasses){
            $(containersSelector).each(
              function (index, containerElement){            
                var rootElement =
                    $('<div/>').addClass(tagCssClasses.join(' '))
                               .addClass('toDoControlContainer');

                var listElement = $('<ul/>');

                var listContainerElement =
                    $('<div/>').addClass('listContainer');

                listContainerElement.append(listElement);

                var errorElement =
                    $('<div/>').addClass('addItemError')
                               .hide();

                var textBoxElement =
                    $('<input/>').prop('type', 'text')                                 
                                 .addClass('newItemDescriptionTextBox');
                
                var addItemToList = function(itemData){    
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
                                                listElement[0].removeChild(listItemElement[0]);
                                            });

                    listItemContainerElement.append(textElement, deleteButtonElement);                            
                    listItemElement.append(listItemContainerElement);
                    listElement.append(listItemElement);

                    textBoxElement.val('')
                                  .focus(); 

                  };

                var disableAdding = function(disable){
                    textBoxElement.prop( "disabled", disable );
                    buttonElement.prop( "disabled", disable );
                  };

                var setError = function(errorMessage){
                    errorElement.text(errorMessage)
                                .show();
                    textBoxElement.addClass('validationError')
                                  .prop('title', errorMessage)
                                  .focus();
                };

                var setNoError = function(){
                    textBoxElement.removeClass('validationError')
                                  .prop('title', '');
                    errorElement.hide()
                                .text('');
                  }; 

                var onItemAdding = function(){
                    var toDoItemText = textBoxElement.val().trim();            

                    if(toDoItemText.length > 0){
                      var itemData = 
                        { 
                          id : new Date().getTime(),
                          description : toDoItemText
                        };

                        disableAdding(true);
                        
                        validationService.promiseToValidateNewItem(itemData).then(
                          function resolve(validationResult){
                            if(validationResult.isValid){
                              addItemToList(itemData);
                            } else{
                               setError(validationResult.validationErrors.join('\n'));
                            }
                            
                            disableAdding(false);
                          }, 
                          function reject(XMLHttpRequest, textStatus, errorThrown){
                            setError(errorThrown);

                            disableAdding(false);
                          });
                    } else {
                        setError('Please enter to-do item description.');                                                
                    }
                };

                textBoxElement.keyup(
                    function(eventArgs){
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
                
                rootElement.append(buttonElement, textBoxElement, errorElement, 
                                   listContainerElement);
                $(containerElement).append(rootElement);
              });
        }

        var moduleExport = 
            {        
              create: function(containersSelector, markerCssClasses){
                        if(typeof containersSelector !== 'string'){
                            throw new Error('The "containersSelector" was expected to be initialized.');
                        }                     

                        var normalizedCssClasses = normalizeCssClasses(markerCssClasses);
                        createUi(containersSelector, normalizedCssClasses);
                     }
          };

        return moduleExport;
    })();
