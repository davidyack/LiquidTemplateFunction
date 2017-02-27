Liquid = require("liquid-node")
var engine = new Liquid.Engine

module.exports = function (context, data) {
    
    if('template' in data ) {
                
        engine
            .parseAndRender(data.template, data)
            .then(function(result) {
                 context.log(result);
                     context.res = {
                        body:  result
                    };
                    context.done();
            
                 },function(error){context.log(error)});             
    }
    else {
        context.res = {
            status: 400,
            body: { error: 'Please pass template properties in the input object'}
        };
        context.done();
    }    
}
