import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider'

export type RangeChangeEvent = { filterAttr: string, min: number, max: number };

@Component({
  selector: 'shared-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit {
  @Output() rangeChangedEvent = new EventEmitter<RangeChangeEvent>();
  @Input() currentMin!: number;
  @Input() currentMax!: number;
  @Input() options!: Options;
  @Input() filterAttr!: string;

  ngOnInit(): void {
    if (this.currentMin === undefined) this.currentMin = this.options.floor || 0;
    if (this.currentMax === undefined) this.currentMax = this.options.ceil || 0;
  }

  notifyValueChange() {
    this.rangeChangedEvent.emit({
      filterAttr: this.filterAttr,
      min: this.currentMin,
      max: this.currentMax
    })
  }
}
