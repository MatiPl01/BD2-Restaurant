import { FilterAttr } from "@dishes/enums/filter-attr.enum";

export type RangeChangeEvent = { 
  filterAttr: FilterAttr, 
  min: number, 
  max: number 
};
