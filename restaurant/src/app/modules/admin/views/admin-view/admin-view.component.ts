import { Component } from '@angular/core';
import { AdminService } from "@admin/services/admin.service";

@Component({
  selector: 'admin-view',
  templateUrl: './admin-view.component.html'
})
export class AdminViewComponent {
  constructor(private adminService: AdminService) {}
}
