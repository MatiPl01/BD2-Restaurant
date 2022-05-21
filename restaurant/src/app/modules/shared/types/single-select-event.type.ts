import { FilterAttr } from "@dishes/enums/filter-attr.enum";

export type SingleSelectEvent = { 
  filterAttr: FilterAttr, 
  item: string | number 
};
