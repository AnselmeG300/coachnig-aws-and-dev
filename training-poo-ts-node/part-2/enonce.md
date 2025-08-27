# 📝 Exercices pratiques pour s’entraîner avec TypeScript et la POO

---

## 🎯 Niveau 1 : Les bases

1. **Créer une classe `Personne`**

   * Propriétés : `nom`, `âge`
   * Méthode : `sePresenter()` qui affiche :
     `"Bonjour, je m'appelle X et j'ai Y ans"`

2. **Créer une classe `Animal`**

   * Propriétés : `nom`, `espece`
   * Méthode : `crier()` (par ex. `"Le chien aboie"` ou `"Le chat miaule"`)

👉 Objectif : comprendre **classe**, **propriétés**, **méthodes**.

---

## 🎯 Niveau 2 : Héritage et polymorphisme

1. **Créer une classe `Employe` qui hérite de `Personne`**

   * Propriétés supplémentaires : `poste`, `salaire`
   * Méthode : `travailler()` qui affiche une phrase selon le poste.

2. **Créer une classe `Chien` et `Chat` qui héritent de `Animal`**

   * Redéfinir la méthode `crier()` différemment pour chaque animal.

👉 Objectif : comprendre **héritage** et **polymorphisme**.

---

## 🎯 Niveau 3 : Organisation avec modules

1. Créer un fichier `personne.ts` qui exporte la classe `Personne`.
2. Créer un fichier `employe.ts` qui exporte la classe `Employe`.
3. Créer un fichier `main.ts` qui importe ces classes, crée des objets et les utilise.

👉 Objectif : apprendre à **importer/exporter** ses classes.

---

## 🎯 Niveau 4 : Cas concret (mini-projet)

**Projet : Gestion d’une Bibliothèque 📚**

* Créer une classe `Livre` avec : `titre`, `auteur`, `disponible` (booléen).
* Créer une classe `Bibliotheque` avec :

  * Une liste de livres (array).
  * Une méthode `ajouterLivre(livre: Livre)`.
  * Une méthode `afficherLivres()`.
  * Une méthode `emprunterLivre(titre: string)` qui change `disponible` à `false`.

👉 Objectif : manipuler **tableaux d’objets** + POO.

---

## 🎯 Niveau 5 : Projet final (plus réaliste)

**Projet : Gestion d’un Parking 🚗**

* Classe `Vehicule` (propriétés : `marque`, `plaque`, `type`).
* Classe `Voiture` et `Moto` qui héritent de `Vehicule`.
* Classe `Parking` :

  * Liste de véhicules.
  * Méthode `ajouterVehicule()`.
  * Méthode `retirerVehicule()`.
  * Méthode `afficherVehicules()`.

👉 Objectif : utiliser **héritage, polymorphisme, organisation en modules**.

---

# ✅ Progression conseillée

* **Jour 1** : Niveau 1 (bases des classes et objets)
* **Jour 2** : Niveau 2 (héritage et polymorphisme)
* **Jour 3** : Niveau 3 (organisation en modules, import/export)
* **Jour 4** : Mini-projet bibliothèque
* **Jour 5** : Projet final parking

---

👉 Ces exercices sont **progressifs et concrets**, ce qui permet à l’apprenant de voir directement le lien entre la **théorie POO** et le **monde réel**.


