import { Component, Input, Output, EventEmitter } from '@angular/core';
import DropdownSelectSettings from '@shared/interfaces/dropdown-select-settings.interface';

type EventObj = { filterAttr: string, value: string }

@Component({
  selector: 'shared-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styles: [
  ]
})
export class MultiSelectDropdownComponent {
  @Output() itemSelected = new EventEmitter<EventObj>();
  @Output() itemDeSelected = new EventEmitter();
  @Output() selectedAll = new EventEmitter();
  @Output() deSelectedAll = new EventEmitter();
  @Input() placeholder!: string;
  @Input() settings!: DropdownSelectSettings;
  @Input() dropDownList: any = [];
  @Input() filterAttr!: string;
  public selectedItems = [];

  onItemSelect(filterValue: any) {
    this.itemSelected.emit(this.createEventObj(filterValue));
  }

  onSelectAll(filterValues: any) {
    this.selectedAll.emit(this.createEventObj(filterValues));
  }

  onItemDeSelect(filterValue: any) {
    this.itemDeSelected.emit(this.createEventObj(filterValue));
  }

  onDeSelectAll(filterValues: any) {
    this.deSelectedAll.emit(this.createEventObj(filterValues));
  }

  private createEventObj(value: any): EventObj {
    return {
      filterAttr: this.filterAttr,
      value
    }
  }
}
