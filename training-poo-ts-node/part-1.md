

# 📘 Mini-cours : La Programmation Orientée Objet (POO) et TypeScript

---

## 1. Comprendre la POO avec des analogies du monde réel

La **Programmation Orientée Objet (POO)** est une façon d’organiser ton code autour de **"choses"** (appelées **objets**) qui représentent des éléments du monde réel.

Chaque objet regroupe :

* **Des données** (propriétés, comme couleur, taille, etc.)
* **Des comportements** (méthodes ou fonctions, comme marcher(), accélérer(), etc.)

👉 **Exemple réel : une Voiture**

* **Propriétés** : couleur, marque, vitesse
* **Méthodes** : démarrer(), accélérer(), freiner()

En POO, une voiture devient donc un **objet** qui contient à la fois ses caractéristiques et ses actions.

---

### 🔑 Les 4 grands principes de la POO

1. **Encapsulation** : ranger données + fonctions dans une boîte fermée.
   → Exemple : une télécommande. Tu appuies sur les boutons sans savoir comment ça marche à l’intérieur.

2. **Abstraction** : cacher les détails techniques compliqués.
   → Exemple : tu conduis une voiture sans connaître la mécanique du moteur.

3. **Héritage** : créer une nouvelle classe à partir d’une autre.
   → Exemple : une **VoitureÉlectrique** hérite de **Voiture**, mais ajoute batterieRechargeable.

4. **Polymorphisme** : un même comportement peut s’adapter.
   → Exemple : une méthode **parler()** existe pour un humain (parler) et pour un chien (aboyer).

---
![poo](poo.png)
## 2. La POO appliquée en TypeScript

TypeScript est un **super JavaScript** qui ajoute la sécurité des **types**.
Il permet de créer des **classes, objets, héritages** facilement.

---

### Exemple 1 : Déclarer une classe simple

```typescript
class Voiture {
  marque: string;
  vitesse: number;

  constructor(marque: string, vitesse: number) {
    this.marque = marque;
    this.vitesse = vitesse;
  }

  accelerer(): void {
    this.vitesse += 10;
    console.log(`${this.marque} accélère à ${this.vitesse} km/h`);
  }
}

const maVoiture = new Voiture("Toyota", 0);
maVoiture.accelerer(); // Toyota accélère à 10 km/h
```

---

### Exemple 2 : Héritage

```typescript
class VoitureElectrique extends Voiture {
  batterie: number;

  constructor(marque: string, vitesse: number, batterie: number) {
    super(marque, vitesse); // on appelle le parent
    this.batterie = batterie;
  }

  recharger(): void {
    console.log(`${this.marque} recharge sa batterie à ${this.batterie}%`);
  }
}

const tesla = new VoitureElectrique("Tesla", 0, 80);
tesla.accelerer();   // Tesla accélère à 10 km/h
tesla.recharger();   // Tesla recharge sa batterie à 80%
```

---

### Exemple 3 : Importer / exporter des modules

**fichier `voiture.ts`**

```typescript
export class Voiture {
  marque: string;
  vitesse: number;

  constructor(marque: string, vitesse: number) {
    this.marque = marque;
    this.vitesse = vitesse;
  }

  accelerer(): void {
    this.vitesse += 10;
    console.log(`${this.marque} accélère à ${this.vitesse} km/h`);
  }
}
```

**fichier `main.ts`**

```typescript
import { Voiture } from "./voiture";

const peugeot = new Voiture("Peugeot", 0);
peugeot.accelerer();
```

---

## 3. Mise en place pratique dans VS Code

### Étape 1 : Installer les outils

1. **Installer Node.js** → [https://nodejs.org](https://nodejs.org)
   Vérifier dans le terminal :

   ```bash
   node -v
   npm -v
   ```

2. **Installer TypeScript**

   ```bash
   npm install -g typescript
   tsc -v
   ```

3. **Installer VS Code** → [https://code.visualstudio.com/](https://code.visualstudio.com/)
   👉 Extensions utiles :

   * TypeScript + JavaScript Language Features (déjà inclus)
   * Code Runner (pour exécuter rapidement)

---

### Étape 2 : Créer un projet TypeScript

```bash
mkdir projet-typescript
cd projet-typescript
npm init -y
tsc --init
```

👉 Cela crée un fichier `tsconfig.json` qui configure TypeScript.

---

### Étape 3 : Écrire ton premier fichier

Crée `index.ts` :

```typescript
class Voiture {
  marque: string;
  vitesse: number;

  constructor(marque: string, vitesse: number) {
    this.marque = marque;
    this.vitesse = vitesse;
  }

  accelerer(): void {
    this.vitesse += 10;
    console.log(`${this.marque} accélère à ${this.vitesse} km/h`);
  }
}

const maVoiture = new Voiture("Toyota", 0);
maVoiture.accelerer();
```

---

### Étape 4 : Compiler et exécuter

1. Compiler le code :

   ```bash
   tsc index.ts
   ```

   → Génère `index.js`

2. Lancer le code avec Node.js :

   ```bash
   node index.js
   ```

👉 Résultat attendu :

```
Toyota accélère à 10 km/h
```

---

### Étape 5 : Automatiser la compilation

Pour recompiler automatiquement :

```bash
tsc --watch
```

---

## 4. Types de fonctions en TypeScript

* **Sans retour :**

  ```typescript
  function direBonjour(): void {
    console.log("Bonjour !");
  }
  ```

* **Avec retour :**

  ```typescript
  function addition(a: number, b: number): number {
    return a + b;
  }
  ```

* **Fonction fléchée :**

  ```typescript
  const multiplier = (a: number, b: number): number => a * b;
  ```

---

## 5. Schéma visuel

Voici une représentation simple de la POO appliquée à la voiture :

![Schéma OOP](sandbox:/mnt/data/A_diagram_in_the_image_illustrates_Object-Oriented.png)

---

## 6. Documentation digeste

👉 [TypeScript en 5 minutes (officiel)](https://www.typescriptlang.org/fr/docs/handbook/typescript-in-5-minutes.html)
👉 [Tutoriel DigitalOcean – Bien débuter avec TypeScript](https://www.digitalocean.com/community/tutorials/typescript-getting-started-fr)

---

# ✅ Résumé pour ton apprenant

* **La POO** = penser en objets comme dans la vie réelle.
* **TypeScript** = JavaScript + sécurité des types.
* **Étapes pratiques** = Installer Node.js + TypeScript + VS Code → Créer projet → Écrire classes → Compiler → Exécuter.
* **Exemples fournis** : classes, héritage, import/export, fonctions.
