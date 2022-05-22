import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-single-select-dropdown',
  template: `
    <select
      class="btn-select" 
      [(ngModel)]="selected"
      (change)="notifyChange()"
      [value]="selected">
      <option class="btn-select__option"
        *ngFor="let value of values" 
        [value]="value"
        [selected]="value === selected">
          {{value}}
      </option>
    </select>
  `
})
export class SingleSelectDropdownComponent<T> {
  @Output() selectedChange = new EventEmitter<T>();
  @Input() selected!: T;
  @Input() values!: T[];

  public notifyChange(): void {
    this.selectedChange.emit(this.selected);
  }
}
