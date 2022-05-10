import { NavigationEnd, NavigationStart, Router } from '@angular/router'
import { AuthService } from "@auth/services/auth.service";
import { Component, OnDestroy } from '@angular/core'
import { VisualizationService } from "@core/services/visualization.service";
import { Subscription } from 'rxjs'
import { RoleEnum } from "@shared/enums/role.enum";
import User from "@shared/models/user";


@Component({
  selector: 'core-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  public isHeaderVisible: boolean = false;
  public isToggleChecked: boolean = false;
  public isNavToggleVisible: boolean = true;
  public displayAnimation: boolean = false;
  public RoleEnum = RoleEnum;
  public user: User | null = null;

  constructor(private router: Router,
              public visualizationService: VisualizationService,
              private authService: AuthService) {
    this.router.events.forEach((event: any) => {
      if (event instanceof NavigationStart) {
        // Close mobile navbar menu if an url has changed
        visualizationService.notifyNavMenuToggle(false);
        this.isToggleChecked = false;
      } else if (event instanceof NavigationEnd) {
        this.displayAnimation = this.router.url === '/';
      }

      this.subscriptions.push(
        this.visualizationService.headerVisibilityChangedEvent.subscribe(isVisible => {
          this.isHeaderVisible = isVisible;
        }),
        this.visualizationService.popupDisplayChangedEvent.subscribe(isDisplayed => {
          this.isNavToggleVisible = !isDisplayed;
        }),
        this.authService.userSubject.subscribe(user => {
          // console.log('NEW USER', user)
          // TODO - optimize behavioral subject - IDK why this gets called so many times
          this.user = user;
        })
      )
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  onToggle(): void {
    this.visualizationService.notifyNavMenuToggle(this.isToggleChecked);
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.closeNavMenu();
  }

  onRouteClick(): void {
    this.closeNavMenu();
  }

  private closeNavMenu(): void {
    this.isToggleChecked = false;
    this.visualizationService.notifyNavMenuToggle(this.isToggleChecked);
  }
}
