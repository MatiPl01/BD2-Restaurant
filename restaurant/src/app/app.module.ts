// Built-in modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

// Our modules
import { CoreModule } from '@core/core.module';
import { SharedModule } from "@shared/shared.module";

// Components
import { AppComponent } from './app.component';

// Interceptor Services
import { AuthInterceptor } from '@auth/interceptors/auth-interceptor.service';
import { HttpRequestInterceptor } from "@core/interceptors/http-request.interceptor";

@NgModule({
  imports: [
    // Built-in modules
    BrowserModule,
    HttpClientModule,

    // Our modules
    CoreModule,
    SharedModule
  ],

  // Components
  declarations: [
    AppComponent
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
