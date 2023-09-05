/**
 * @description       : 
 * @author            : wafulavictor@gmail.com
 * @group             : 
 * @last modified on  : 09-05-2023
 * @last modified by  : wafulavictor@gmail.com
**/
import { LightningElement, api, track } from 'lwc';
import getHolidayData from '@salesforce/apex/HolidayAPIController.getHolidayData';

export default class HolidayComponent extends LightningElement {
    @api year;
    @api country;
    holidayData;
    @track holidayRecords;

    handleyearChange(event){
        this.year = event.target.value;
    }
    @api
    buttonClick() {
        
        getHolidayData({year: this.year, country: this.country})
        .then((Response) => {
            
            this.holidayData = JSON.parse(Response);
            let dataObject = this.holidayData;
            this.holidayRecords = dataObject.response.holidays;
        }).catch((error) => {
            console.log('Error fetching : ' + JSON.stringify(err));
        });

    }
   
}
