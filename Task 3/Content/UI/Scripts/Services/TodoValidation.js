var JsTasks = JsTasks || {};
JsTasks.Todo = JsTasks.Todo || {};
JsTasks.Todo.Services = JsTasks.Todo.Services || {};

JsTasks.Todo.Services.Validation = 
    (function(){        
        var moduleExport = 
            {        
              promiseToValidateNewItem: 
                function(item){
                  var promise = 
                    $.ajax({
                        url: '/validateNewTodoItem', 
                        type: 'POST', 
                        contentType: 'application/json', 
                        data: JSON.stringify(item)
                        });
                  return promise;
                }
          };

        return moduleExport;
    })();
