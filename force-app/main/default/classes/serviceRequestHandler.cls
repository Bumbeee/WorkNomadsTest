public without sharing class serviceRequestHandler {
    @AuraEnabled
    public static List<Id> createServiceRequests(List<Service_Request__c> requests){
        return serviceRequestHelper.createServiceRequests(requests);
    }

    @AuraEnabled(cacheable=true)
    public static List<Service_Request__c> getServiceRequests(){
        return serviceRequestHelper.getServiceRequests();
    }
}