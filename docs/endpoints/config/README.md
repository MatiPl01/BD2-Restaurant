## Config

#### Get Config

Endpoint:
```
GET {{baseUrl}}/config
```

Result:
```json
{
  "status": "success",
  "data": {
    "_id": "6276174267b7430cc97af945",
    "mainCurrency": "USD",
    "persistence": "LOCAL"
  }
}
```

#### Update Config

Endpoint:
```
PATCH {{baseUrl}}/config
```
Authorization:
```
{{adminJWT}}
```
Body:
```json
{
  "mainCurrency": "USD",
  "persistence": "LOCAL"
}

```
Result:
```json
{
  "status": "success",
  "data": {
    "_id": "6276174267b7430cc97af945",
    "mainCurrency": "USD",
    "persistence": "LOCAL"
  }
}
```