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


let a;
let b;

b= 2

a= {
    "a": 1,
    "b": { "a": [1,2,3], "g": "toto"},
    "c": b,
    "d": { "e": 5}
}

b= {
    "f": "test",
    "g": "tata"
}

function addition(number1, number2) {
    return number1 + number2
}
let c;
c = a

let d;
d=null

if (a.d?.e) {
    console.log("a.d?.e existe");
} else if (a.b?.g){
    console.log("a.b?.g existe");
}
console.log(b);
console.log(c);
console.log(d);