/**
 * @description       : Controller used by LWC to create individual Id records
 * @author            : wafulavictor@gmail.com
 * @group             : 
 * @last modified on  : 09-05-2023
 * @last modified by  : wafulavictor@gmail.com
**/
public with sharing class IndividualIdCreationController {
    // Expose the method to Lightning Components
    @AuraEnabled
    public static String createIndividualId(String citizenship, String gender, Date dateOfBirth, String name, String indIDNumber) {
        // Declare a variable to store messages
        String mesg;
        
        // Create a list to hold Id_Number_Search__c records
        List<Id_Number_Search__c> srchRecords = new List<Id_Number_Search__c>();
        
        // Query existing Individual_ID__c records with the provided ID number
        List<Individual_ID__c> idRecords = [SELECT Id, Id_Number__c FROM Individual_ID__c 
                                           WHERE Id_Number__c =: indIDNumber WITH SECURITY_ENFORCED];
        
        // If matching records are found
        if (idRecords.size() > 0) {
            // Iterate through the found records
            for (Individual_ID__c indR : idRecords) {
                // Create a new Id_Number_Search__c record
                Id_Number_Search__c searchCounter = new Id_Number_Search__c();
                searchCounter.Individual_ID__c = indR.Id;
                searchCounter.Search_Date__c = Date.Today();
                srchRecords.add(searchCounter);
            }
            // Insert the Id_Number_Search__c records
             Schema.DescribeSObjectResult res = Schema.SObjectType.Id_Number_Search__c;
            if (res.isCreateable()) {
                insert srchRecords;
            }
        }
        // If no matching records are found
        else if (idRecords.size() == 0) {
            try {
                // Create a new Individual_ID__c record
                Individual_ID__c newIndId = new Individual_ID__c();
                newIndId.Citizenship__c = citizenship;
                newIndId.Gender__c = gender;
                newIndId.Date_Of_Birth__c = dateOfBirth;
                newIndId.Name = name;
                newIndId.Id_Number__c = indIDNumber;
                
                // Insert the new Individual_ID__c record
                insert newIndId;
                
                // Create a new Id_Number_Search__c record
                Id_Number_Search__c searchCounter = new Id_Number_Search__c();
                searchCounter.Individual_ID__c = newIndId.Id;
                searchCounter.Search_Date__c = Date.Today();
                
                // Insert the Id_Number_Search__c record
                insert searchCounter;
                
                // Set success message
                mesg = 'Individual ID created successfully.';
                return mesg;
            } catch (Exception e) {
                // Set error message in case of an exception
                mesg = 'Error creating Individual ID: ' + e.getMessage();
                return mesg;
            }
        }
        
        // Return the final message (success or error)
        return mesg;
    }
}