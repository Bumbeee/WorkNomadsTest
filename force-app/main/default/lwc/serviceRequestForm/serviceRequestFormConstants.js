import TitleLabel from '@salesforce/label/c.SRManagerAppTitle';
import NewLabel from '@salesforce/label/c.NewLabel';
import RecentServiceRequestsLabel from '@salesforce/label/c.RecentServiceRequestsLabel';
import NoServiceRequestsLabel from '@salesforce/label/c.NoServiceRequestsLabel';
import ErrorLabel from '@salesforce/label/c.ErrorLabel';
import FetchRequestsErrorLabel from '@salesforce/label/c.FetchRequestsErrorLabel';
import SaveWentWrongLabel from '@salesforce/label/c.SaveWentWrongLabel';
import SuccessLabel from '@salesforce/label/c.SuccessLabel';
import RecordSavedSuccessLabel from '@salesforce/label/c.RecordSavedSuccessLabel';
import RequestNameLabel from '@salesforce/label/c.RequestNameLabel';
import CustomerEmailLabel from '@salesforce/label/c.CustomerEmailLabel';
import StatusLabel from '@salesforce/label/c.StatusLabel';
import PriorityLabel from '@salesforce/label/c.PriorityLabel';
import CreatedDateLabel from '@salesforce/label/c.CreatedDateLabel';
import DescriptionLabel from '@salesforce/label/c.DescriptionLabel';
import ResolutionNotesLabel from '@salesforce/label/c.ResolutionNotesLabel';

export const LABELS = {
    TitleLabel,
    NewLabel,
    RecentServiceRequestsLabel,
    NoServiceRequestsLabel,
    ErrorLabel,
    FetchRequestsErrorLabel,
    SaveWentWrongLabel,
    SuccessLabel,
    RecordSavedSuccessLabel,
    RequestNameLabel,
    CustomerEmailLabel,
    StatusLabel,
    PriorityLabel,
    CreatedDateLabel,
    DescriptionLabel,
    ResolutionNotesLabel
};


export const COLUMNS = [{
        label: RequestNameLabel,
        fieldName: "Name",
        type: "text",
      },
      {
        label: CustomerEmailLabel,
        fieldName: "Customer_Email__c",
        type: "email",
      },
      {
        label: StatusLabel,
        fieldName: "Status__c",
        type: "text",
      },
      {
        label: PriorityLabel,
        fieldName: "Priority__c",
        type: "text"
      },
      {
        label: CreatedDateLabel,
        fieldName: "CreatedDate",
        type: "date",
      },
      {
        label: DescriptionLabel,
        fieldName: "Description__c",
        type: "text",
      },
      {
        label: ResolutionNotesLabel,
        fieldName: "Resolution_Notes__c",
        type: "text",
      }
    ];
