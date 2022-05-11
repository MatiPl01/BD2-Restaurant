## Users

### **Current User**

#### Forgot Password

Endpoint:
```
POST {{baseUrl}}/users/forgot-password/
```

Body:
```json
{
  "email": "test@test.com"
}
```
Result:
```json
{
    "status": "success",
    "data": "Token has been sent to the specified email!"
}
```

#### Reset Password

Endpoint:
```
PATCH {{baseUrl}}/users/reset-password/:token
```
Body:
```json
{
  "newPassword": "password"
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2EyNDU2Y2QwMjZjNDUzOTI1NGVmMSIsImlhdCI6MTY1MjI1MDAwOCwiZXhwIjoxNjUyMzM2NDA4fQ.m2MqfhzTlJvchSLE_xatwpkp9q_JtEnAY_7xZeXZBCU"
  }
}
```

#### Update Password
Endpoint:
```
PATCH {{baseUrl}}/users/update-password
```
Authorization:
```
{{userJWT}}
```
Body:
```json
{
    "currPassword": "password",
    "newPassword": "password"
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2EyNDU2Y2QwMjZjNDUzOTI1NGVmMSIsImlhdCI6MTY1MjI1MDQxMywiZXhwIjoxNjUyMzM2ODEzfQ.yebhy3T83mwFOyvT-lco_bLrKgX6_TS7VSMl8uJvZbg"
  }
}
```
#### Update User Data
Endpoint:
```
PATCH {{baseUrl}}/users
```
Authorization:
```
{{userJWT}}
```
Body:
```json
{
  "lastName": "Antoni",
  "addresses": {
    "list": {
      "0": {
        "firstName": "Antoni",
        "phone": "+48123123123",
        "city": "Zadupie"
      }
    }
  },
  "defaultCurrency": "USD"
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "addresses": {
      "defaultIdx": 0,
      "list": [
        {
          "city": "Zadupie",
          "firstName": "Antoni",
          "phone": "+48123123123"
        }
      ]
    },
    "_id": "627a2456cd026c4539254ef1",
    "firstName": "Test",
    "lastName": "Antoni",
    "nickName": "testttt",
    "email": "test@test.com",
    "roles": [],
    "orders": [],
    "defaultCurrency": "USD",
    "active": true,
    "banned": false,
    "cart": [],
    "createdAt": "2022-05-10T08:37:42.719Z",
    "updatedAt": "2022-05-11T06:28:00.377Z"
  }
}
```

#### Set User Cart
Endpoint:
```
POST {{baseUrl}}/users/cart
```
Authorization:
```
{{userJWT}}
```
Body:
```json
[
  {
    "dish": "62770f549e5fbcc62af98df3",
    "quantity": 2
  },
  {
    "dish": "627710099e5fbcc62af98e2d",
    "quantity": 3
  }
]
```
Result:
```json
{
  "status": "success",
  "data": [
    {
      "dish": "62770f549e5fbcc62af98df3",
      "quantity": 2
    },
    {
      "dish": "627710099e5fbcc62af98e2d",
      "quantity": 3
    }
  ]
}
```

#### Get User Cart
Endpoint:
```
GET {{baseUrl}}/users/cart?...
```
Query Parameters:
```json
{
  "currency": "USD"
}
```
Authorization:
```
{{userJWT}}
```
Result:
```json
{
  "status": "success",
  "data": [
    {
      "dishID": "62770f549e5fbcc62af98df3",
      "dishName": "Makaron Carbonara",
      "category": "makarony",
      "cuisine": "włoska",
      "type": "danie główne",
      "unitPrice": 21.1,
      "quantity": 2,
      "stock": 2,
      "currency": "USD",
      "image": {
        "breakpoints": [
          400,
          600,
          1000,
          1400,
          1920
        ],
        "paths": [
          "https://ik.imagekit.io/MatiPl01/tr:w-400/restaurant/dishes/bruna-branco-t8hTmte4O_g-unsplash.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/dishes/bruna-branco-t8hTmte4O_g-unsplash.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-1000/restaurant/dishes/bruna-branco-t8hTmte4O_g-unsplash.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-1400/restaurant/dishes/bruna-branco-t8hTmte4O_g-unsplash.jpg",
          "https://ik.imagekit.io/MatiPl01/tr-w:1920/restaurant/dishes/bruna-branco-t8hTmte4O_g-unsplash.jpg"
        ]
      }
    },
    {
      "dishID": "627710099e5fbcc62af98e2d",
      "dishName": "Tiramisu",
      "category": "ciasta",
      "cuisine": "włoska",
      "type": "słodycze",
      "unitPrice": 16,
      "quantity": 3,
      "stock": 298,
      "currency": "USD",
      "image": {
        "breakpoints": [
          400,
          600,
          1000,
          1400,
          1920
        ],
        "paths": [
          "https://ik.imagekit.io/MatiPl01/tr:w-400/restaurant/dishes/marianna-ole-4El3DUkQs2g-unsplash.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/dishes/marianna-ole-4El3DUkQs2g-unsplash.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-1000/restaurant/dishes/marianna-ole-4El3DUkQs2g-unsplash.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-1400/restaurant/dishes/marianna-ole-4El3DUkQs2g-unsplash.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-1920/restaurant/dishes/marianna-ole-4El3DUkQs2g-unsplash.jpg"
        ]
      }
    }
  ]
}
```
#### Delete User Cart
Endpoint:
```
DELETE {{baseUrl}}/users/cart
```

Authorization:
```
{{userJWT}}
```

#### Get Current User
Endpoint:
```
GET {{baseUrl}}/users
```
Authorization:
```
{{userJWT}}
```
Result:
```json
{
    "status": "success",
    "data": {
        "addresses": {
            "defaultIdx": 0,
            "list": [
                {
                    "city": "Zadupie",
                    "firstName": "Antoni",
                    "phone": "+48123123123"
                }
            ]
        },
        "_id": "627a2456cd026c4539254ef1",
        "firstName": "Test",
        "lastName": "Antoni",
        "nickName": "testttt",
        "email": "test@test.com",
        "roles": [
            "user"
        ],
        "orders": [],
        "defaultCurrency": "USD",
        "active": true,
        "banned": false,
        "cart": [],
        "createdAt": "2022-05-10T08:37:42.719Z",
        "updatedAt": "2022-05-11T06:51:19.842Z"
    }
}
```
#### Get Current User Reviews
Endpoint:
```
GET {{baseUrl}}/users/reviews
```
Authorization:
```
{{userJWT}}
```
Result:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "62785599d341bed17f3dfb29",
      "user": {
        "_id": "627a2456cd026c4539254ef1",
        "firstName": "Test",
        "lastName": "Antoni"
      },
      "dish": "62770fca9e5fbcc62af98e11",
      "order": "6278548b8ba9ab78a40f44ee",
      "rating": 5,
      "body": [
        "Jest w pyte i to jeszcze jak",
        "",
        "Jak najbardziej !!!"
      ],
      "dishName": "Lazania",
      "createdAt": "2022-05-08T23:43:21.103Z",
      "updatedAt": "2022-05-08T23:48:48.853Z"
    }
  ]
}
```
#### Delete Current User
Endpoint:
```
DELETE {{baseUrl}}/users
```
Authorization:
```
{{userJWT}}
```

### **Not Logged User**

#### Register
Endpoint:
```
POST {{baseUrl}}/users/register
```
Body:
```json
{
  "firstName": "Janusz",
  "lastName": "Nosacz",
  "nickName": "test",
  "email": "test@gmail.com",
  "password": "password",
  "addresses": {
    "list": [
      {
        "firstName": "Janusz",
        "lastName": "Nosacz",
        "phone": "+48111222333",
        "country": "Polska",
        "postalCode": "111-22",
        "city": "Warszawa",
        "street": "Długa",
        "streetNumber": "1234"
      },
      {
        "firstName": "Halyna",
        "lastName": "Nosacz",
        "phone": "+48999888777",
        "country": "Niemcy",
        "postalCode": "333-22",
        "city": "Berlin",
        "street": "Friedrichstraße",
        "streetNumber": "223"
      }
    ]
  }
}
```
Result:
```json
{
    "status": "success",
    "data": {
        "user": {
            "firstName": "Janusz",
            "lastName": "Nosacz",
            "nickName": "test",
            "email": "test@gmail.com",
            "password": "$2b$10$7gmC6xK6shRRUFOeh/jJhOa.lMYf/V7um1LeWLHENaLE1R.31DbcC",
            "addresses": {
                "defaultIdx": 0,
                "list": [
                    {
                        "firstName": "Janusz",
                        "lastName": "Nosacz",
                        "phone": "+48111222333",
                        "country": "Polska",
                        "postalCode": "111-22",
                        "city": "Warszawa",
                        "street": "Długa",
                        "streetNumber": "1234"
                    },
                    {
                        "firstName": "Halyna",
                        "lastName": "Nosacz",
                        "phone": "+48999888777",
                        "country": "Niemcy",
                        "postalCode": "333-22",
                        "city": "Berlin",
                        "street": "Friedrichstraße",
                        "streetNumber": "223"
                    }
                ]
            },
            "roles": [
                "user"
            ],
            "defaultCurrency": "PLN",
            "active": true,
            "banned": false,
            "_id": "627b60a185be32b92f42bf9c",
            "cart": [],
            "createdAt": "2022-05-11T07:07:13.744Z",
            "updatedAt": "2022-05-11T07:07:13.744Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2I2MGExODViZTMyYjkyZjQyYmY5YyIsImlhdCI6MTY1MjI1MjgzMywiZXhwIjoxNjUyMzM5MjMzfQ.GJ0QLWpBUzIo546MaCxHlCnsvM3vQBwDqZ34ghNwRho"
    }
}
```
#### Login User
Endpoint:
```
POST {{baseUrl}}/users/login
```
Body:
```json
{
    "email": "test@test.com",
    "password": "password"
}

```
Result:
```json
{
    "status": "success",
    "data": {
        "user": {
            "addresses": {
                "defaultIdx": 0,
                "list": [
                    {
                        "firstName": "Janusz",
                        "lastName": "Nosacz",
                        "phone": "+48111222333",
                        "country": "Polska",
                        "postalCode": "111-22",
                        "city": "Warszawa",
                        "street": "Długa",
                        "streetNumber": "1234"
                    },
                    {
                        "firstName": "Halyna",
                        "lastName": "Nosacz",
                        "phone": "+48999888777",
                        "country": "Niemcy",
                        "postalCode": "333-22",
                        "city": "Berlin",
                        "street": "Friedrichstraße",
                        "streetNumber": "223"
                    }
                ]
            },
            "_id": "627b60a185be32b92f42bf9c",
            "firstName": "Janusz",
            "lastName": "Nosacz",
            "nickName": "test",
            "email": "test@gmail.com",
            "password": "$2b$10$7gmC6xK6shRRUFOeh/jJhOa.lMYf/V7um1LeWLHENaLE1R.31DbcC",
            "roles": [
                "user"
            ],
            "defaultCurrency": "PLN",
            "active": true,
            "banned": false,
            "cart": [],
            "createdAt": "2022-05-11T07:07:13.744Z",
            "updatedAt": "2022-05-11T07:07:13.744Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2I2MGExODViZTMyYjkyZjQyYmY5YyIsImlhdCI6MTY1MjI1Mjk0NywiZXhwIjoxNjUyMzM5MzQ3fQ.cMYOH0VT7Ir3cQUNQ0XRWFrwlZVhXixOj8vXtiW87c8"
    }
}
```
### **Admin User**

#### Get Specific User

Endpoint:
```
GET {{baseUrl}}/users/:id
```
Authorization:
```
{{adminJWT}}
```
Result:
```json
{
  "status": "success",
  "data": {
    "addresses": {
      "defaultIdx": 0,
      "list": [
        {
          "firstName": "Manager",
          "lastName": "Managerowski",
          "phone": "+48321321321",
          "country": "Polska",
          "postalCode": "543-12",
          "city": "Topos",
          "street": "Agułd",
          "streetNumber": "321",
          "_id": "62782cb5e05cb0b3799ba35c"
        }
      ]
    },
    "_id": "62782cb5e05cb0b3799ba35b",
    "firstName": "Manager",
    "lastName": "Managerowski",
    "nickName": "manager",
    "email": "manager@yummyfood.com",
    "roles": [],
    "orders": [],
    "defaultCurrency": "PLN",
    "active": true,
    "banned": false,
    "cart": [],
    "createdAt": "2022-05-08T20:48:53.176Z",
    "updatedAt": "2022-05-10T11:42:55.237Z"
  }
}
```
#### Get Specific Fields Of User

Endpoint:
```
GET {{baseUrl}}/users/:id?...
```
Authorization:
```
{{adminJWT}}
```
Query Parameters:
```json
{
  "fields": "-addresses,-roles"
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "_id": "62782cb5e05cb0b3799ba35b",
    "firstName": "Manager",
    "lastName": "Managerowski",
    "nickName": "manager",
    "email": "manager@yummyfood.com",
    "orders": [],
    "defaultCurrency": "PLN",
    "active": true,
    "banned": false,
    "cart": [],
    "createdAt": "2022-05-08T20:48:53.176Z",
    "updatedAt": "2022-05-10T11:42:55.237Z"
  }
}
```

#### Delete User

Endpoint:
```
DELETE {{baseUrl}}/users/:id
```
Authorization:
```
{{adminJWT}}
```
Result:
```json
{
  "status": "success",
  "data": {
    "_id": "62782cb5e05cb0b3799ba35b",
    "firstName": "Manager",
    "lastName": "Managerowski",
    "nickName": "manager",
    "email": "manager@yummyfood.com",
    "orders": [],
    "defaultCurrency": "PLN",
    "active": true,
    "banned": false,
    "cart": [],
    "createdAt": "2022-05-08T20:48:53.176Z",
    "updatedAt": "2022-05-10T11:42:55.237Z"
  }
}
```

#### Get All Users

Endpoint:
```
GET {{baseUrl}}/users/all?...
```
Query Parameters:
```json
{
  "fields": "-addresses,-roles",
  "page": 1,
  "limit": 3
}
```
Authorization:
```
{{adminJWT}}
```
Result:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "62782c82e05cb0b3799ba355",
      "firstName": "Admin",
      "lastName": "Adminowski",
      "roles": [
        "admin"
      ],
      "banned": false
    },
    {
      "_id": "62782cb5e05cb0b3799ba35b",
      "firstName": "Manager",
      "lastName": "Managerowski",
      "roles": [],
      "banned": false
    },
    {
      "_id": "62782d64e05cb0b3799ba35e",
      "firstName": "Janusz",
      "lastName": "Antoni",
      "roles": [
        "manager"
      ],
      "banned": false
    }
  ]
}
```
#### Update User Roles Or Ban Status

Endpoint:
```
PATCH {{baseUrl}}/users/:id
```
Authorization:
```
{{adminJWT}}
```
Body:
```json
{
  "roles": ["user"], 
  "banned": false
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "addresses": {
      "defaultIdx": 0,
      "list": [
        {
          "firstName": "Janusz",
          "lastName": "Nosacz",
          "phone": "+48111222333",
          "country": "Polska",
          "postalCode": "111-22",
          "city": "Warszawa",
          "street": "Długa",
          "streetNumber": "1234"
        },
        {
          "firstName": "Halyna",
          "lastName": "Nosacz",
          "phone": "+48999888777",
          "country": "Niemcy",
          "postalCode": "333-22",
          "city": "Berlin",
          "street": "Friedrichstraße",
          "streetNumber": "223"
        }
      ]
    },
    "_id": "627b60a185be32b92f42bf9c",
    "firstName": "Janusz",
    "lastName": "Nosacz",
    "nickName": "test",
    "email": "test@gmail.com",
    "roles": [
      "user"
    ],
    "defaultCurrency": "PLN",
    "active": true,
    "banned": false,
    "cart": [],
    "createdAt": "2022-05-11T07:07:13.744Z",
    "updatedAt": "2022-05-11T07:21:21.887Z"
  }
}
```
