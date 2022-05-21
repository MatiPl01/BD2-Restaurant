import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider'

@Component({
  selector: 'app-filter-range',
  templateUrl: './filter-range.component.html'
})
export class FilterRangeComponent {
  @Output() valuesChange = new EventEmitter<{filterAttr: string, min: number, max: number}>()
  @Input() filterAttr!: string
  @Input() values!: { min: number, max: number }
  @Input() options!: Options

  onChange() {
    this.valuesChange.emit({
      filterAttr: this.filterAttr,
      ...this.values
    })
  }
}
