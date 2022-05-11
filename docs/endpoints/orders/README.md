## Orders

#### Create Order

Endpoint:
```
POST {{baseUrl}}/orders/
```
Authorization:
```
{{userJWT}}
```
Body:
```json
{
    "items": [
        {
            "dish": "62770fda9e5fbcc62af98e19",
            "quantity": 2
        }, {
            "dish": "62770fca9e5fbcc62af98e11",
            "quantity": 12
        }, {
            "dish": "627710099e5fbcc62af98e2d",
            "quantity": 4
        }
    ],
    "currency": "PLN"
}
```
Result:
```json
{
    "status": "success",
    "data": {
        "user": "627a2456cd026c4539254ef1",
        "items": [
            {
                "dish": "62770fda9e5fbcc62af98e19",
                "quantity": 2,
                "dishName": "Naleśniki z owocami",
                "unitPrice": 80.46
            },
            {
                "dish": "62770fca9e5fbcc62af98e11",
                "quantity": 12,
                "dishName": "Lazania",
                "unitPrice": 67.05
            },
            {
                "dish": "627710099e5fbcc62af98e2d",
                "quantity": 4,
                "dishName": "Tiramisu",
                "unitPrice": 71.52
            }
        ],
        "currency": "PLN",
        "_id": "627b5da685be32b92f42bf71",
        "totalPrice": 1251.6,
        "createdAt": "2022-05-11T06:54:31.200Z",
        "updatedAt": "2022-05-11T06:54:31.200Z"
    }
}
```

#### Get Current User Orders

Endpoint:
```
GET {{baseUrl}}/orders?...
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
      "_id": "627b5da685be32b92f42bf71",
      "user": "627b60a185be32b92f42bf9c",
      "items": [
        {
          "dish": "62770f549e5fbcc62af98df3",
          "quantity": 2,
          "dishName": "Naleśniki z owocami",
          "unitPrice": 18.01
        },
        {
          "dish": "62770fca9e5fbcc62af98e11",
          "quantity": 12,
          "dishName": "Lazania",
          "unitPrice": 15.01
        },
        {
          "dish": "627710099e5fbcc62af98e2d",
          "quantity": 4,
          "dishName": "Tiramisu",
          "unitPrice": 16.01
        }
      ],
      "currency": "USD",
      "totalPrice": 280.11,
      "createdAt": "2022-05-11T06:54:31.200Z",
      "updatedAt": "2022-05-11T06:54:31.200Z"
    }
  ]
}
```

#### Get Current User Filtered Orders
Endpoint:
```
GET {{baseUrl}}/orders?...
```
Query Parameters:
```json
{
  "fields": "-items",
  "totalPrice[gt]": 200,
  "totalPrice[it]": 1000,
  "page": 1,
  "limit": 5,
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
      "_id": "627b5da685be32b92f42bf71",
      "user": "627b60a185be32b92f42bf9c",
      "currency": "USD",
      "totalPrice": 280.11,
      "createdAt": "2022-05-11T06:54:31.200Z",
      "updatedAt": "2022-05-11T06:54:31.200Z"
    }
  ]
}
```
