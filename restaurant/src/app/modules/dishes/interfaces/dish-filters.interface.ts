export interface DishFilters {
  category: Set<string>;
  cuisine: Set<string>;
  unitPrice: {
    min: number,
    max: number
  };
  ratingsAverage: {
    min: number,
    max: number
  };

  clone(): DishFilters;
}
