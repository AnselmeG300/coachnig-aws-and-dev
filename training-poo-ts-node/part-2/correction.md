# 📁 Structure conseillée

```
projet-typescript/
├─ src/
│  ├─ niveau1/
│  │  ├─ personne.ts
│  │  └─ animal.ts
│  ├─ niveau2/
│  │  ├─ employe.ts
│  │  ├─ chien.ts
│  │  └─ chat.ts
│  ├─ niveau3/
│  │  ├─ models/
│  │  │  ├─ personne.ts
│  │  │  └─ employe.ts
│  │  └─ main.ts
│  ├─ niveau4-biblio/
│  │  ├─ livre.ts
│  │  ├─ bibliotheque.ts
│  │  └─ main.ts
│  └─ niveau5-parking/
│     ├─ vehicule.ts
│     ├─ voiture.ts
│     ├─ moto.ts
│     ├─ parking.ts
│     └─ main.ts
└─ tsconfig.json
```

---

# ⚙️ Préparation (une seule fois)

Dans le dossier du projet :

```bash
npm init -y
npm install -D typescript
npx tsc --init
```

**`tsconfig.json` minimal recommandé** :

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src"]
}
```

**Compiler tout** : `npx tsc`
**Exécuter un niveau** : `node dist/<chemin>/main.js` (ou le fichier compilé si pas de `main.ts`).

> Astuce: pour exécuter plus vite sans compiler, tu peux installer `ts-node` en dev :
> `npm i -D ts-node` puis `npx ts-node src/<chemin>/main.ts`

---

## ✅ NIVEAU 1 — Les bases

### `src/niveau1/personne.ts`

```typescript
class Personne {
  nom: string;
  age: number;

  constructor(nom: string, age: number) {
    this.nom = nom;
    this.age = age;
  }

  sePresenter(): void {
    console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
  }
}

// Démo
const p1 = new Personne("Alice", 25);
p1.sePresenter();
```

### `src/niveau1/animal.ts`

```typescript
class Animal {
  nom: string;
  espece: string;

  constructor(nom: string, espece: string) {
    this.nom = nom;
    this.espece = espece;
  }

  crier(): void {
    console.log(`${this.espece} (${this.nom}) pousse un cri.`);
  }
}

// Démo
const a1 = new Animal("Mia", "Chat");
a1.crier();
```

**Exécuter (deux options)**

* Compiler : `npx tsc` puis `node dist/niveau1/personne.js` et `node dist/niveau1/animal.js`
* Ou direct : `npx ts-node src/niveau1/personne.ts`

---

## ✅ NIVEAU 2 — Héritage et polymorphisme

### `src/niveau2/employe.ts`

```typescript
class Personne {
  constructor(public nom: string, public age: number) {}
  sePresenter(): void {
    console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
  }
}

class Employe extends Personne {
  constructor(nom: string, age: number, public poste: string, public salaire: number) {
    super(nom, age);
  }

  travailler(): void {
    console.log(`${this.nom} travaille comme ${this.poste}.`);
  }
}

// Démo
const e1 = new Employe("Bob", 30, "Développeur", 3000);
e1.sePresenter();
e1.travailler();
```

### `src/niveau2/chien.ts`

```typescript
class Animal {
  constructor(public nom: string, public espece: string) {}
  crier(): void {
    console.log(`${this.espece} (${this.nom}) fait un bruit.`);
  }
}

class Chien extends Animal {
  constructor(nom: string) { super(nom, "Chien"); }
  crier(): void {
    console.log(`Le chien ${this.nom} aboie: Wouf!`);
  }
}

// Démo
const rex = new Chien("Rex");
rex.crier();
```

### `src/niveau2/chat.ts`

```typescript
class Animal {
  constructor(public nom: string, public espece: string) {}
  crier(): void {
    console.log(`${this.espece} (${this.nom}) fait un bruit.`);
  }
}

class Chat extends Animal {
  constructor(nom: string) { super(nom, "Chat"); }
  crier(): void {
    console.log(`Le chat ${this.nom} miaule: Miaou!`);
  }
}

// Démo
const mia = new Chat("Mia");
mia.crier();
```

---

## ✅ NIVEAU 3 — Organisation avec modules

### `src/niveau3/models/personne.ts`

```typescript
export class Personne {
  constructor(public nom: string, public age: number) {}
  sePresenter(): void {
    console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
  }
}
```

### `src/niveau3/models/employe.ts`

```typescript
import { Personne } from "./personne";

export class Employe extends Personne {
  constructor(nom: string, age: number, public poste: string, public salaire: number) {
    super(nom, age);
  }
  travailler(): void {
    console.log(`${this.nom} travaille comme ${this.poste}.`);
  }
}
```

### `src/niveau3/main.ts`

```typescript
import { Personne } from "./models/personne";
import { Employe } from "./models/employe";

const p = new Personne("Lina", 22);
p.sePresenter();

const e = new Employe("Sam", 28, "Designer", 2500);
e.sePresenter();
e.travailler();
```

**Exécuter**

```bash
npx tsc && node dist/niveau3/main.js
```

---

## ✅ NIVEAU 4 — Mini‑projet « Bibliothèque »

### `src/niveau4-biblio/livre.ts`

```typescript
export class Livre {
  constructor(
    public titre: string,
    public auteur: string,
    public disponible: boolean = true
  ) {}

  toString(): string {
    const statut = this.disponible ? "Disponible" : "Emprunté";
    return `"${this.titre}" par ${this.auteur} — ${statut}`;
    }
}
```

### `src/niveau4-biblio/bibliotheque.ts`

```typescript
import { Livre } from "./livre";

export class Bibliotheque {
  private livres: Livre[] = [];

  ajouterLivre(livre: Livre): void {
    this.livres.push(livre);
  }

  afficherLivres(): void {
    if (this.livres.length === 0) {
      console.log("Aucun livre.");
      return;
    }
    this.livres.forEach((l) => console.log(l.toString()));
  }

  emprunterLivre(titre: string): boolean {
    const livre = this.livres.find((l) => l.titre.toLowerCase() === titre.toLowerCase());
    if (!livre) {
      console.log(`Livre "${titre}" introuvable.`);
      return false;
    }
    if (!livre.disponible) {
      console.log(`"${livre.titre}" est déjà emprunté.`);
      return false;
    }
    livre.disponible = false;
    console.log(`Vous avez emprunté "${livre.titre}".`);
    return true;
  }
}
```

### `src/niveau4-biblio/main.ts`

```typescript
import { Livre } from "./livre";
import { Bibliotheque } from "./bibliotheque";

const biblio = new Bibliotheque();
biblio.ajouterLivre(new Livre("Clean Code", "Robert C. Martin"));
biblio.ajouterLivre(new Livre("You Don't Know JS", "Kyle Simpson"));

console.log("Catalogue initial :");
biblio.afficherLivres();

biblio.emprunterLivre("Clean Code");

console.log("\nAprès emprunt :");
biblio.afficherLivres();
```

**Exécuter**

```bash
npx tsc && node dist/niveau4-biblio/main.js
```

---

## ✅ NIVEAU 5 — Projet final « Parking »

### `src/niveau5-parking/vehicule.ts`

```typescript
export abstract class Vehicule {
  constructor(
    public marque: string,
    public plaque: string,
    public type: string
  ) {}

  abstract tarifer(): number; // coût horaire

  toString(): string {
    return `[${this.type}] ${this.marque} (${this.plaque})`;
  }
}
```

### `src/niveau5-parking/voiture.ts`

```typescript
import { Vehicule } from "./vehicule";

export class Voiture extends Vehicule {
  constructor(marque: string, plaque: string) {
    super(marque, plaque, "Voiture");
  }
  tarifer(): number {
    return 2.5; // €/heure
  }
}
```

### `src/niveau5-parking/moto.ts`

```typescript
import { Vehicule } from "./vehicule";

export class Moto extends Vehicule {
  constructor(marque: string, plaque: string) {
    super(marque, plaque, "Moto");
  }
  tarifer(): number {
    return 1.5; // €/heure
  }
}
```

### `src/niveau5-parking/parking.ts`

```typescript
import { Vehicule } from "./vehicule";

export class Parking {
  private places: Vehicule[] = [];

  ajouterVehicule(v: Vehicule): void {
    this.places.push(v);
    console.log(`${v.toString()} est entré(e) dans le parking.`);
  }

  retirerVehicule(plaque: string): void {
    const idx = this.places.findIndex(v => v.plaque === plaque);
    if (idx === -1) {
      console.log(`Aucun véhicule avec la plaque ${plaque}.`);
      return;
    }
    const v = this.places.splice(idx, 1)[0];
    console.log(`${v.toString()} a quitté le parking.`);
  }

  afficherVehicules(): void {
    if (this.places.length === 0) {
      console.log("Parking vide.");
      return;
    }
    this.places.forEach(v => console.log(v.toString()));
  }

  // Exemple d'utilisation du polymorphisme: total tarif horaire
  tarifHoraireTotal(): number {
    return this.places.reduce((sum, v) => sum + v.tarifer(), 0);
  }
}
```

### `src/niveau5-parking/main.ts`

```typescript
import { Parking } from "./parking";
import { Voiture } from "./voiture";
import { Moto } from "./moto";

const p = new Parking();

p.ajouterVehicule(new Voiture("Toyota", "AA-123-BB"));
p.ajouterVehicule(new Moto("Yamaha", "CC-456-DD"));

console.log("\nVéhicules présents :");
p.afficherVehicules();

console.log(`\nTarif horaire total: €${p.tarifHoraireTotal().toFixed(2)}`);

p.retirerVehicule("AA-123-BB");

console.log("\nAprès sortie :");
p.afficherVehicules();
```

**Exécuter**

```bash
npx tsc && node dist/niveau5-parking/main.js
```

---

## 🧪 Conseils pédagogiques

* Demande à l’apprenant d’**écrire d’abord sans regarder le corrigé**, puis de comparer.
* Ajoute de petits **objectifs bonus** (logger l’heure d’entrée au parking, calculer une facture selon la durée, etc.).
* Introduis des **types optionnels**, `private`/`protected`, **interfaces** et **génériques** au fur et à mesure.
