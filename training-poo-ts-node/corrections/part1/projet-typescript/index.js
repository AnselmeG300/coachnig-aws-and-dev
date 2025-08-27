"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Voiture {
    marque;
    vitesse;
    constructor(marque, vitesse) {
        this.marque = marque;
        this.vitesse = vitesse;
    }
    accelerer() {
        this.vitesse += 10;
        console.log(`${this.marque} accélère à ${this.vitesse} km/h`);
    }
}
const maVoiture = new Voiture("Toyota", 0);
maVoiture.accelerer();
//# sourceMappingURL=index.js.map