/**
 * @description       : 
 * @author            : wafulavictor@gmail.com
 * @group             : 
 * @last modified on  : 09-05-2023
 * @last modified by  : wafulavictor@gmail.com
**/
import { LightningElement, track, api } from 'lwc';
import createIndividualId from '@salesforce/apex/IndividualIdCreationController.createIndividualId';

export default class SearchComponent extends LightningElement {
    @track idNumber = '';
    @track searchResult = '';
    @track invalidId = '';
    @track disableBtn = true;
    @track invalidYear = false;
    @track invalidMonth = false;
    @track invalidDate = false;
    @track invalidSSSS = false;
    @track invalidCitizenship = false;
    @track invalidA = false;
    @track invalidZ = false;
    @track citizenship = '';
    @track gender = '';
    @track dateOfBirth = '';
    @track name = '';
    @track message = '';
    @track indID = '';
    @track indIDNumber = '';
    @api year = '';
    @api country = 'ZA';
   

    handleIdChange(event) {

        this.idNumber = event.target.value;

        if(this.idNumber[0] == 0 && (this.idNumber[1] >= 0 && this.idNumber[1] <= 5)){

            this.year = '20'+this.idNumber[0]+this.idNumber[1];
        }
        else
        {
            this.year = '19'+this.idNumber[0]+this.idNumber[1];
        
        }

        console.log('idNumber:', this.idNumber);
        this[event.target.dataset.name] = event.target.value;
        let firstDigit = this.idNumber[0];
        let secondDigit = this.idNumber[1];
        let thirdDigit = this.idNumber[2];
        let fourthDigit = this.idNumber[3];
        let fifthDigit = this.idNumber[4];
        let sixthDigit = this.idNumber[5];
        let seventhDigit = this.idNumber[6];
        let eighthDigit = this.idNumber[7];
        let ninethDigit = this.idNumber[8];
        let tenthDigit = this.idNumber[9];
        let eleventhDigit = this.idNumber[10];
        let twelvethDigit = this.idNumber[11];
        let thirteeniethDigit = this.idNumber[12];
        if (((firstDigit >= 0 && firstDigit <=9) && ( secondDigit >= 0 && secondDigit <=9) ) ){

            if (((thirdDigit >= 0 && thirdDigit <=1) && ( fourthDigit >= 1 && fourthDigit <=2)) || (thirdDigit == 0 && ( fourthDigit >=1 && fourthDigit <=9 )) || (thirdDigit == 1 && fourthDigit == 0)){

                if (((fifthDigit >= 0 && fifthDigit <=2) && ( sixthDigit >= 1 && sixthDigit <=9)) || (fifthDigit == 3 && ( sixthDigit >=0 && sixthDigit <=1 )) || (fifthDigit == 1 && sixthDigit == 0) || (fifthDigit == 2 && sixthDigit == 0)){
            
                    if ((seventhDigit >= 0 && seventhDigit <=9) && ( eighthDigit >= 0 && eighthDigit <=9) && ( ninethDigit >=0 && ninethDigit <=9 ) && (tenthDigit >= 0 && tenthDigit <= 9) ){
                
                        if ( eleventhDigit >=0 && eleventhDigit <=1 ){
                
                            if ( twelvethDigit >=8 && twelvethDigit <=9 ){
                
                                if ( thirteeniethDigit >=0 && thirteeniethDigit <=9 && this.idNumber.length == 13){
                
                                    this.disableBtn=false;

                                    if(this.idNumber.length == 13 && this.disableBtn == false){
                                        this.invalidId = '';
                                    }
                                    
                                }else {
                                    this.disableBtn=true;
                                    this.invalidZ = true;
                                    if ((twelvethDigit != null  ) && (this.invalidZ == true) && this.idNumber.length == 13){
                                    
                                        this.searchResult = "Z Digit Is Invalid.";

                                    }
                                    else if(this.idNumber.length > 13)
                                    {
                                        this.invalidId = "Id Number Is Invalid.";
                                    }
                                    else if(this.idNumber.length == 13)
                                    {
                                        this.invalidId = '';
                                    }
                                    else{
                                        this.searchResult = '';
                                    }
                                }
                                
                            }else {
                                this.disableBtn=true;
                                this.invalidA = true;
                                if ((twelvethDigit != null  ) && (this.invalidA == true)){
                                
                                    this.searchResult = "A Digit Is Invalid.";
                                    
                                }else{
                                    this.searchResult = '';
                                }
                            }
                        }else {
                            this.disableBtn=true;
                            this.invalidCitizenship = true;
                            if ((eleventhDigit != null  ) && (this.invalidCitizenship == true)){
                            
                                this.searchResult = "Citizenship Is Invalid.";
                               
                            }else{
                                this.searchResult = '';
                            }
                        }
                        
                    }else {
                        this.disableBtn=true;
                        this.invalidSSSS = true;
                        if ((seventhDigit != null  && eighthDigit != null && ninethDigit != null  && tenthDigit != null )&& (this.invalidSSSS == true)){
                        
                            this.searchResult = "The SSSS Is Invalid.";
                            
                        }else{
                            this.searchResult = '';
                        }
                    }

                }else {
                    this.disableBtn=true;
                    this.invalidDate = true;
                    if ((fifthDigit != null  && sixthDigit != null )&& (this.invalidDate == true)){
                    
                        this.searchResult = "The Date Is Invalid.";
                        
                    }else{
                        this.searchResult = '';
                    }
                }
            }else {
                this.disableBtn=true;
                this.invalidMonth = true;
                if ((thirdDigit != null  && fourthDigit != null )&& (this.invalidMonth == true)){
                
                    this.searchResult = "The Month Of Birth Is Invalid.";
                    
                }else{
                    this.searchResult = '';
                }
            }
        
        }
        else {
            this.disableBtn=true;
            this.invalidYear = true;
            
            if ((firstDigit != null && secondDigit != null ) && (this.invalidYear == true)){
                
                this.searchResult = "The Year Of Birth Is Invalid.";
                
            }else{
                this.searchResult = '';
            }
        }
       
    }


    handleSearch() {

        this.dateOfBirth = this.year+'-'+this.idNumber[2]+this.idNumber[3]+'-'+this.idNumber[4]+this.idNumber[5];
        console.log('this.dateOfBirth:', this.dateOfBirth);

        if (this.idNumber[6] >= 0 && this.idNumber[6] <=4){
            this.gender = "Female";
        }else if(this.idNumber[6] >= 5 && this.idNumber[6] <=9){
            this.gender = "Male";
        }
    
        if(this.idNumber[10] == 0){
            this.citizenship = "Citizen";
        }else if(this.idNumber[10] == 1){
            this.citizenship = "Permanent Resident";
        }

        this.indID = Number(this.idNumber);
        
        createIndividualId({ name: this.idNumber ,dateOfBirth: this.dateOfBirth, gender: this.gender, citizenship: this.citizenship , indIDNumber: this.idNumber})
        .then(result => {
            this.message = result;
            console.log('this.message:', this.message);
            }
        )
        .catch(error => {
            this.message = 'Error creating Individual Id Record: ' + error.body.message;
            console.log('this.message:', this.message);
        }
        );
        
        this.searchResult = this.performSearch(this.idNumber);
        this.template.querySelector("c-holiday-component").buttonClick();
    }

    performSearch(id) {
        
        return `Searching for ID Number ${id}...`;

    }

    
}