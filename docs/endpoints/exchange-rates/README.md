## Exchange Rates

#### Get Exchange Rates

Endpoint:
```
GET {{baseUrl}}/exchange-rates?...
```
Query Parameters:
```json
{
  "from": "USD",
  "to": "PLN"
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "_id": "62770e5e4365b613b347ff8a",
    "rate": 4.47,
    "from": "USD",
    "to": "PLN",
    "createdAt": "2022-05-08T00:27:10.270Z",
    "updatedAt": "2022-05-08T03:20:32.491Z"
  }
}
```

#### Add Exchange Rates

Endpoint:
```
PATCH {{baseUrl}}/exchange-rates?...
```
Query Parameters:
```json
{
  "from": "USD",
  "to": "PLN"
}
```
Authorization:
```
{{adminJWT}}
```
Body:
```json
{
  "rate": 4.47
}
```
Result:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "62770e5e4365b613b347ff8a",
      "rate": 4.47,
      "from": "USD",
      "to": "PLN",
      "createdAt": "2022-05-08T00:27:10.270Z",
      "updatedAt": "2022-05-11T07:55:03.765Z"
    },
    {
      "_id": "62770ee09e5fbcc62af98de7",
      "rate": 0.2238,
      "from": "PLN",
      "to": "USD",
      "createdAt": "2022-05-08T00:29:20.545Z",
      "updatedAt": "2022-05-11T07:55:03.805Z"
    }
  ]
}
```