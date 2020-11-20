import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.css'],
})
export class DropDownComponent {
    @Input() dropDownList: object[];
    @Input() defaultValue: string;
    @Output() dropDownValueChange = new EventEmitter();

    filterChange(event) {
        this.dropDownValueChange.emit(event);
    }
}