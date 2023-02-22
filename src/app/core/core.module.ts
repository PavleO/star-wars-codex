import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/core/interceptors/error.interceptor';
import { GlobalErrorHandlerService } from 'src/app/core/services/global-error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from 'src/app/core/header/header.component';

@NgModule({
    declarations: [HeaderComponent],
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
    exports: [HeaderComponent],
})
export class CoreModule {}
