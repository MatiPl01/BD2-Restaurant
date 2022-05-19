import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider'

@Component({
  selector: 'shared-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent {
  @Output() rangeChangedEvent = new EventEmitter<{ filterAttr: string, min: number, max: number }>()
  @Input() filterAttr!: string
  @Input('minSet') minValueSet!: number
  @Input('maxSet') maxValueSet!: number
  @Input() options!: Options

  notifyValueChange() {
    this.rangeChangedEvent.emit({
      filterAttr: this.filterAttr,
      min: this.minValueSet,
      max: this.maxValueSet
    })
  }
}
