@IsTest
public class serviceRequestHandlerTest {
    
    private static List<Service_Request__c> createRequests(Integer count) {
        List<Service_Request__c> requests = new List<Service_Request__c>();
        for(Integer i = 0; i < count; i++) {
            Service_Request__c request = new Service_Request__c(
            	Customer_Email__c = 'test.test@test.test' + i
            );
            requests.add(request);
        }
        return requests;
    }
    
	@TestSetup
    private static void setup() {
        List<Service_Request__c> requests = createRequests(10);
        insert requests;
    }
    
    @IsTest
    private static void createServiceRequests_Success() {
        List<Service_Request__c> requests = createRequests(100);
        
        List<Id> result = serviceRequestHandler.createServiceRequests(requests);
        
        Assert.areEqual(100, result.size(), 'Should return 100 IDs');
        for (Id resId : result) {
            Assert.areNotEqual(resId, null, 'Id should not be null');
        }
    }
    
    @IsTest
    private static void createServiceRequests_Exception() {
        List<Service_Request__c> requests = new List<Service_Request__c>{
            new Service_Request__c()
        };
        
        try {
            serviceRequestHandler.createServiceRequests(requests);
            Assert.fail('Exception should be thrown');
        } catch (serviceRequestHelper.ServiceRequestException e) {
            Assert.isTrue(
                e.getMessage().contains('Failed to create one or more Service Requests'), 
                'Exception message should be thrown'
            );
        }
    }
    
    @IsTest
    private static void createServiceRequests_EmptyList() {
        List<Service_Request__c> requests = new List<Service_Request__c>();
        
        try {
            serviceRequestHandler.createServiceRequests(requests);
            Assert.fail('Exception should be thrown');
        } catch (serviceRequestHelper.ServiceRequestException e) {
            Assert.isTrue(
                e.getMessage().contains('No requests to create'), 
                'Exception message should be thrown'
            );
        }
    }
    
    @IsTest
    private static void getServiceRequests() {
        List<Service_Request__c> requests = serviceRequestHandler.getServiceRequests();
        Assert.isFalse(requests.size() == 0 || requests.isEmpty(), 'List should not be empty');
        Assert.areEqual(5, requests.size(), 'Method should return 5 records');
    }
}