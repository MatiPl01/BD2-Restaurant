// Built-in modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Our modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    // Built-in modules
    BrowserModule,
    HttpClientModule,
    
    // Our modules
    AppRoutingModule,
    CoreModule
  ],

  // Components
  declarations: [
    AppComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
