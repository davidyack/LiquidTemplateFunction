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

To give you a scenario where we used something similar, we wanted to have a Flow triggered on a time submission (Think time sheets stored in Dynamics 365) and then to have it email a list of the time reported.  
Triggering from flow is easy on the record create, querying the child records is also easy.  Including a nice table of child records in an email...now that's tough without some help.  So our help here was to use the azure Function 
and have it generate the e-mail content using a Liquid Template.
In the following example we have the following actions
 - When a record is created - this triggers the flow based on creation of a new time submission
 - Delay - We delay because it allows the time entries to be added by the app
 - ComposeHTML - This is a compose step, that we use to make it easier to build the html template in line - basically just made it easier to maintain, an enhancement would be to retrieve this template from Dynamics 365 or another external source
 - GetEntries - this does the query for the child records using the id from the record that triggered the Flow
 - BuildHTML  - This is an Http post to our Azure Function passing the tempalte form the ComposeHTML along with the records from the GetEntries 
 - Send an Email - this uses Office 365 to send an email, the Body is bound to the BuildHTML Body to get the HTML generated.  We also had to explicitly set the content type to HTML

![example Flow](/ExampleImages/ExampleFlow.jpg)