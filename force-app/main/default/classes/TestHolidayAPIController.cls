@isTest
public class TestHolidayAPIController {

    // Mock the HTTP callout response
    public class MockHttpResponseGenerator implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            // Create a mock response with a 200 status code and sample JSON data
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('{"name": "New Year", "date": "2023-01-01"}');
            res.setStatusCode(200);
            return res;
        }
        
    }
    
    public class MockHttpResponseGenerator500 implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            // Create a mock response with a 500 status code and sample JSON data
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('{"name": "New Year", "date": "2023-01-01"}');
            res.setStatusCode(500);
            return res;
        } 
    }

    // Test the getHolidayData method with a successful HTTP callout
    @isTest
    public static void testGetHolidayDataSuccess() {
        // Set up test data
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());

        // Call the getHolidayData method
        String holidayData = HolidayAPIController.getHolidayData('2023', 'US');

        // Verify that the response contains expected holiday data
        System.assertEquals('{"name": "New Year", "date": "2023-01-01"}', holidayData);
    }

    // Test the getHolidayData method with an unsuccessful HTTP callout
    @isTest
    public static void testGetHolidayDataError() {
        // Set up a mock response with a non-200 status code
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator500());

        try {
            // Call the getHolidayData method, which should throw an exception
            String holidayData = HolidayAPIController.getHolidayData('null', 'US');
        } catch (CalloutException e) {
            // Verify that the exception message contains the error status code
            System.debug('message: '+e.getMessage());
            System.assert(e.getMessage().contains('Error calling the holiday API'));
        }
    }
}