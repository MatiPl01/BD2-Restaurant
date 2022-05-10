import { Component } from '@angular/core'
import { AuthService } from '@auth/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Restaurant'

  constructor(private authService: AuthService) {
    // Try to log in again the user
    this.authService.autoLogin();
  }

  onLogoutClick() { this.authService.logout(); }
}
