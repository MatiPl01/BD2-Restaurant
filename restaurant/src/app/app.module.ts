// Built-in modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Our modules
import { CoreModule } from './modules/core/core.module';

// Components
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    // Built-in modules
    BrowserModule,
    HttpClientModule,

    // Our modules
    CoreModule
  ],

  // Components
  declarations: [
    AppComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
