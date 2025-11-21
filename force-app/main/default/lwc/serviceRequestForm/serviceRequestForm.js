import { LightningElement, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getServiceRequests from '@salesforce/apex/serviceRequestHandler.getServiceRequests'
import createServiceRequests from '@salesforce/apex/serviceRequestHandler.createServiceRequests'

import { COLUMNS, LABELS } from './serviceRequestFormConstants'

export default class ServiceRequestForm extends LightningElement {
    isModalOpened = false;
    isLoaded = false;

    @track requestsList = [];
    @track columns = COLUMNS;
    requestsListResult;

    labels = LABELS
    

    @wire(getServiceRequests)
    requestsList(result) {
        this.requestsListResult = result;
        if (result.data) {
            this.requestsList = result.data;
        } else if (result.error) {
            console.error(result.error);
            this.showToast(this.labels.ErrorLabel, this.labels.FetchRequestsErrorLabel, this.labels.ErrorLabel);
        }
        this.isLoaded = true
    }

    saveRecord(recordsToSave) {
        createServiceRequests({requests: recordsToSave})
            .then(result => {
                refreshApex(this.requestsListResult)
                const idsString = Array.isArray(result) ? result.join(', ') : result;
                const message = `${this.labels.RecordSavedSuccessLabel} ${idsString}`;
                this.showToast(this.labels.SuccessLabel, message, this.labels.SuccessLabel);
            })
            .catch(error => {
                this.showToast(this.labels.ErrorLabel, this.labels.SaveWentWrongLabel, this.labels.ErrorLabel);
            })
            .finally(() => {
                this.isLoaded = true
            })
    }

    handleNewServiceRequest() {
        this.isModalOpened = true;
    }

    handleClose() {
        this.isModalOpened = false;
    }

    handleSave(event) {
        const recordsToSave = [ { ...event.detail }]
        this.saveRecord(recordsToSave)
        this.isModalOpened = false;
        this.isLoaded = false
    }

    get isRequestsListEmpty() {
      return this.requestsList == undefined || this.requestsList.length == 0
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        )
    }
}