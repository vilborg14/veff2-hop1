<<<<<<< HEAD
# Hópverkefni 1 Vefforritun 2

Minnislista API

## Verkefna Requirements
- [ ] 6 gagnatöflur, tengdar með `primary key`, `foreign key` og `unique`
- [ ] Viðeignadi gagnatög og lengdir (database og innsetning)
- [ ] Mock gögn, 50 færslur amk
- [ ] validation og sanitizion á gögnum (zod og xss)
- [ ] Setja viðeigandi kóða (404, 401, 400), og passa samræmi
- [ ] Nota middleware til að passa upp á heimildir stjórnenda
- [ ] Nota Cloudinary fyrir myndir, eingöngu `jpg` og `pnd`
- [ ] Setja upp eslint, megum ráða reglusetti alveg
- [ ] Setja upp jest test fyrir amk 4 endapunkta, og setja keyrsluleiðbeiningar í readme
- [ ] Huga að almennu öryggi, OWASP top 10
- [ ] Setja upp á render + database á neon?


## Routes TODO (functional)
Nota JWT token fyrir notendur. Aðeins admin getur framkvæmt eftirfarandi:
- [ ] `GET /` Skilar lista af öllum mögulegum slóðum

- [ ] `GET /users` Skilar öllum notendum, ef notandi er admin. Síður ef fj > 10. 
- [ ] `GET /users/:id` Skilar ákveðnum notanda, ef innskráður notandi er admin.
- [ ] `PATCH /users/:id` Breytir stöðu notanda, ef innskráður notandi er admin og er ekki að breyta á sjálfum sér.
- [ ] `POST` bæta við hér..
- [ ] `DELETE` .. skv verkefnalýsingu
---
- [ ] `POST /users/register` Býr til notanda, býr aldrei til admin.
- [ ] `POST /users/login` Skilar token ef login er rétt.
- [ ] `GET /users/me` Skilar notandaupplýsingum ef notandi er innskráður.
- [ ] `PATCH /users/me` Uppfærir username og/eða lykiorð, ef notandi er innskráður.
---
Tasks
- [ ] `GET /tasks` Lista öll task á ákveðin notenda,nota síður ef það skilar >10 svörum
- [ ] `POST /tasks` Búa til nýtt task, nota JWT til að setja á réttan user.
- [ ] `PATCH /tasks/:id` Uppfæra ákveðið task, innskráður notandi á það.
- [ ] `DELETE /tasks/:id` Eyða ákveðnu taski, ef notandi á það.
- [ ] `GET /tasks/:id` Sækir stakt task, ef notandi á það.
---
Category
- [ ] `GET /categories` Ná í öll categories
- [ ] `POST /categories` Búa til category
- [ ] `DELETE /categories/:id` Eyða category
---
Tag
TODO: bæta við og fjarlægja tögg á task
- [ ] `POST /tags` Búa til tag
- [ ] `GET /tags` Sækja öll tög
- [ ] `POST` ...
- [ ] `DELETE` ...

--- 
Images
- [ ] `GET /tasks/:taskId/images` sækja myndir sem tilheyra taski
- [ ] `POST /tasks/:taskId/images` Bæta við mynd við task 
- [ ] `DELETE /images/:id` Eyðir mynd

## Gögn

- User: admin eða ekki
    - id
    - username: unique
    - password: hashed
    - admin: default false

- Task: task með ýmiss attribute
    - id
    - title
    - description?
    - tags[]
    - tenging við user, category og tag
    - fleiri optional attributes eins og priority, due, etc. 

- Category: 
    - id
    - name

- Tag: öll möguleg tags
    - id
    - name

- TaskTags: many-to-many tengin milli task og tag
    - taskId
    - tagId

- TaskImage: geymir myndir, og það task sem notar þá mynd
    - id
    - url
    - taskId


## Tól

- Typescript
- Node.js
- Prisma: database, postgres
- Hono: routes
- Cloudinary: myndashit



## Hópur ??

- Ásgerður Júlía
- Freydís Xuan
- Hermann Ingi
- Vilborg


## Mat
- 25% Gagnagrunnur og gögn.
- 30% Vefþjónustur.
- 15% Notendumsjón.
- 10% Myndastuðningur.
- 10% Tæki, tól og test. README uppsett, verkefni keyrir í hýsingu.
- 10% Hópavinna með Git og GitHub PR.
=======
```
npm install
npm run dev
```

```
open http://localhost:3000
```


## Verkefni kröfur

6 töflur af gögnum, tengja ehv amk



- [ ] Gera alla userpaths með auðkenningarshiti


## Nota
- Hono
- Prisma
- Cloudinary

- JWT token


>>>>>>> 54ff227 (login og jwd authentication)
