import { Directive, TemplateRef, ViewContainerRef } from "@angular/core"
import { OnInit, OnDestroy, Input } from "@angular/core"
import { AuthenticationService } from "@auth/services/authentication.service";
import { AuthorizationService } from "@auth/services/authorization.service";
import { Subscription } from "rxjs"
import { RoleEnum } from "@shared/enums/role.enum";

@Directive({
  selector: '[restrictTo]'
})
export class AuthorizationDirective implements OnInit, OnDestroy {
  @Input() restrictTo: RoleEnum[] = []
  isVisible: boolean = false

  subscriptions: Subscription[] = []

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private authenticationService: AuthenticationService,
              private authorizationService: AuthorizationService) {}

  ngOnInit() {
    // Check if the user has any of the roles specified
    this.subscriptions.push(
      this.authenticationService.userSubject.subscribe(async () => {
        if (await this.authorizationService.isAuthorized(this.restrictTo)) {
          // Display a component if the user is authorized to see this component
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        // Otherwise, remove checked component from the user view
        this.viewContainerRef.clear();
      })
    )
  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
