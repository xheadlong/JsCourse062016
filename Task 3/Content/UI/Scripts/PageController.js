(function(){
  $(function(){
      // Actual import
      // I would rather not have global ToDo object but globally-namespaced one.
      // For true import in Node.js require("Js File name") style import base functionality is required. 
      var ToDoList = JsTasks.Todo.UI.List
      ToDoList.create('#leftContainer, #rightContainer', 'todoList');
    });
  // Nothing exported so far.
})();
