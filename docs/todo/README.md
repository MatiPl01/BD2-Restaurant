# TODO LIST
## Documentation

- [ ] Change interfaces to exemplary json objects
- [ ] Diagram for noSQL database is no good

## Backend
### TODO
- [ ] Replace duplicated code with handler factory functions,
- [ ] Add language specific error messages (especially these in responses from the server),
- [ ] Remove duplicated code in filters,
- [ ] Remove duplicated code in reviews (in review and dish)
 
### **User**

- [X] Login User
- [X] Register User
- [X] Get User
- [X] Get Users
- [X] Delete User
- [X] Forgot Password 
- [X] Reset Password
- [X] Update Password
- [X] Edit Roles
- [x] Edit Cart
- [X] Edit Ban
- [X] Deactivate
- [X] Edit Currency
- [x] Edit Addresses

### **Dishes**

- [X] Get all Dishes
- [X] Get Dish
- [X] Edit Dish
- [X] Delete Dish
- [X] Add Dish

### **ExchangeRates**

- [X] Get ExchangeRates
- [X] Edit ExchangeRateRatio
- [ ] Save previous exchange rates in the history (for orders placed in the past)

### **Global**

- [X] Get Persistence
- [X] Edit Persistence
- [X] Get MainCurrency
- [X] Edit MainCurrency
 
### **Reviews**

- [X] Get Reviews
- [X] Add Review `Limited time to edit for example 7 days`
- [X] Edit Review `Limited time to edit for example 7 days`
- [X] Delete Review

### **Orders**

- [X] Add Order
- [X] Get User Orders
- [X] Prevent buying more dish units than there are in stock

### **Currencies**

- [X] Get Currency 
- [X] Get Currencies

## Frontend

- [ ] Add a possibility for Admin to change currency in the config
- [ ] User's default currency should be set based on the MainCurrency in the config
- [ ] Dish MainUnitPrice should be recalculated after the MainCurrency was changed in the Config (Try using a trigger in Atlas)
