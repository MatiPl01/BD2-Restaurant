import { FilterAttr } from "@dishes/enums/filter-attr.enum";

export type MultipleSelectEvent = { 
  filterAttr: FilterAttr, 
  items: string[] | number[] 
};
