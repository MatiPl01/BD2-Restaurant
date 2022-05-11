## Reviews

#### Get Reviews

Endpoint:
```
GET {{baseUrl}}/reviews?rating[gte]=4&page=1&limit=2&fields=user,body
```
Query Parameters:

```json
{
  "rating[gte]": 4,
  "rating[it]": 4,
  "page": 2,
  "limit": 2,
  "fields": "user,body"
}
```
Result:
```json
{
    "status": "success",
    "data": [
        {
            "_id": "62785599d341bed17f3dfb29",
            "user": "627b60a185be32b92f42bf9c",
            "body": [
                "Jest w pyte i to jeszcze jak",
                "",
                "Jak najbardziej !!!"
            ]
        }
    ]
}
```

#### Get Specific Review

Endpoint:
```
GET {{baseUrl}}/reviews/:id?...
```
Query Parameters:

```json
{
  "fields": "-user,-body"
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "_id": "62785599d341bed17f3dfb29",
    "dish": "62770fca9e5fbcc62af98e11",
    "order": "6278548b8ba9ab78a40f44ee",
    "rating": 5,
    "dishName": "Lazania",
    "createdAt": "2022-05-08T23:43:21.103Z",
    "updatedAt": "2022-05-08T23:48:48.853Z"
  }
}
```

#### Create Review
Endpoint:
```
POST {{baseUrl}}/reviews/
```
Authorization:
```
{{userJWT}}
```
Body:
```json
{
  "dish": "627710099e5fbcc62af98e2d",
  "order": "627b5da685be32b92f42bf71",
  "rating": 4,
  "body": [
    "Jest w pyte",
    "",
    "Jak najbardziej!"
  ]
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "user": "627b60a185be32b92f42bf9c",
    "dish": "62770f549e5fbcc62af98df3",
    "order": "627b5da685be32b92f42bf71",
    "rating": 4,
    "body": [
      "Jest w pyte",
      "",
      "Jak najbardziej!"
    ],
    "_id": "627b67a2d41ce4351afb5151",
    "dishName": "Makaron Carbonara",
    "createdAt": "2022-05-11T07:37:06.376Z",
    "updatedAt": "2022-05-11T07:37:06.376Z"
  }
}
```
#### Edit Review

Endpoint:
```
PATCH {{baseUrl}}/reviews/:id
```
Authorization:
```
{{userJWT}}
```
Body:
```json
{
  "rating": 5,
  "body": [
    "Jest w pyte i to jeszcze jak",
    "",
    "Jak najbardziej !!!"
  ]
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "_id": "627b67a2d41ce4351afb5151",
    "user": {
      "_id": "627b60a185be32b92f42bf9c",
      "firstName": "Janusz",
      "lastName": "Nosacz"
    },
    "dish": "62770f549e5fbcc62af98df3",
    "order": "627b5da685be32b92f42bf71",
    "rating": 5,
    "body": [
      "Jest w pyte i to jeszcze jak",
      "",
      "Jak najbardziej !!!"
    ],
    "dishName": "Makaron Carbonara",
    "createdAt": "2022-05-11T07:37:06.376Z",
    "updatedAt": "2022-05-11T07:38:27.143Z"
  }
}
```

#### Delete Review
Endpoint:
```
DELETE {{baseUrl}}/reviews/:id
```
Authorization:
```
{{userJWT}}
```
