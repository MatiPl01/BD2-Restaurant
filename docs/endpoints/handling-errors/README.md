## Handling Errors

#### Unhandled routes

Endpoint:
```
GET {{baseUrl}}/sadas
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
  "status": "fail",
  "error": {
    "status": 404,
    "statusMessage": "fail",
    "isOperational": true
  },
  "message": "Cannot find /api/v1/sadas on this server",
  "stack": "Error: Cannot find /api/v1/sadas on this server\n"
}
```

#### Mongo CastError

Endpoint:
```
GET {{baseUrl}}/dishes/safa
```
Result:
```json
{
  "status": "error",
  "error": {
    "stringValue": "\"safa\"",
    "valueType": "string",
    "kind": "ObjectId",
    "value": "safa",
    "path": "_id",
    "reason": {},
    "name": "CastError",
    "message": "Cast to ObjectId failed for value \"safa\" (type string) at path \"_id\" for model \"Dish\""
  },
  "message": "Cast to ObjectId failed for value \"safa\" (type string) at path \"_id\" for model \"Dish\"",
  "stack": "CastError: Cast to ObjectId failed for value \"safa\" (type string) at path \"_id\" for model \"Dish\"\n"
}
```
