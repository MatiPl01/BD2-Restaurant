import { Directive, TemplateRef, ViewContainerRef } from "@angular/core"
import { OnInit, OnDestroy, Input } from "@angular/core"
import { AuthService } from "@auth/services/auth.service";
import { Subscription } from "rxjs"
import { RoleEnum } from "@shared/enums/role.enum";
import User from "@shared/models/user";

@Directive({
  selector: '[restrictTo]'
})
export class AuthorizationDirective implements OnInit, OnDestroy {
  @Input('restrictTo') allowedRoles: RoleEnum[] = []
  isVisible: boolean = false

  private subscription!: Subscription;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private authService: AuthService) {
  }

  ngOnInit() {
    // Check if the user has any of the roles specified
    this.subscription = this.authService.userSubject.subscribe((user: User | null) => {
      if (!user) return;
      const allowedRolesSet = new Set(this.allowedRoles);

      for (const role of user.roles) {
        if (allowedRolesSet.has(role)) {
          // Display a component if the user is authorized to see this component
          this.viewContainerRef.createEmbeddedView(this.templateRef);
          return;
        }
      }

      // Otherwise, remove checked component from the user view
      this.viewContainerRef.clear();
    })
  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
