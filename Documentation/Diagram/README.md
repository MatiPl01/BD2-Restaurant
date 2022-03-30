## Diagram

![Diagram](/documentation/diagram/files/diagram.png)

## Description
 
### **User**

Collection of user data

- Firstane: String
- Lastname: String
- Login: String
- Email: String 
- Password: String (Hash)
- Addresses
  - Firstname: String
  - Lastname: String
  - Phone: String
  - Country: String
  - PostalCode: String
  - City: String
  - Street: String
  - StreetNumber: String
  - FlatNumber: String
- Active: Boolean
- Banned: Boolean
- Orders: mongoose.Schema.ObjectId (Orders)
- Reviews: mongoose.Schema.ObjectId (Reviews)
- Cart
  - Dish: mongoose.Schema.ObjectId (Dishes)
  - Quantity: Number

### **Dishes**

Collection of menu data

- Name: String
- Category: String
- Cuisine: String
- Type: String
- Ingredients: String[]
- Stock: Number
- Currency: mongoose.Schema.ObjectId (Currencies)
- UnitPrice: Number
- RatingsSum: Number
- RatingCount: Number
- Description: String[]
- Images: String[]
- Reviews: mongoose.Schema.ObjectId[] (Reviews)

### **Reviews**

Collection of reviews and comments data

- User: mongoose.Schema.ObjectId (Users)
- Dish: mongoose.Schema.ObjectId (Dishes)
- Order: mongoose.Schema.ObjectId (Orders)
- Date: String
- Rating: Number
- Body: String[]

### **Orders**

Collection of orders data

- User: mongoose.Schema.ObjectId (Users)
- Dishes
  - Dish: mongoose.Schema.ObjectId (Dishes)
  - Quantity: Number
  - UnitPrice: Number
- Date:String
- TotalPrice: Number
- Currency: mongoose.Schema.ObjectId (Currencies)

### **Globals**

Collection of global values

- Persistence: Number
- MainCurrency: mongoose.Schema.ObjectId[] (Currencies)

### **Currencies**

Collection of currencies data

- Code: String
- Symbol: String
- Name: String

### **ExchangeRates**

Collection of exchange rates of currencies

- Ratio: Number
- From: mongoose.Schema.ObjectId (Currencies)
- To: mongoose.Schema.ObjectId (Currencies)
