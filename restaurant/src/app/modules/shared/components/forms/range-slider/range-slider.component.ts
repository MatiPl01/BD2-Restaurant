import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { RangeChangeEvent } from '@shared/types/range-change-event.type';
import { FilterAttr } from '@dishes/enums/filter-attr.enum';
import { LabelType, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'shared-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnChanges {
  @Output() valuesChange = new EventEmitter<{ min: number, max: number }>();
  @Output() rangeChangedEvent = new EventEmitter<RangeChangeEvent>();
  @Input() bounds = { min: 0, max: 0 };
  @Input() values = { min: 0, max: 0 };
  @Input() steps: number = 1;
  @Input() round: number = 2;
  @Input() labelFn: (value: number) => string = value => `${value}`;
  @Input() filterAttr!: FilterAttr;

  private minStep!: number;
  private maxStep!: number;
  public currentSteps!: { min: number, max: number };

  public options: Options = {};

  ngOnChanges(): void {
    this.updateValues();
    this.updateOptions();
  }

  get min(): number {
    return this.bounds.min;
  }

  get max(): number {
    return this.bounds.max;
  }

  public notifyValueChange(): void {
    this.rangeChangedEvent.emit({
      filterAttr: this.filterAttr,
      min: +this.stepToValue(this.currentSteps.min).toFixed(this.round),
      max: +this.stepToValue(this.currentSteps.max).toFixed(this.round)
    })
  }

  private updateValues(): void {
    if (this.values.min === undefined) this.values.min = this.min;
    else this.values.min = Math.min(Math.max(this.values.min, this.min), this.max);
    if (this.values.max === undefined) this.values.max = this.max;
    else this.values.max = Math.max(Math.min(this.values.max, this.max), this.min);

    this.minStep = this.valueToStep(this.min);
    this.maxStep = this.valueToStep(this.max);
    
    this.currentSteps = {
      min: this.valueToStep(this.values.min),
      max: this.valueToStep(this.values.max)
    };
  }

  private updateOptions(): void {
    this.options = {
      floor: this.minStep,
      ceil: this.maxStep,
      translate: (step: number, label: LabelType): string => {
        return this.labelFn(+(this.stepToValue(step) || 0).toFixed(this.round));
      }
    }
  }

  private stepToValue(step: number): number {
    return this.min + (this.max - this.min) / this.steps * step;
  }

  private valueToStep(value: number) {
    return Math.round((value - this.min) / (this.max - this.min) * this.steps);
  }
}
