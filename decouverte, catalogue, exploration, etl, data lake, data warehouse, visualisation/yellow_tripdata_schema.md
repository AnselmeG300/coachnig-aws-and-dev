
Voici **l’explication champ par champ** avec leur rôle, format, et exemple.

---

## 📋 Description des colonnes

| **Colonne**                 | **Description**                                                                                                                         | **Type / Format** | **Exemple**           |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------------- |
| **`VendorID`**              | Code identifiant le fournisseur du taxi. Généralement : `1` = Creative Mobile Technologies, `2` = VeriFone Inc.                         | `INT`             | `2`                   |
| **`tpep_pickup_datetime`**  | Date et heure de début de la course (TPEP = Taxi Point of Entry Protocol).                                                              | `TIMESTAMP`       | `2020-01-15 08:17:00` |
| **`tpep_dropoff_datetime`** | Date et heure de fin de la course.                                                                                                      | `TIMESTAMP`       | `2020-01-15 08:45:00` |
| **`passenger_count`**       | Nombre de passagers déclarés par le chauffeur (non toujours fiable).                                                                    | `INT`             | `2`                   |
| **`trip_distance`**         | Distance de la course en miles, calculée par le taximètre.                                                                              | `FLOAT`           | `3.25`                |
| **`RatecodeID`**            | Code tarif appliqué. Valeurs typiques : `1` = Standard, `2` = JFK, `3` = Newark, `4` = Nassau/Westchester, `5` = négocié, `6` = groupe. | `INT`             | `1`                   |
| **`store_and_fwd_flag`**    | Indique si les données ont été stockées localement avant transmission au serveur (Y = oui, N = non).                                    | `CHAR(1)`         | `N`                   |
| **`PULocationID`**          | ID de la zone de **prise en charge** (Pickup Location ID). Fait référence à `LocationID` dans `taxi_zone_lookup.csv`.                   | `INT`             | `142`                 |
| **`DOLocationID`**          | ID de la zone de **dépose** (Dropoff Location ID). Fait référence à `LocationID` dans `taxi_zone_lookup.csv`.                           | `INT`             | `236`                 |
| **`payment_type`**          | Méthode de paiement : `1` = carte, `2` = cash, `3` = sans frais, `4` = dispute, `5` = inconnu, `6` = multiple.                          | `INT`             | `1`                   |
| **`fare_amount`**           | Montant de la course en dollars (hors taxes et suppléments).                                                                            | `FLOAT`           | `12.50`               |
| **`extra`**                 | Suppléments divers (par ex. surcharge de nuit, de week-end).                                                                            | `FLOAT`           | `0.50`                |
| **`mta_tax`**               | Taxe imposée par la Metropolitan Transportation Authority (\$0.50).                                                                     | `FLOAT`           | `0.50`                |
| **`tip_amount`**            | Pourboire en dollars (0 si paiement en cash sans déclaration).                                                                          | `FLOAT`           | `3.00`                |
| **`tolls_amount`**          | Montant des péages durant la course.                                                                                                    | `FLOAT`           | `5.76`                |
| **`improvement_surcharge`** | Surcharge fixe (\$0.30) pour améliorer le service.                                                                                      | `FLOAT`           | `0.30`                |
| **`total_amount`**          | Montant total payé par le client (somme de tous les éléments précédents).                                                               | `FLOAT`           | `22.06`               |
| **`congestion_surcharge`**  | Surcharge liée à la congestion (\$2.50 pour Manhattan en journée).                                                                      | `FLOAT`           | `2.50`                |

---



