@isTest
public class IndividualIdCreationControllerTest {

    @isTest
    static void testCreateIndividualId() {
        // Test data
        String citizenship = 'Citizen';
        String gender = 'Male';
        Date dateOfBirth = Date.newInstance(1990, 1, 1);
        String name = 'John Doe';
        String indIDNumber = '1204267890188';

        // Test scenario where there are no existing records
        Test.startTest();
        String result = IndividualIdCreationController.createIndividualId(citizenship, gender, dateOfBirth, name, indIDNumber);
        Test.stopTest();

        // Assert that the result message indicates success
        System.assertEquals('Individual ID created successfully.', result);
        
        

    }
    @isTest
    static void testAlreadyCreatedIndividualId() {
        // Test data
        String citizenship = 'Citizen';
        String gender = 'Male';
        Date dateOfBirth = Date.newInstance(1990, 1, 1);
        String name = 'John Doe';
        String indIDNumber = '1204267890188';

        // Test scenario where there are existing records
       
        Test.startTest();
        // Create an Individual_ID__c record using the factory class
		Individual_ID__c newIndId = TestDataFactory.createIndividualId(citizenship, gender, dateOfBirth, name, indIDNumber);

		// The newIndId variable now holds the created record
        String result = IndividualIdCreationController.createIndividualId(citizenship, gender, dateOfBirth, name, indIDNumber);
        Test.stopTest();

        // Assert that the result message indicates success
        System.assertEquals(null, result);

    }
}