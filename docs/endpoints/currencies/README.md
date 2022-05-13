## Dishes

#### Get all currencies

Endpoint:
```
GET {{baseUrl}}/currencies
```

Result:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "6276fd406aef1f8d2a811afc",
      "code": "PLN",
      "symbol": "zł",
      "name": "Złoty Polski"
    },
    {
      "_id": "6276fdc56aef1f8d2a811afe",
      "code": "USD",
      "symbol": "$",
      "name": "United States Dollar"
    },
    {
      "_id": "6276fdcc6aef1f8d2a811aff",
      "code": "EUR",
      "symbol": "€",
      "name": "Euro"
    }
  ]
}
```

#### Get Specific Currency

Endpoint:
```
PATCH {{baseUrl}}/currencies/:code
```
Result:
```json
{
  "status": "success",
  "data": {
    "_id": "6276fdcc6aef1f8d2a811aff",
    "code": "EUR",
    "symbol": "€",
    "name": "Euro"
  }
}
```