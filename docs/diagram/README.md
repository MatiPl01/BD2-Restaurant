## Diagram

![Diagram](/docs/diagram/files/diagram.png)

# TODO - update diagram to reflect changed properties

## Description
 
### **User**

Collection of user data

- FirstName: String
- LastName: String
- Nickname: String
- Email: String 
- Password: String (Hash)
- Addresses
  - FirstName: String
  - LastName: String
  - Phone: String
  - Country: String
  - PostalCode: String
  - City: String
  - Street: String
  - StreetNumber: String
  - FlatNumber: String
- Roles: String[]
- Orders: mongoose.Types.ObjectId (Orders)
- Reviews: mongoose.Types.ObjectId (Reviews)
- Cart
  - Dish: mongoose.Types.ObjectId (Dishes)
  - Quantity: Number
- DefaultCurrency: mongoose.Types.ObjectId (Currencies)
- Active: Boolean
- Banned: Boolean

### **Dishes**

Collection of menu data

- Name: String
- Category: String
- Cuisine: String
- Type: String
- Ingredients: String[]
- Stock: Number
- Currency: String
- UnitPrice: Number
- RatingsAverage: Number
- RatingsCount: Number
- Description: String[]
- Images
  - coverIdx: Number,
  - gallery: {
    - breakpoints: Number[],
    - paths: String[]
    
    }[]
- Reviews: mongoose.Types.ObjectId[] (Reviews)

### **Reviews**

Collection of reviews and comments data

- User: mongoose.Types.ObjectId (Users)
- Dish: mongoose.Types.ObjectId (Dishes)
- Order: mongoose.Types.ObjectId (Orders)
- CreatedAt: Date
- UpdatedAt: Date
- Rating: Number
- Body: String[]

### **Orders**

Collection of orders data

- User: mongoose.Types.ObjectId (Users)
- Items
  - Dish: mongoose.Types.ObjectId (Dishes)
  - Quantity: Number
  - UnitPrice: Number
- Date: Date
- TotalPrice: Number
- Currency: String

### **Globals**

Collection of global values

- Persistence: Number
- MainCurrency: mongoose.Types.ObjectId[] (Currencies)

### **Currencies**

Collection of currencies data

- Code: String
- Symbol: String
- Name: String

### **ExchangeRates**

Collection of exchange rates of currencies

- Rate: Number
- From: String
- To: String
