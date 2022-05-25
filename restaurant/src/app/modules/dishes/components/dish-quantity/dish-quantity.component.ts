import { Component, Input } from '@angular/core'
import { HttpService } from '@core/services/http.service'
import { Dish } from '@dishes/interfaces/dish.interface'
import { ApiPathEnum } from '@shared/enums/api-path.enum'


@Component({
  selector: 'app-dish-quantity',
  templateUrl: './dish-quantity.component.html'
})
export class DishQuantityComponent {
  @Input() dish!: Dish
  quantity: number = 0
  remainingText!: string

  constructor(private httpService: HttpService) {
    this.httpService.get<Partial<Dish>>(`${ApiPathEnum.DISHES}/`);
  }

  private getRemainingText(): string {
    const remaining = this.dish.stock - this.quantity
    const lastDigit = remaining % 10
    if (lastDigit === 0 || 5 <= lastDigit && lastDigit <= 9 || lastDigit === 1 && remaining > 10 || remaining >= 10 && remaining <= 21) return 'Pozostało'
    if (lastDigit === 1) return 'Pozostała'
    return 'Pozostały'
  }
}
