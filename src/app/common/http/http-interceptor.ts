import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError, finalize, map} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {SecurityService} from "../security/security.service";
import {Router} from "@angular/router";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private notification: NzNotificationService, private service: SecurityService, private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = request.headers;
    headers = request.headers.set('Content-Type', 'application/json');
    // const access_token = JSON.parse(<string>sessionStorage.getItem('token'))?.access_token;
    // if (access_token) {
    //   headers = request.headers.set('Authorization', `Bearer ${access_token}`);
    // }
    request = request.clone({headers});
    return next.handle(request)
      .pipe(
        map((event: any) => {
          if (event instanceof HttpResponse) {
            const responseBody = event.body;
            if (responseBody?.responseCode >= 0) {
              if (responseBody.responseCode === 0) {
                return event.clone({body: responseBody.response});
              }
              if (responseBody?.responseCode === 401 || responseBody?.responseCode === 403) {
                this.router.navigate(['access', 'signin']).then(r => {});
                this.service.clearUser()
              }
              throw responseBody;
            }
          }

          return event;
        }),
        catchError((error: any) => {
          if (error?.errorDetail || error?.message) {
            this.notification.error('خطا', error.errorDetail?.message ? error.errorDetail?.message : error?.message);
          }
          return throwError(error);
        }),
        finalize(() => {
          // this.ui.showLoading(false);
        })
      );
  }
}

