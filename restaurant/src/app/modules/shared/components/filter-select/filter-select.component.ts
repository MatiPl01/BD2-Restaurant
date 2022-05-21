import { Component, Input, Output, EventEmitter } from '@angular/core'
import DropdownSelectSettings from "@shared/interfaces/dropdown-select-settings.interface";

type eventObj = {filterAttr: string, value: any}

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html'
})
export class FilterSelectComponent{
  @Output() selectedItemsChange = new EventEmitter<never[]>()
  @Output() itemSelectedEvent = new EventEmitter<eventObj>()
  @Output() itemDeSelectedEvent = new EventEmitter<eventObj>()
  @Output() selectedAllEvent = new EventEmitter<eventObj>()
  @Output() deSelectedAllEvent = new EventEmitter<eventObj>()
  @Input() filterName!: string
  @Input() settings!: DropdownSelectSettings
  @Input() dropDownList: any = []
  @Input() filterAttr!: string
  @Input() selectedItems!: string[]

  onItemSelect(filterValue: any) {
    this.itemSelectedEvent.emit(this.createEventObj(filterValue))
  }

  onSelectAll(filterValues: any) {
    this.selectedAllEvent.emit(this.createEventObj(filterValues))
  }

  onItemDeSelect(filterValue: any) {
    this.itemDeSelectedEvent.emit(this.createEventObj(filterValue))
  }

  onDeSelectAll(filterValues: any) {
    this.deSelectedAllEvent.emit(this.createEventObj(filterValues))
  }

  private createEventObj(value: any): eventObj {
    return {
      filterAttr: this.filterAttr,
      value
    }
  }
}
