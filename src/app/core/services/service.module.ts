import { NgModule } from "@angular/core";
import { TokenAuthenticationService } from "./token-authentication.service";
import { NotificationPopUpService } from "./notification-popup.service";
import { UserManagementService } from "./user-management.service";
import { LoginService } from "./login.service";
import { ConfirmDialogService } from "./confirm-dialog.service";
import { DataFeedTypeService } from "./data-feed-type.service";
import { DataFeedLogService } from "./data-feed-log.service";
import { UlosottovirstaService } from "./ulosottovirasta.service";
import { DataEmitterService } from "./data-emitter.service";


@NgModule({
    declarations: [],
    providers: [
        LoginService,
        TokenAuthenticationService,
        UserManagementService,
        NotificationPopUpService,
        ConfirmDialogService,
        DataFeedTypeService,
        DataFeedLogService,
        UlosottovirstaService,
        DataEmitterService
    ]
})
export class ServicesModule { }