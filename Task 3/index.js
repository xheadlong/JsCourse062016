var express = require('express');
var bodyParser = require('body-parser');
var toDo = require('./lib/Todo');

var app = express();

app.use(express.static(__dirname + '/Content'));

app.post('/validateNewTodoItem', bodyParser.json(), 
         function (req, res, next) {           
            var newItem = req.body;

            if (null == newItem)
              return next(new Error('Improperly posed request: no todo item information provided for validation.'));
            
            var validationResult = toDo.validateNewItem(newItem);
            // Echoing id for correlation purpose
            validationResult.id = newItem.id;
            res.json(validationResult);           
          });

app.get('*',function (req, res) {
        res.redirect('/Task3.html');
    });

// Keep the last one 
app.use(function(err, req, res, next) {
  console.error(err.stack);

  res.status(500)
     .send('Internal server error.');
});

app.listen(8080, function () {
  console.log('ToDo application listening on port 8080...');
});
