import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-btn-select',
  template: `
    <select
      class="btn-select" [(ngModel)]="value" (change)="valueChanged()">
      <option *ngFor="let v of values" class="btn-select__option" [value]="v">{{v}}</option>
    </select>
  `
})
export class BtnSelectComponent<T> {
  @Output() valueChangeEvent = new EventEmitter<T>();
  @Input() value!: T;
  @Input() values!: T[];

  public valueChanged(): void {
    this.valueChangeEvent.emit(this.value);
  }
}
