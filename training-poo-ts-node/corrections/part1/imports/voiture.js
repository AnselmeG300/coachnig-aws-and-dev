"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voiture = void 0;
exports.test = test;
var Voiture = /** @class */ (function () {
    function Voiture(marque, vitesse) {
        this.marque = marque;
        this.vitesse = vitesse;
    }
    Voiture.prototype.accelerer = function () {
        this.vitesse += 10;
        console.log("".concat(this.marque, " acc\u00E9l\u00E8re \u00E0 ").concat(this.vitesse, " km/h"));
    };
    return Voiture;
}());
exports.Voiture = Voiture;
function test() {
    var maVoiture = new Voiture("Toyota", 0);
    maVoiture.accelerer();
}
