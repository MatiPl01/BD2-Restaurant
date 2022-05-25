export interface Review {
  _id? :any;
  user: {
    _id?: string,
    firstName: string,
    lastName: string
  };
  dish: {
    _id?: string,
    imageCover: string
  };
  order: string;
  dishName: string;
  rating: number;
  body: string[];
  createdAt: Date;
  updatedAt: Date;
}
