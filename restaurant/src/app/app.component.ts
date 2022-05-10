import { Component } from '@angular/core'
import { AuthService } from '@auth/services/auth.service'
import { VisualizationService } from '@core/services/visualization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public readonly title = 'Restaurant';

  public isMobileNavOpen: boolean = false;
  private readonly subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private visualizationService: VisualizationService) {
    // Try to log in again the user
    this.authService.autoLogin();
    
    this.subscriptions.push(
      this.visualizationService.isNavOpen.subscribe(isOpen => {
        this.isMobileNavOpen = isOpen;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected onLogoutClick(): void { 
    this.authService.logout(); 
  }
}
