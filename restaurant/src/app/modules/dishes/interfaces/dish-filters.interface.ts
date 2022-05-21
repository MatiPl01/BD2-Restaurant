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

  get queryObj(): { [key: string]: string | number };

  clone(): DishFilters;
}
