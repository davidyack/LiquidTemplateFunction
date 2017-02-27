# Azure Function to generate Liquid Templates

This is a simple Azure function that can be called to generate HTML from a Microsoft Flow using Liquid templates 

The function expects to be posted to with JSON that looks like the following

{
    "template": "<h1>Hello {{record.name}}</h1>",
    "record": "{ \"name\": \"Dave\" }"
}

template is required but any other property is optional based on your needs.  For example, you could include a contacts property with an array of contact records and then use the template to generate a list 

The body of the response is the HTML, making it easy to consume from Microsoft Flow

Once you've created an Azure function and setup the function to call it from Microsoft Flow you would just use the HTTP action

To configure the action in Flow, you would simply set the Uri to the URL for your Azure Function, and the Body to a template similar to the above example

Here is an example of what it would look like:

![example http](/ExampleImages/ExampleHttpAction.jpg)
