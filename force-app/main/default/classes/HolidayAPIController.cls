/**
 * @description       : Controller to call the calendarifi API
 * @author            : wafulavictor@gmail.com
 * @group             : 
 * @last modified on  : 09-05-2023
 * @last modified by  : wafulavictor@gmail.com
**/
public with sharing class HolidayAPIController {
    // Expose the method to Lightning Components
    @AuraEnabled
    public static String getHolidayData(String year, String country) {
        // Retrieve the API key from Custom Metadata Type (API_Key__mdt)
        API_Key__mdt apis = API_Key__mdt.getInstance('Calendarific_API_Key');
        
        // Construct the API endpoint URL with the provided year and country
        String endpoint = 'callout:CalendarificNamedCredential/holidays?api_key=' + apis.Key__c + '&year=' + year + '&country=' + country;

        // Create an HTTP request object
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        
        // Send the HTTP request and receive the response
        HttpResponse response = new Http().send(request);
        
        // Check if the response status code is 200 (OK)
        if (response.getStatusCode() == 200) {
            // Return the response body containing holiday data
            return response.getBody();
        } else {
            // Throw a CalloutException with an error message in case of an error
            throw new CalloutException('Error calling the holiday API: ' + response.getStatus());
        }
    }
}