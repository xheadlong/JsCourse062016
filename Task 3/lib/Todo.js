module.exports = {
    // Returns js object indicating validation status
    // isValid: boolean
    // validationErrors: null when isValid is true and an array of strings otherwise
    // For now checks if description is provided and is not longer than 50 chars.    
    validateNewItem : function(item){
          var errors = [];
          var isValid = true;

          if(!!item.description){            
            if(typeof item.description === 'string'){
               if(item.description.length > 50){
                  errors.push('Description was expected to be not longer than 50 characters.');
                  isValid = false;    
               }
            } else{
              errors.push('Description was expected to be a string.');
              isValid = false;
            }
          } else{
            errors.push('Description was not initialized.');
            isValid = false;
          }
          
          var result = {
            isValid: isValid
          };

          if(!isValid){
            result.validationErrors = errors;
          }
          
          return result;
    }
 }
