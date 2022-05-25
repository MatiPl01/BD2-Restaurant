import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DishCard } from '@dishes/interfaces/dish-card.interface';
import {CurrencyService} from "@core/services/currency.service";
import { RoleEnum } from '@shared/enums/role.enum';
import {ApiPathEnum} from "@shared/enums/api-path.enum";
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html'
})
export class DishCardComponent{
  @Input() dish!: DishCard;
  @Output() editDish = new EventEmitter<string>();

  public RoleEnum = RoleEnum;

  constructor(public currencyService: CurrencyService,private http: HttpClient) {}

  onEditDish(){
    this.editDish.emit(this.dish._id)
  }
  onDeleteDish(){
    this.http.delete(environment.API_URL+'/'+ApiPathEnum.DISHES+'/'+this.dish._id).subscribe()
    window.location.reload();
  }
}
