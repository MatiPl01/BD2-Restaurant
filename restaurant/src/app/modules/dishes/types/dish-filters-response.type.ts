export type DishFiltersResponse = {
  category: string[];
  cuisine: string[];
  unitPrice: {
    min: number,
    max: number
  };
  ratingsAverage: {
    min: number,
    max: number
  };
}
