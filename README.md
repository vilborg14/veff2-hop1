# Hópverkefni 1 Vefforritun 2

https://veff2-hop1.onrender.com/



## Routes
``` Json
[
  {
    "path": "/",
    "method": "GET"
  },
  {
    "path": "/users",
    "method": "GET"
  },
  {
    "path": "/users/:id",
    "method": "GET"
  },
  {
    "path": "/users/:id",
    "method": "PATCH"
  },
  {
    "path": "/users/register",
    "method": "POST"
  },
  {
    "path": "/users/login",
    "method": "POST"
  },
  {
    "path": "/tasks",
    "method": "GET"
  },
  {
    "path": "/tasks/:id",
    "method": "GET"
  },
  {
    "path": "/tasks",
    "method": "POST"
  },
  {
    "path": "/tasks/:id",
    "method": "DELETE"
  },
  {
    "path": "/tasks/:id",
    "method": "PATCH"
  },
  {
    "path": "/tasks/:taskId/tags/:tagId",
    "method": "POST"
  },
  {
    "path": "/tasks/:taskId/tags/:tagId",
    "method": "DELETE"
  },
  {
    "path": "/categories",
    "method": "GET"
  },
  {
    "path": "/categories",
    "method": "POST"
  },
  {
    "path": "/categories/:id",
    "method": "DELETE"
  },
  {
    "path": "/tags",
    "method": "GET"
  },
  {
    "path": "/tags",
    "method": "POST"
  },
  {
    "path": "/tags/:id",
    "method": "PATCH"
  },
  {
    "path": "/tags/:id",
    "method": "DELETE"
  },
  {
    "path": "/images",
    "method": "GET"
  },
  {
    "path": "/images",
    "method": "POST"
  },
  {
    "path": "/images/:id",
    "method": "DELETE"
  }
]
```

## Routes TODO (functional)

- [x] `GET /` Skilar lista af öllum mögulegum slóðum

Nota JWT token fyrir notendur. Aðeins admin getur framkvæmt eftirfarandi:
- [x] `GET /users` Skilar öllum notendum, ef notandi er admin. Síður ef fj > 10. 
- [x] `GET /users/:id` Skilar ákveðnum notanda, ef innskráður notandi er admin.
- [x] `PATCH /users/:id` Breytir stöðu notanda, ef innskráður notandi er admin og er ekki að breyta á sjálfum sér.
---
- [x] `POST /users/register` Býr til notanda, býr aldrei til admin.
- [x] `POST /users/login` Skilar token ef login er rétt.
---
Tasks
- [x] `GET /tasks` Lista öll task á ákveðin notenda,nota síður ef það skilar >10 svörum
- [x] `POST /tasks` Búa til nýtt task, nota JWT til að setja á réttan user.
- [x] `PATCH /tasks/:id` Uppfæra ákveðið task, innskráður notandi á það.
- [x] `DELETE /tasks/:id` Eyða ákveðnu taski, ef notandi á það.
- [x] `GET /tasks/:id` Sækir stakt task, ef notandi á það.
---
Tag
TODO: bæta við og fjarlægja tögg á task
- [x] `POST /tags` Búa til tag
- [x] `GET /tags` Sækja öll tög
- [x] `DELETE /tags/:id` Eyða ákveðnu tagi
- [x] `PATCH /tags/:id` Breyta ákveðnu tagi
---
Category
**Óauðkendur notandi getur framkvæmt**
- [x] `GET /categories` Ná í öll categories
**Admin only routes** 
- [x] `POST /categories` Búa til category
- [x] `DELETE /categories/:id` Eyða category
---
Images
**Opið route, allir, óinnskráðir**
- [x] `GET /images` sækja myndir
- [x] `POST /images` Bæta við mynd 
- [x] `DELETE /images/:id` Eyðir mynd

## Keyrsla verkefnis

postman_collection.json skrá er í rót verkefnis, hægt er að opna hana í postman, þar eru allir routes, með dæmi um innsettningu. 


```bash
git clone <repo url>

cd veff2-hop1

npm install 

## prisma todo hér + .env

npx prisma migrate # prisma dot


npx prisma migrate reset # ef database er ekki tómur
npx ts-node prisma/seed.js # seeder for prisma, með mock gögnum

npm run dev  #localhost:3000
npm run lint # linter

```

## Admin

```json
{
    "username": "admin",
    "password": "password"
}
{
    "username" : "user1",
    "password": "password"
}

```
## Dæmi um köll í vefþjónustu

Til að skoða lokuð route þarf first að skrá sig inn á notenda, og svo afritar token í header. 
```json
# register og login 
{
    "username": "admin",
    "password": "password"
}

skilar notenda (register) eða JWT token (login)

```

```json
búa til category

{
    "title": "Category 3"
}
```

búa til task, setja alvöru userId í þar
```json
{
    "title": "Task 3",
    "description": "owned by admin, put in category 1",
    "due": null,
    "categoryId": null,
    "userId": "e11ec69a-7a6e-4caa-9007-38b0db5f6ea9"
}
```

búa til tag
``` json
{
    "name" : "Work"
}
```


## Hópmeðlimir, hópur 5
|Nafn |Netfang|Notendanafn|
|---|----|--|
|Ásgerður Júlía |ajg20@hi.is | `asgerdur03`| 
|Freydís Xuan|fxl1@hi.is|`freydisxuan`|
|Hermann Ingi|hih65@hi.is|`hemmih`|
|Vilborg|vie15@hi.is|`vilborg14`|