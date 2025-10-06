import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, take, throwError } from 'rxjs';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private readonly alerts = inject(TuiAlertService);

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response: HttpErrorResponse) => {
        if ([403, 502, 503].includes(response.status)) {
          this.alerts
            .open(response.error.message, {
              label: 'Ошибка',
              appearance: 'negative',
              autoClose: 5000,
            })
            .pipe(take(1))
            .subscribe();

          return of(response.error);
        }

        this.alerts
          .open('Произошла ошибка, повторите позже', {
            label: 'Ошибка',
            appearance: 'negative',
            autoClose: 5000,
          })
          .pipe(take(1))
          .subscribe();

        return throwError(() => response);
      }),
    );
  }
}
