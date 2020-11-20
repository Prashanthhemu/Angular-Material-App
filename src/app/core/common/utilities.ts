import { Injectable } from "@angular/core";

@Injectable()
export class Utilities {

    public hasError(error) {
        return error.error.errorMessage;
    }
}
