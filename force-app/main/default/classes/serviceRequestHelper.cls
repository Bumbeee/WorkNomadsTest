public without sharing class serviceRequestHelper {
    public static List<Id> createServiceRequests(List<Service_Request__c> requests){
        try {
            List<Id> requestsId = new List<Id>();

            if (requests == null || requests.isEmpty()) {
                throw new ServiceRequestException('No requests to create');
            } 
            Database.SaveResult[] results = Database.insert(requests, false);
            for (Database.SaveResult sr : results) {
                if (!sr.isSuccess()) {
                    Database.Error[] errs = sr.getErrors();
                    String msg = (errs != null && errs.size() > 0) ? errs[0].getMessage() : 'Unknown error during insert';
                    throw new ServiceRequestException('Failed to create one or more Service Requests: ' + msg);
                } else {
                    requestsId.add(sr.getId());
                }
            }
            return requestsId;
        } catch (Exception e) {
            throw new ServiceRequestException('Unexpected error creating Service Requests: ' + e.getMessage());
        }
    }

    public static List<Service_Request__c> getServiceRequests(){
        return [
            SELECT Id,
                Name,
                Customer_Email__c,
                Status__c,
                Description__c,
                Priority__c,
                Resolution_Notes__c,
                CreatedDate
            FROM Service_Request__c
            ORDER BY CreatedDate DESC
            LIMIT 5
        ];
    }

    public class ServiceRequestException extends Exception {}
}