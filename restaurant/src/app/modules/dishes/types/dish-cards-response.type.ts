import { DishCard } from "@dishes/interfaces/dish-card.interface";

export type DishCardsResponse = {
  dishes: DishCard[];
  filteredCount: number;
  pagesCount: number;
  totalCount: number;
};
