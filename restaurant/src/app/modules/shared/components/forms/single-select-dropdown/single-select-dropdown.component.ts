import { Component, EventEmitter, Input, Output } from '@angular/core';

// TODO - replace this component with own select options list having custom styles applied (instead of built-in HTML options list)
@Component({
  selector: 'shared-single-select-dropdown',
  template: `
    <select class="single-select-dropdown"
      [(ngModel)]="selected"
      (change)="notifyChange()">
      <option class="single-select-dropdown__option"
        *ngFor="let value of values" [value]="value">
        {{ value }}
      </option>
    </select>
  `
})
export class SingleSelectDropdownComponent<T> {
  @Output() selectedChange = new EventEmitter<T>();
  @Input() selected!: T
  @Input() values!: T[];

  public notifyChange(): void {
    this.selectedChange.emit(this.selected);
  }
}
