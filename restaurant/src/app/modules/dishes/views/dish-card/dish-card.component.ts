import { Component, Input} from '@angular/core'
import { AuthService } from '@auth/services/auth.service';
import {DishData} from "@dishes/interfaces/dish.interface";
import {CurrenciesService} from "@shared/services/currencies.service";
import {ExchangeRateService} from "@shared/services/exchange-rate.service";

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html'
})
export class DishCardComponent{
  @Input() dish!: DishData

  constructor(public authService:AuthService) {}

  onRemoveClick() {
    // this.removeDish.emit(this.dish)
  }

}
