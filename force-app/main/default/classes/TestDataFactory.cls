public class TestDataFactory {

    // Static method to create an Individual_ID__c record
    public static Individual_ID__c createIndividualId(String citizenship, String gender, Date dateOfBirth, String name, String indIDNumber) {
        Individual_ID__c newIndId = new Individual_ID__c();
        newIndId.Citizenship__c = citizenship;
        newIndId.Gender__c = gender;
        newIndId.Date_Of_Birth__c = dateOfBirth;
        newIndId.Name = name;
        newIndId.Id_Number__c = indIDNumber;

        // Insert the new Individual_ID__c record
        insert newIndId;

        return newIndId;
    }
}