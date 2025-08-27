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

export function test() {
  const maVoiture = new Voiture("Toyota", 0);
  maVoiture.accelerer();
}