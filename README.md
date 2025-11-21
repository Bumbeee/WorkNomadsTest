# Senior Salesforce Engineer – Take-Home Assessment

## Installation and configuration:

1. Make sure you have org authorized, if not run the following command:
   ```bash
    sf org login web --alias orgAlias
   ```
2. Run the following command to install solution:
   ```bash
    sf deploy metadata -x manifest/package.xml --target-org orgAlias --test-level RunLocalTests
   ```
💡 **Note:** After deployment assign Service Request Tab Access permission set to your user 

## Usage:
1. Open App Launcher
2. Search for "Service Request Form" and open it
3. Click "New" to create a new record
4. After creation datatable should be updated with newly created record

## General Project Description:

### Lightning Web Components:
1. ***serviceRequestForm***
   Service Request Form component provides a user interface to create Service Requests and display recent 5 records. Component is designed with Salesforce Lightning Design System best practices

   **Features:**
   1. Show recent Service Requests using Lightning Datatable
   2. Open a modal to create a new Service Request
   3. Notify user about success process results or issues 
   4. Handle data loading with loader 
   5. Localize labels with Custom Labels


2. ***createServiceRequestModal***
   Create Service Request Modal component allows users to create new Service Requests in Salesforce. Component is designed with Salesforce Lightning Design System best practices

   **Features:**
   1. Contains required fields and functionality to create new Service Request 
   2. Dynamically fetches Priority field picklist values
   3. Notify users on picklist fetch errors
   4. Provides required validation for input fields

### Apex Classes: 
1. **serviceRequestHandler**
   Service Request Handler Apex class provides a LWC controller for managing Service Request records. This class deligates the actual business logic to the serviceRequestHelper Apex class

   **Methods:**
   1. ***createServiceRequests(List<Service_Request__c> requests)*** - Accepts list of Service_Request__c records and creates them with helper class, returns newly created record IDs
   2. ***getServiceRequests()*** - Retrieves a list of 5 recent Service_Request__c records with helper class
   
2. **serviceRequestHelper**
   Service Request Helper Apex class contains core business logic for managing Service_Request__c records. Separation of Handler and Helper classes makes Service Request Helper Apex class reusable

   **Methods:**
   1. ***createServiceRequests(List<Service_Request__c> requests)*** - Accepts list of Service_Request__c records and insert them with Database.insert (AllOrNothing=false). Provides possible errors and exceptions handling. Returns newly created record IDs
   2. ***getServiceRequests()*** - Retrieves a list of 5 recent Service_Request__c records including all required fields

### Agentforce task solution
**Create an AI Action that enables an agent to resolve a request with AI-generated notes**

We can setup a button on record page side called "AI Resolution" which can help resolve request
1. Open Setup -> Object Manager -> Service Request -> Buttons, Links and Actions
2. Click New Action
3. Action Type = Agent Quick Action
4. User Utterance = prompt with required action f.e. "Resolve request based on record information and populate summary to Resolution Notes field"
5. Save and add action to page layout

Now manager can click the newly created button and resolve Request much easier and faster with Copylot