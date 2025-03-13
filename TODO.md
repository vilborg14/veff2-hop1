
# Hópverkefni 1 Vefforritun 2 

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

## Mat
- 25% Gagnagrunnur og gögn.
- 30% Vefþjónustur.
- 15% Notendumsjón.
- 10% Myndastuðningur.
- 10% Tæki, tól og test. README uppsett, verkefni keyrir í hýsingu.
- 10% Hópavinna með Git og GitHub PR.



