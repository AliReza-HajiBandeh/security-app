import { NgModule } from '@angular/core';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterUtilsModule } from '@js-sugar/angular';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherIconsModule } from './feather-icons.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AppHttpInterceptor } from './common/http/http-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpServiceBaseUrl, SecurityModule, UserIdentityStore } from '@rbcorp/ui-infra';
import {AuthModule} from "./workspace/components/auth/auth.module";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FeatherIconsModule,
        SecurityModule,
        NzButtonModule,
        NzNotificationModule,
        AppRoutingModule,
        RouterUtilsModule.forRoot({
            document: {
                setTitle: true
            }
        }),
        AuthModule
    ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    // {provide: APP_BASE_HREF, useValue: '/security/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
