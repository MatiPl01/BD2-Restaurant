## Diagram

![Diagram](/docs/diagram/assets/diagram.png)

# TODO - update diagram to reflect changed properties

## Description
 
### **User**

Collection of user data

```js
export interface UserData {
  _id:any,
  firstName: string,
  lastName: string,
  nickName: string,
  email: string,
  addresses: Address[],
  roles: RoleEnum[],
  orders: string[],
  cart: CartItem[],
  defaultCurrency: CurrencyEnum,
  banned: boolean,
  updatedAt: Date,
  createdAt: Date,
}

```

```js
export interface Address {
  firstName: string,
  lastName: string,
  phone: string,
  country: string,
  postalCode: string,
  city: string,
  street: string,
  streetNumber: string,
  flatNumber?: string,
}
```
```js
export interface CartItem {
  dish: {
    id: string,
    name: string,
    stock: number,
  },
  quantity: number,
}
```

##### Example

![UserExample](/docs/diagram/assets/example_user.png)

### **Dishes**

Collection of menu data

```js
export interface DishData {
  _id: any,
  name: string,
  category: string,
  cuisine: string,
  type: string,
  ingredients: string[],
  stock: number,
  currency: string,
  unitPrice: number,
  ratingsAverage: number,
  ratingsCount: number,
  description: string[],
  images: {
    coverIdx: number,
    gallery: ImageEntry[],
  },
  mainUnitPrice: number,
}
```
```js
export interface ImageEntry {
  breakpoints: number[],
  paths: string[],
}
```

##### Example

![DishesExample](/docs/diagram/assets/example_dishes.png)

### **Reviews**

Collection of reviews and comments data

```js
export interface ReviewData {
  _id:string,
  user:string,
  dish:string,
  order:string,
  rating:number,
  body:string[],
  createdAt:Date,
  updatedAt:Date,
}
```

##### Example

![ReviewsExample](/docs/diagram/assets/example_reviews.png)

### **Orders**

Collection of orders data

```js
export interface OrderData {
  _id:string,
  user:string,
  items:OrderItemsData[],
  currency:string,
  totalPrice:number,
}
```
```js
export interface OrderItemsData{
  dish:string,
  quantity:number,
  dishName:string,
  unitPrice:number
}
```

##### Example

![OrdersExample](/docs/diagram/assets/example_orders.png)

### **Config**

Collection of global config

```js
export interface ConfigData{
  mainCurrency:string,
  persistence:PersistanceEnum,
}
```

##### Example

![ConfigExample](/docs/diagram/assets/example_config.png)

### **Currencies**

Collection of currencies data

```js
export interface CurrencyData {
  _id:any,
  code:CurrencyEnum,
  symbol:string,
  name:string,
}
```

##### Example

![CurrenciesExample](/docs/diagram/assets/example_currencies.png)

### **ExchangeRates**

Collection of exchange rates of currencies

```js
export interface ExchangeRateData {
  _id:any,
  rate:number,
  from:CurrencyEnum,
  to:CurrencyEnum,
}
```

##### Example

![ExchangeRateExample](/docs/diagram/assets/example_exchangeRates.png)
