// Built-in modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Our modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core/core.module';

// Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './src/app/modules/core/components/nav-bar/nav-bar.component';
import { FooterComponent } from './src/app/modules/core/components/footer/footer.component';

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
    AppComponent,
    NavBarComponent,
    FooterComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
