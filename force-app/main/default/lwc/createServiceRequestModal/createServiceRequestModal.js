import { LightningElement, wire, track } from 'lwc';
import { getObjectInfo, getPicklistValues } from  'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import SERVICE_REQUEST_OBJECT from '@salesforce/schema/Service_Request__c';

import PRIORITY_FIELD from '@salesforce/schema/Service_Request__c.Priority__c';

import { LABELS } from './createServiceRequestModalConstants'

export default class CreateServiceRequestModal extends LightningElement {

  labels = LABELS;

  @track priorityOptions = [];
  isLoaded = false

  @track request = {
    Customer_Email__c: '',
    Description__c: '',
    Priority__c: ''
  };

  @wire(getObjectInfo, { objectApiName: SERVICE_REQUEST_OBJECT })
  objectInfo;

  @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: PRIORITY_FIELD })
  wiredPicklist({data, error}) {
    if (data) {
      this.priorityOptions = data.values;
    } else if (error) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: this.labels.ErrorLabel,
          message: this.labels.FetchPicklistValuesErrorLabel,
          variant: this.labels.ErrorLabel
        }))
    }
    this.isLoaded = true
  }

  handleEmailChange(event) {
    // this.request = {
    //   ...this.request,
    //   Customer_Email__c: event.target.value
    // }
    this.request.Customer_Email__c = event.target.value
  }

  handleDescriptionChange(event) {
    // this.request = {
    //   ...this.request,
    //   Description__c: event.target.value
    // }
    this.request.Description__c = event.target.value
  }

  handlePriorityChange(event) {
    //  this.request = {
    //   ...this.request,
    //   Priority__c: event.target.value
    // }
    this.request.Priority__c = event.target.value
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  handleSave() {
    const customEvent = new CustomEvent("save", { detail: this.request });
    this.dispatchEvent(customEvent);
  }
}