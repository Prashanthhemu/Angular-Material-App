import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class DataEmitterService {
    data: Object[];
    dataChange = new Subject<Object[]>();

    constructor() {
        this.dataChange.subscribe((value) => {
            this.data = value
        });
    }
    
    toggleDataChange(updateData: Object[]) {
        this.dataChange.next(updateData);
    }
}