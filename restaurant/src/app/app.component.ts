import { Component } from '@angular/core'
import { AuthenticationService } from '@auth/services/authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Restaurant'

  constructor(private authService: AuthenticationService) {
    // Try to login again the user
    this.authService.autoLogin();
  }

  onLogoutClick() { this.authService.logout(); }
}
