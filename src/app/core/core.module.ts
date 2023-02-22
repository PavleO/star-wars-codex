import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/core/interceptors/error.interceptor';
import { GlobalErrorHandlerService } from 'src/app/core/services/global-error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        MatSnackBar,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
        { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    ],
})
export class CoreModule {}
