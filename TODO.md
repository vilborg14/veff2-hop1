
- Bæta við routes fyrir tag og myndir
- Laga villukóða, 404 ekki til, 401 ekki leyfi, 400 viðeigandi villuskilaboð
- Skrifa jest test á 4 endpoints, amk 1 aupkenningar og amk 1 sem tekur við gögnum (POST?) (Gott að bara ljúka af, 4 test done, ekki gleyma að documenta hvernig skal keyra test í README)



# Hópverkefni 1 Vefforritun 2

Minnislista API

## Verkefna Requirements
- [x] 6 gagnatöflur, tengdar með `primary key`, `foreign key` og `unique`
- [x] Viðeignadi gagnatög og lengdir (database og innsetning)
- [ ] Mock gögn, 50 færslur amk
- [x] validation og sanitizion á gögnum (zod og xss)
- [ ] Setja viðeigandi kóða (404, 401, 400), og passa samræmi
- [x] Nota middleware til að passa upp á heimildir stjórnenda
- [ ] Nota Cloudinary fyrir myndir, eingöngu `jpg` og `pnd`
- [x] Setja upp eslint, megum ráða reglusetti alveg
- [ ] Setja upp jest test fyrir amk 4 endapunkta, og setja keyrsluleiðbeiningar í readme
- [x] Huga að almennu öryggi, OWASP top 10 ? *probs done, þvi við erum að nota xxs, zod og middleware*
- [ ] Setja upp á render + database á neon


## Routes TODO (functional)

**ATH: laga routes `/users/:id` og `/users/me`, þær eru ehv að blandas**

Nota JWT token fyrir notendur. Aðeins admin getur framkvæmt eftirfarandi:
- [x] `GET /` Skilar lista af öllum mögulegum slóðum
- [x] `GET /users` Skilar öllum notendum, ef notandi er admin. Síður ef fj > 10. 
- [x] `GET /users/:id` Skilar ákveðnum notanda, ef innskráður notandi er admin.
- [x] `PATCH /users/:id` Breytir stöðu notanda, ef innskráður notandi er admin og er ekki að breyta á sjálfum sér.

---
- [x] `POST /users/register` Býr til notanda, býr aldrei til admin.
- [x] `POST /users/login` Skilar token ef login er rétt.
- [x] `GET /users/me` Skilar notandaupplýsingum ef notandi er innskráður.
- [x] `PATCH /users/me` Uppfærir username og/eða lykiorð, ef notandi er innskráður.
---
Tasks
- [x] `GET /tasks` Lista öll task á ákveðin notenda,nota síður ef það skilar >10 svörum
- [x] `POST /tasks` Búa til nýtt task, nota JWT til að setja á réttan user.
- [x] `PATCH /tasks/:id` Uppfæra ákveðið task, innskráður notandi á það.
- [x] `DELETE /tasks/:id` Eyða ákveðnu taski, ef notandi á það.
- [x] `GET /tasks/:id` Sækir stakt task, ef notandi á það.
---
Category
**Óauðkendur notandi getur framkvæmt**
- [x] `GET /categories` Ná í öll categories
**Admin only routes** 
- [x] `POST /categories` Búa til category
- [x] `DELETE /categories/:id` Eyða category
---
Tag
TODO: bæta við og fjarlægja tögg á task
- [x] `POST /tags` Búa til tag
- [x] `POST /:taskId/tags/:tagId` Setur tag á task 
- [x] `GET /tags` Sækja öll tög
- [x] `DELETE /:taskId/tags/:tagId` Eyðir tag

--- 
Images
- [ ] `GET /images` sækja myndir
- [ ] `POST /images` Bæta við mynd 
- [ ] `DELETE /images/:id` Eyðir mynd
- [ ] `GET /images/:id` Nær í ákveðna mynd

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

## Mat
- 25% Gagnagrunnur og gögn.
- 30% Vefþjónustur.
- 15% Notendumsjón.
- 10% Myndastuðningur.
- 10% Tæki, tól og test. README uppsett, verkefni keyrir í hýsingu.
- 10% Hópavinna með Git og GitHub PR.
=======


