
export interface UlosottovirastoModel {
    ulosottovirastoId: number;
    dataFeedId: number;
    entityName: string;
    certificate: string;
    customerId: string;
    loanGroupName: string;
    customerPoc: string
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
    ulosottovirastoDetails: Object[];
}