import { Component, Input} from '@angular/core'
import {DishData} from "@dishes/interfaces/dish.interface";

@Component({
  selector: 'app-dish-quantity',
  templateUrl: './dish-quantity.component.html',
  styles: [
  ]
})
export class DishQuantityComponent{
  @Input() dish!: DishData
  remainingText!: string

  constructor() {}

  private getRemainingText(): string {
    const remaining = this.dish.stock
    const lastDigit = remaining % 10
    if (lastDigit === 0 || 5 <= lastDigit && lastDigit <= 9 || lastDigit === 1 && remaining > 10 || remaining >= 10 && remaining <= 21) return 'Pozostało'
    if (lastDigit === 1) return 'Pozostała'
    return 'Pozostały'
  }

}
