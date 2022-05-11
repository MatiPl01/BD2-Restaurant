## Dishes

#### Create Dish

Endpoint:
```
POST {{baseUrl}}/dishes
```
Authorization:
```
{{managerJWT}}
```

Body:
```json
{
  "name": "Test",
  "cuisine": "testowa",
  "type": "test",
  "category": "ciasta",
  "ingredients": [
    "mąka",
    "kakao",
    "czekolada",
    "cukier",
    "mleko",
    "jaja",
    "olej",
    "śmietana"
  ],
  "stock": 68,
  "currency": "EUR",
  "unitPrice": 12.34,
  "description": [
    "Lorem ipsum.",
    "Lorem ipsum.",
    "Lorem.ipsum."
  ],
  "images": {
    "coverIdx": 0,
    "gallery": [
      {
        "breakpoints": [
          300,
          600,
          1200,
          1800
        ],
        "paths": [
          "https://ik.imagekit.io/MatiPl01/tr:w-300/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-1200/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg",
          "https://ik.imagekit.io/MatiPl01/tr:w-1800/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg"
        ]
      },
      {
        "breakpoints": [
          350,
          800,
          1200,
          1200
        ],
        "paths": [
          "https://ik.imagekit.io/MatiPl01/tr:w-350/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352",
          "https://ik.imagekit.io/MatiPl01/tr:w-800/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352",
          "https://ik.imagekit.io/MatiPl01/tr:w-1200/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352",
          "https://ik.imagekit.io/MatiPl01/tr:w-1600/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352"
        ]
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
    "name": "Test",
    "category": "ciasta",
    "cuisine": "testowa",
    "type": "test",
    "ingredients": [
      "mąka",
      "kakao",
      "czekolada",
      "cukier",
      "mleko",
      "jaja",
      "olej",
      "śmietana"
    ],
    "stock": 68,
    "currency": "EUR",
    "unitPrice": 12.34,
    "ratingsAverage": 0,
    "ratingsCount": 0,
    "description": [
      "Lorem ipsum.",
      "Lorem ipsum.",
      "Lorem.ipsum."
    ],
    "images": {
      "coverIdx": 0,
      "gallery": [
        {
          "breakpoints": [
            300,
            600,
            1200,
            1800
          ],
          "paths": [
            "https://ik.imagekit.io/MatiPl01/tr:w-300/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1200/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1800/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg"
          ]
        },
        {
          "breakpoints": [
            350,
            800,
            1200,
            1200
          ],
          "paths": [
            "https://ik.imagekit.io/MatiPl01/tr:w-350/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352",
            "https://ik.imagekit.io/MatiPl01/tr:w-800/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352",
            "https://ik.imagekit.io/MatiPl01/tr:w-1200/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352",
            "https://ik.imagekit.io/MatiPl01/tr:w-1600/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352"
          ]
        }
      ]
    },
    "_id": "627b7d98f9fc41661a4dfc20",
    "mainUnitPrice": 13.02,
    "id": "627b7d98f9fc41661a4dfc20"
  }
}
```

#### Update Dish

Endpoint:
```
PATCH {{baseUrl}}/dishes/62783d50183e3ca423b02615
```
Authorization:
```
{{managerJWT}}
```
Body:
```json
{
  "images": {
    "coverIdx": 1,
    "gallery": {
      "0": {
        "breakpoints": {
          "0": 200,
          "2": 2000
        }
      },
      "1": {
        "breakpoints": {
          "0": 123
        },
        "paths": {
          "2": "aaaa"
        }
      }
    }
  },
  "stock": 5,
  "unitPrice": 42
}

```
Result:
```json
{
  "status": "success",
  "data": {
    "images": {
      "coverIdx": 1,
      "gallery": [
        {
          "breakpoints": [
            200,
            600,
            2000,
            1800
          ],
          "paths": [
            "https://ik.imagekit.io/MatiPl01/tr:w-300/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1200/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1800/restaurant/dishes/pexels-darko-trajkovic-10563880.jpg"
          ]
        },
        {
          "breakpoints": [
            123,
            800,
            1200,
            1200
          ],
          "paths": [
            "https://ik.imagekit.io/MatiPl01/tr:w-350/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352",
            "https://ik.imagekit.io/MatiPl01/tr:w-800/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352",
            "aaaa",
            "https://ik.imagekit.io/MatiPl01/tr:w-1600/restaurant/dishes/pexels-darko-trajkovic-10538803.jpg?updatedAt=1641592595352"
          ]
        }
      ]
    },
    "_id": "627b7d98f9fc41661a4dfc20",
    "name": "Test",
    "category": "ciasta",
    "cuisine": "testowa",
    "type": "test",
    "ingredients": [
      "mąka",
      "kakao",
      "czekolada",
      "cukier",
      "mleko",
      "jaja",
      "olej",
      "śmietana"
    ],
    "stock": 5,
    "currency": "EUR",
    "unitPrice": 42,
    "ratingsAverage": 0,
    "ratingsCount": 0,
    "description": [
      "Lorem ipsum.",
      "Lorem ipsum.",
      "Lorem.ipsum."
    ],
    "id": "627b7d98f9fc41661a4dfc20"
  }
}
```

#### Get Dish
Endpoint:
```
GET {{baseUrl}}/dishes/:id?...
```
Query Parameters:
```json
{
  "currency":"PLN"
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "images": {
      "coverIdx": 0,
      "gallery": [
        {
          "breakpoints": [
            400,
            600,
            1000,
            1400,
            1920
          ],
          "paths": [
            "https://ik.imagekit.io/MatiPl01/tr:w-400/restaurant/covers/vinicius-benedit_-_1GEAA8q3wk-unsplash_1_.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/covers/vinicius-benedit_-_1GEAA8q3wk-unsplash_1_.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1000/restaurant/covers/vinicius-benedit_-_1GEAA8q3wk-unsplash_1_.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1400/restaurant/covers/vinicius-benedit_-_1GEAA8q3wk-unsplash_1_.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1920/restaurant/covers/vinicius-benedit_-_1GEAA8q3wk-unsplash_1_.jpg"
          ],
          "_id": "62770f969e5fbcc62af98dff"
        },
        {
          "breakpoints": [
            400,
            600,
            1000,
            1400,
            1920
          ],
          "paths": [
            "https://ik.imagekit.io/MatiPl01/tr:w-400/restaurant/dishes/derek-duran-Jz4QMhLvGgw-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/dishes/derek-duran-Jz4QMhLvGgw-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1000/restaurant/dishes/derek-duran-Jz4QMhLvGgw-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1400/restaurant/dishes/derek-duran-Jz4QMhLvGgw-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1920/restaurant/dishes/derek-duran-Jz4QMhLvGgw-unsplash.jpg"
          ],
          "_id": "62770f969e5fbcc62af98e00"
        },
        {
          "breakpoints": [
            400,
            600,
            1000,
            1400,
            1920
          ],
          "paths": [
            "https://ik.imagekit.io/MatiPl01/tr:w-400/restaurant/dishes/riccardo-bergamini-O2yNzXdqOu0-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/dishes/riccardo-bergamini-O2yNzXdqOu0-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1000/restaurant/dishes/riccardo-bergamini-O2yNzXdqOu0-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1400/restaurant/dishes/riccardo-bergamini-O2yNzXdqOu0-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1920/restaurant/dishes/riccardo-bergamini-O2yNzXdqOu0-unsplash.jpg"
          ],
          "_id": "62770f969e5fbcc62af98e01"
        },
        {
          "breakpoints": [
            400,
            600,
            1000,
            1400,
            1920
          ],
          "paths": [
            "https://ik.imagekit.io/MatiPl01/tr:w-400/restaurant/dishes/mahmoud-fawzy-n1DePkKznLY-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/dishes/mahmoud-fawzy-n1DePkKznLY-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1000/restaurant/dishes/mahmoud-fawzy-n1DePkKznLY-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1400/restaurant/dishes/mahmoud-fawzy-n1DePkKznLY-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1920/restaurant/dishes/mahmoud-fawzy-n1DePkKznLY-unsplash.jpg"
          ],
          "_id": "62770f969e5fbcc62af98e02"
        },
        {
          "breakpoints": [
            400,
            600,
            1000,
            1400,
            1920
          ],
          "paths": [
            "https://ik.imagekit.io/MatiPl01/tr:w-400/restaurant/dishes/mahmoud-fawzy-MgvByrhYz24-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-600/restaurant/dishes/mahmoud-fawzy-MgvByrhYz24-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1000/restaurant/dishes/mahmoud-fawzy-MgvByrhYz24-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1400/restaurant/dishes/mahmoud-fawzy-MgvByrhYz24-unsplash.jpg",
            "https://ik.imagekit.io/MatiPl01/tr:w-1920/restaurant/dishes/mahmoud-fawzy-MgvByrhYz24-unsplash.jpg"
          ],
          "_id": "62770f969e5fbcc62af98e03"
        }
      ]
    },
    "_id": "62770f969e5fbcc62af98dfe",
    "name": "Sushi",
    "category": "owoce morza",
    "cuisine": "japońska",
    "type": "danie główne",
    "ingredients": [
      "wędzony łosoś",
      "awokado",
      "papryka",
      "ogórek",
      "ryż",
      "pasta wasabi"
    ],
    "stock": 43,
    "currency": "PLN",
    "unitPrice": 174.33,
    "ratingsAverage": 0,
    "ratingsCount": 0,
    "description": [
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis sunt laborum saepe debitis deserunt illo atque magnam quasi exercitationem aspernatur mollitia necessitatibus sit sed laudantium corrupti quam, error assumenda ex!",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis magni iste impedit maiores a praesentium ad ab eveniet. Nisi aliquid commodi quos recusandae. Sequi accusantium, nesciunt amet, tempore molestias nobis minus earum excepturi voluptate corporis eligendi fugit dignissimos officia impedit?",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia velit aspernatur alias voluptas non, odio corporis asperiores beatae numquam, quidem facilis ea sunt dignissimos cumque."
    ],
    "id": "62770f969e5fbcc62af98dfe"
  }
}
```
#### Get Filtered Dishes
Endpoint:
```
GET {{baseUrl}}/dishes?...
```
Query Parameters:
```json
{
  "ratingsAverage[it]": 5,
  "ratingsAverage[gte]": 0,
  "currency": "PLN",
  "category": "zupy,makarony",
  "fields": "-images",
  "unitPrice[it]": 55,
  "unitPrice[gte]": 15,
  "page": 2,
  "limit": 2
}
```
Result:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "627710669e5fbcc62af98e57",
      "name": "Zupa pomidorowa",
      "category": "zupy",
      "cuisine": "polska",
      "type": "danie główne",
      "ingredients": [
        "przecier pomidorowy",
        "świeże pomidory",
        "marchew",
        "por",
        "seler",
        "pietruszka",
        "ryż / makaron",
        "mięso z kurczaka"
      ],
      "stock": 212,
      "currency": "PLN",
      "unitPrice": 53.64,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "description": [
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis sunt laborum saepe debitis deserunt illo atque magnam quasi exercitationem aspernatur mollitia necessitatibus sit sed laudantium corrupti quam, error assumenda ex!",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis magni iste impedit maiores a praesentium ad ab eveniet. Nisi aliquid commodi quos recusandae. Sequi accusantium, nesciunt amet, tempore molestias nobis minus earum excepturi voluptate corporis eligendi fugit dignissimos officia impedit?",
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia velit aspernatur alias voluptas non, odio corporis asperiores beatae numquam, quidem facilis ea sunt dignissimos cumque."
      ],
      "id": "627710669e5fbcc62af98e57"
    }
  ]
}
```

#### Get Specific Fields Of One Dish
Endpoint:
```
GET {{baseUrl}}/dishes/:id?...
```
Query Parameters:
```json
{
  "fields": "name,unitPrice,currency,mainUnitPrice"
}
```
Result:
```json
{
  "status": "success",
  "data": {
    "_id": "627b7d98f9fc41661a4dfc20",
    "name": "Test",
    "currency": "EUR",
    "unitPrice": 42,
    "mainUnitPrice": 13.02,
    "id": "627b7d98f9fc41661a4dfc20"
  }
}
```

#### Get Specific Fields Of All Dishes
Endpoint:
```
GET {{baseUrl}}/dishes?...
```
Query Parameters:
```json
{
  "fields": "-images,-reviews,-ingredients,-description"
}
```
Result:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "62770f549e5fbcc62af98df3",
      "name": "Makaron Carbonara",
      "category": "makarony",
      "cuisine": "włoska",
      "type": "danie główne",
      "stock": 2,
      "currency": "EUR",
      "unitPrice": 20,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "62770f549e5fbcc62af98df3"
    },
    {
      "_id": "62770f969e5fbcc62af98dfe",
      "name": "Sushi",
      "category": "owoce morza",
      "cuisine": "japońska",
      "type": "danie główne",
      "stock": 43,
      "currency": "USD",
      "unitPrice": 39,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "62770f969e5fbcc62af98dfe"
    },
    {
      "_id": "62770fb09e5fbcc62af98e08",
      "name": "Makaron Bolognese",
      "category": "makarony",
      "cuisine": "włoska",
      "type": "danie główne",
      "stock": 94,
      "currency": "USD",
      "unitPrice": 18,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "62770fb09e5fbcc62af98e08"
    },
    {
      "_id": "62770fca9e5fbcc62af98e11",
      "name": "Lazania",
      "category": "makarony",
      "cuisine": "włoska",
      "type": "danie główne",
      "stock": 77,
      "currency": "USD",
      "unitPrice": 15,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "62770fca9e5fbcc62af98e11"
    },
    {
      "_id": "62770fda9e5fbcc62af98e19",
      "name": "Naleśniki z owocami",
      "category": "naleśniki",
      "cuisine": "polska",
      "type": "danie główne",
      "stock": 112,
      "currency": "USD",
      "unitPrice": 18,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "62770fda9e5fbcc62af98e19"
    },
    {
      "_id": "62770ff39e5fbcc62af98e22",
      "name": "Pancakes",
      "category": "naleśniki",
      "cuisine": "amerykańska",
      "type": "danie główne",
      "stock": 0,
      "currency": "USD",
      "unitPrice": 22,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "62770ff39e5fbcc62af98e22"
    },
    {
      "_id": "627710099e5fbcc62af98e2d",
      "name": "Tiramisu",
      "category": "ciasta",
      "cuisine": "włoska",
      "type": "słodycze",
      "stock": 298,
      "currency": "USD",
      "unitPrice": 16,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "627710099e5fbcc62af98e2d"
    },
    {
      "_id": "6277101b9e5fbcc62af98e35",
      "name": "Lody włoskie",
      "category": "na zimno",
      "cuisine": "włoska",
      "type": "słodycze",
      "stock": 437,
      "currency": "USD",
      "unitPrice": 10,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "6277101b9e5fbcc62af98e35"
    },
    {
      "_id": "6277102e9e5fbcc62af98e3f",
      "name": "Krążki z ciasta francuskiego",
      "category": "na zimno",
      "cuisine": "francuska",
      "type": "przystawki",
      "stock": 265,
      "currency": "USD",
      "unitPrice": 8,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "6277102e9e5fbcc62af98e3f"
    },
    {
      "_id": "6277103f9e5fbcc62af98e46",
      "name": "Barszcz czerwony",
      "category": "zupy",
      "cuisine": "polska",
      "type": "danie główne",
      "stock": 105,
      "currency": "USD",
      "unitPrice": 12,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "6277103f9e5fbcc62af98e46"
    },
    {
      "_id": "627710519e5fbcc62af98e4e",
      "name": "Zupa dyniowa",
      "category": "zupy",
      "cuisine": "polska",
      "type": "danie główne",
      "stock": 79,
      "currency": "USD",
      "unitPrice": 12,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "627710519e5fbcc62af98e4e"
    },
    {
      "_id": "627710669e5fbcc62af98e57",
      "name": "Zupa pomidorowa",
      "category": "zupy",
      "cuisine": "polska",
      "type": "danie główne",
      "stock": 212,
      "currency": "USD",
      "unitPrice": 12,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "627710669e5fbcc62af98e57"
    },
    {
      "_id": "627710779e5fbcc62af98e60",
      "name": "Pizza",
      "category": "pozostałe",
      "cuisine": "włoska",
      "type": "danie główne",
      "stock": 102,
      "currency": "USD",
      "unitPrice": 42,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "627710779e5fbcc62af98e60"
    },
    {
      "_id": "627710979e5fbcc62af98e6a",
      "name": "Risotto grzybowe",
      "category": "wegańskie",
      "cuisine": "włoska",
      "type": "danie główne",
      "stock": 124,
      "currency": "USD",
      "unitPrice": 24,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "627710979e5fbcc62af98e6a"
    },
    {
      "_id": "627b7d98f9fc41661a4dfc20",
      "name": "Test",
      "category": "ciasta",
      "cuisine": "testowa",
      "type": "test",
      "stock": 5,
      "currency": "EUR",
      "unitPrice": 42,
      "ratingsAverage": 0,
      "ratingsCount": 0,
      "id": "627b7d98f9fc41661a4dfc20"
    }
  ]
}
```

#### Get Dish Reviews
Endpoint:
```
GET {{baseUrl}}/dishes/:id/reviews?...
```
Query Parameters:
```json
{
  "page": 1,
  "limit": 1,
  "rating[gt]": 4,
  "fields": "-body,-order,-user"
}
```
Result:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "627b67a2d41ce4351afb5151",
      "dish": "62770f549e5fbcc62af98df3",
      "rating": 5,
      "dishName": "Makaron Carbonara",
      "createdAt": "2022-05-11T07:37:06.376Z",
      "updatedAt": "2022-05-11T07:38:27.143Z"
    }
  ]
}
```
#### Delete Dish
Endpoint:
```
DELETE {{baseUrl}}/dishes/:id
```
Authorization:
```
{{managerJWT}}
```
