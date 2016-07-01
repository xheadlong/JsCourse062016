N13.define('JsTasks.todo.services.Validation',
    {
        promiseToValidateNewItem: function (item) {
            var promise =
            $.ajax({
                url: '/validateNewTodoItem',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(item)
            });
            return promise;
        }
    });
