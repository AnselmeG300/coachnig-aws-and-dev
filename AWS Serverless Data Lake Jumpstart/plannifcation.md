### Planification des étapes de transformation des données

1. Lire les données de trajet jaunes du tableau S3.raw_yellow_tripdata
2. Nettoyer les données de voyage jaunes.
    - Supprimez les enregistrements avec des valeurs NULL (vendorid, payment_type, passenger count, ratecodeid).
    - Filtrez les enregistrements au cours d’une période donnée (supprimez les enregistrements dont la date et l’heure de retrait ne sont pas valides, limitez les données à traiter).
3. Associez les données de trajet jaunes à la recherche de zone de taxi pour obtenir des informations sur le lieu de prise en charge.
    - Lire les données de recherche de la table S3.raw_taxi_zone_lookup
    - Renommez les noms de colonne des données de recherche pour différencier les lieux de prise en charge des lieux de dépôt.
    - Effectuez la jointure.
4. Associez les données de trajet jaunes à la recherche de zone de taxi pour obtenir des informations sur le lieu de dépose.
    - Lire les données de recherche de la table S3.raw_taxi_zone_lookup
    - Renommez les noms de colonne des données de recherche pour différencier les lieux de dépôt des lieux de retrait.
    - Effectuez la jointure.
5. Effectuez une transformation de données sur un jeu de données joint.
    - Renommez les noms de colonnes.
    - Définissez les types de données appropriés.
    - Supprimez les colonnes redondantes à la suite de jointures de tables.
6. Enregistrez le jeu de données traité dans S3 dans un format optimisé pour les requêtes.