import { Component } from '@angular/core';
import { AdminService } from "@admin/services/admin.service";
import { PersistenceEnum } from "@shared/enums/persistence.enum";
import { Config } from "@shared/interfaces/config.interface";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html'
})
export class AdminViewComponent {
  constructor(private adminService: AdminService) {
    // TODO - remove testing code from below
    this.adminService.updateConfig({
      persistence: PersistenceEnum.NONE
    }).subscribe((config: Config) => {
      console.log(`Updated config: ${config}`);
    });
  }
}
