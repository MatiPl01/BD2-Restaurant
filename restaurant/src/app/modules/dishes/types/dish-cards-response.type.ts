import { DishCard } from "@dishes/interfaces/dish-card.interface";

export type DishCardsResponse = {
  dishes: DishCard[];
  filteredCount: number;
  currentPage: number;
  pagesCount: number;
  totalCount: number;
};
