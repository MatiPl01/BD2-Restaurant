// Built-in modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Our modules
import { CoreModule } from '@core/core.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    // Built-in modules
    BrowserModule,

    // Our modules
    CoreModule
  ],

  // Components
  declarations: [
    AppComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
