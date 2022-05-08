import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, NavigationStart, Router } from '@angular/router'
import { VisualizationService } from "../../services/visualization.service";
import { Subscription } from 'rxjs'


@Component({
  selector: 'core-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  isHeaderVisible: boolean = false
  isToggleChecked: boolean = false
  isNavToggleVisible: boolean = true
  displayAnimation: boolean = false

  constructor(private router: Router,
              private visualizationService: VisualizationService) {
    this.router.events.forEach((event: any) => {
      if (event instanceof NavigationStart) {
        // Close mobile navbar menu if an url has changed
        visualizationService.notifyNavMenuToggle(false)
        this.isToggleChecked = false
      } else if (event instanceof NavigationEnd) {
        this.displayAnimation = this.router.url === '/'
      }
    })
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.visualizationService.headerVisibilityChangedEvent.subscribe((isVisible: boolean) => {
        this.isHeaderVisible = isVisible
      }),
      this.visualizationService.popupDisplayChangedEvent.subscribe((isDisplayed: boolean) => {
        this.isNavToggleVisible = !isDisplayed
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

  onToggle(): void {
    this.visualizationService.notifyNavMenuToggle(this.isToggleChecked)
  }

  onLogoutClick(): void {
    this.closeNavMenu()
  }

  onRouteClick(): void {
    this.closeNavMenu()
  }

  private closeNavMenu(): void {
    this.isToggleChecked = false
    this.visualizationService.notifyNavMenuToggle(this.isToggleChecked)
  }
}
