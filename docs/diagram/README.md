## Diagram

![Diagram](/docs/diagram/assets/diagram2.png)

## Description
 
### **User**

Collection of user data

```js
export interface UserData {
  firstName: String,
  lastName: String,
  nickName: String,
  email: String,
  addresses: Address[],
  roles: RoleEnum[],
  cart: CartItem[],
  defaultCurrency: String,
  active: boolean,
  banned: boolean,
}

```

```js
export interface Address {
  firstName: String,
  lastName: String,
  phone: String,
  country: String,
  postalCode: String,
  city: String,
  street: String,
  streetNumber: String,
  flatNumber?: String,
}
```
```js
export interface CartItem {
  dish: String,
  quantity: number,
}
```

##### Example

![UserExample](/docs/diagram/assets/example_user.png)

### **Dishes**

Collection of menu data

```js
export interface DishData {
  name: String,
  category: String,
  cuisine: String,
  type: String,
  ingredients: String[],
  stock: number,
  currency: String,
  unitPrice: number,
  ratingsAverage: number,
  ratingsCount: number,
  description: String[],
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
  paths: String[],
}
```

##### Example

![DishesExample](/docs/diagram/assets/example_dishes.png)

### **Reviews**

Collection of reviews and comments data

```js
export interface ReviewData {
  user: String,
  dish: String,
  order: String,
  rating: number,
  body: String[],
}
```

##### Example

![ReviewsExample](/docs/diagram/assets/example_reviews.png)

### **Orders**

Collection of orders data

```js
export interface OrderData {
  user: String,
  items: OrderItemsData[],
  currency: String,
  totalPrice: number,
}
```
```js
export interface OrderItemsData{
  dish: String,
  quantity: number,
  dishName: String,
  unitPrice: number
}
```

##### Example

![OrdersExample](/docs/diagram/assets/example_orders.png)

### **Config**

Collection of global config

```js
export interface ConfigData{
  mainCurrency: String,
  persistence: PersistanceEnum,
}
```

##### Example

![ConfigExample](/docs/diagram/assets/example_config.png)

### **Currencies**

Collection of currencies data

```js
export interface CurrencyData {
  code: String,
  symbol: String,
  name: String,
}
```

##### Example

![CurrenciesExample](/docs/diagram/assets/example_currencies.png)

### **ExchangeRates**

Collection of exchange rates of currencies

```js
export interface ExchangeRateData {
  rate: number,
  from: String,
  to: String,
}
```

##### Example

![ExchangeRateExample](/docs/diagram/assets/example_exchangeRates.png)
