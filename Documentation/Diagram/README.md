## Diagram

![Diagram](/Documentation/Diagram/files/diagram.png)

## Description
 
**User**

Collection about user data

- Firstane: String
- Lastname: String
- Login :String
- Email: :String 
- Password :String (Hash)
- Addresses
  - Firstname:String
  - Lastname:String
  - Phone:String
  - Country:String
  - PostalCode:String
  - City:String
  - Street:String
  - StreetNumber:String
  - FlatNumber:String
- Active:Boolean
- Banned:Boolean
- Orders:mongoose.Schema.ObjectId
- Reviews:mongoose.Schema.ObjectId
- Cart
  - Dish:mongoose.Schema.ObjectId
  - Quantity:Number

**Dishes**

Collection about menu data

- Name:String
- Category:String
- Cuisine:String
- Type:String
- Ingredients:String[]
- Stock:Number
- Currency:mongoose.Schema.ObjectId
- UnitPrice:Number
- RatingsSum:Number
- RatingCount:Number
- Description:String[]
- Images:String[]
- Reviews:mongoose.Schema.ObjectId[]

**Reviews**

Collection about reviews and comments data

- User:mongoose.Schema.ObjectId
- Dish:mongoose.Schema.ObjectId
- Order:mongoose.Schema.ObjectId
- Date:String
- Rating:Number
- Body:String[]

**Orders**

Collection about orders data

- User:mongoose.Schema.ObjectId
- Dishes
  - Dish:mongoose.Schema.ObjectId
  - Quantity:Number
  - UnitPrice:Number
- Date:String
- TotalPrice:Number
- Currency:mongoose.Schema.ObjectId

**Globals**

Collection about global values

- Persistence:Number
- MainCurrency:mongoose.Schema.ObjectId[]

**Currencies**

Collection about currencies data

- Code:String
- Symbol:String
- Name:String

**ExchangeRates**

Collection about exchange rates of currencies

-Ration:Number
-From:mongoose.Schema.ObjectId
-To:mongoose.Schema.ObjectId
