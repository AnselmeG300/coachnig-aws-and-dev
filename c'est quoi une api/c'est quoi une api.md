Parfait 👍 Voici une proposition de **mini-tutoriel clair, imagé et concis** pour expliquer à un novice ce qu’est une API et ce qu’est une API REST.

---

# 🌐 Mini-Tutoriel : Comprendre une API et une API REST

## 1. Qu’est-ce qu’une API ?

👉 **API** veut dire *Application Programming Interface*.

* Imagine un **restaurant** 🍽️ :

  * Toi = le client.
  * La cuisine = le système (les données, la logique).
  * Le serveur = **l’API**.

Tu ne vas pas dans la cuisine préparer ton plat. Tu donnes ta commande au serveur (API), et celui-ci va chercher l’information en cuisine, puis te rapporte une réponse claire.

👉 Donc : une API est **un intermédiaire** qui permet à deux systèmes de communiquer **sans que tu aies besoin de connaître les détails internes**.

---

## 2. Qu’est-ce qu’une API REST ?

REST = *Representational State Transfer*.
C’est un style de communication basé sur le **web** 🌍, qui utilise le protocole **HTTP** (le même que pour les sites internet).

Avec une API REST :

* Les ressources (ex. : "utilisateurs", "produits", "films") sont accessibles via des **URLs**.
* On utilise des **méthodes HTTP** pour dire ce qu’on veut faire sur ces ressources.

---

## 3. Les méthodes principales

Toujours avec l’analogie du restaurant :

* **GET** → demander le menu ou voir un plat (lire des infos).
* **POST** → commander un nouveau plat (ajouter une donnée).
* **PUT** → changer ta commande (modifier une donnée).
* **DELETE** → annuler ta commande (supprimer une donnée).

---

## 4. Les codes de réponse (HTTP Status Codes)

Quand tu fais une requête, l’API te répond toujours avec un **code** pour indiquer si tout s’est bien passé :

* **200 OK** ✅ → Tout est bon.
* **201 Created** 🎉 → Une nouvelle ressource a été créée.
* **400 Bad Request** ❌ → Ta demande est mal formulée.
* **401 Unauthorized** 🔑 → Tu n’as pas les droits.
* **404 Not Found** 🕵️ → La ressource demandée n’existe pas.
* **500 Internal Server Error** 💥 → Problème côté serveur.

---

## 5. Exemple concret simple

URL : `https://api.example.com/users`

* `GET /users` → Voir la liste des utilisateurs.
* `GET /users/1` → Voir l’utilisateur avec ID 1.
* `POST /users` → Créer un nouvel utilisateur.
* `PUT /users/1` → Modifier l’utilisateur 1.
* `DELETE /users/1` → Supprimer l’utilisateur 1.

---

✅ **En résumé** :

* Une API = le **serveur du restaurant** qui fait l’intermédiaire.
* Une API REST = une API qui utilise les règles simples du **web** (HTTP).
* On interagit avec des **méthodes** et on reçoit toujours une **réponse claire avec un code**.

---

Veux-tu que je t’en prépare une **version illustrée (schéma avec le restaurant et les méthodes)** pour que ce soit encore plus visuel et pédagogique ?
