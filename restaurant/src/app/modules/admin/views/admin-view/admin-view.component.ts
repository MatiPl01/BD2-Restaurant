// TODO - Refactor this file

import {Component} from '@angular/core';
import {AdminService} from "@admin/services/admin.service";
import {PersistenceEnum} from '@shared/enums/persistence.enum';
import {AuthService} from '@auth/services/auth.service';
import {RoleEnum} from '@shared/enums/role.enum';
import User from "@shared/models/user.model";
import UserData from "@shared/interfaces/user.interface";
import {CurrencyEnum} from "@shared/enums/currency.enum";

@Component({
  selector: 'admin-view',
  templateUrl: './admin-view.component.html'
})
export class AdminViewComponent {
  public PersistenceEnum = PersistenceEnum
  public CurrencyEnum = CurrencyEnum
  public RoleEnum = RoleEnum
  public UserList: UserData[] = []

  constructor(private adminService: AdminService, private authService: AuthService) {
    this.getUserList(1, 20)
  }

  updateMainCurrency(newCurrency:CurrencyEnum){
    this.adminService.updateConfig({mainCurrency: newCurrency}).subscribe()
  }

  async updatePersistence(newPersistence?: PersistenceEnum) {
    this.authService.removeStoredUser()
    this.adminService.updateConfig({persistence: newPersistence}).subscribe()
    await this.authService.storeUser()
  }

  updateUserRole(newRole: RoleEnum, user: UserData, flag: boolean) {
    let userRoles = user.roles;
    if (flag && !userRoles.includes(newRole)) userRoles.push(newRole);
    else userRoles = userRoles.filter(role => role !== newRole);
    this.adminService.updateUser({roles: userRoles}, user._id).subscribe()
    this.UserList.map(item => {
      if (item._id === user._id) {
        item.roles = userRoles
      }
    })
  }

  updateUserBan(flag: boolean, user: UserData) {
    this.adminService.updateUser({banned: flag}, user._id).subscribe()
    this.UserList.map(item => {
      if (item._id === user._id) {
        item.banned = flag
      }
    })

  }

  getUserList(page: number, limit: number) {
    this.adminService.getAllUsers(page, limit).subscribe({
      next: (data) => {
        this.UserList = data
      }, error: (e) => {
        console.error(e)
      }
    })
  }
}
