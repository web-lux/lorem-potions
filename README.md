▶️ [Demo](https://lorem-potions.fly.dev/categories)

## 📄 Description
Une application CRUD de gestion d'inventaire réalisée dans le cadre de l'[Odin Project](https://www.theodinproject.com/lessons/nodejs-inventory-application). Les descriptions des potions, ainsi que leurs noms et ceux des catégories sont tirés du jeu *Potionomics*. L'application a été codée en Express. Elle utilise MongoDB pour ses bases de données (couplé à Mongoose) ce qui rend chaque modifications de ses données par l'administrateur durables. 

- L'utilisateur peut voir les catégories et les potions de la boutique. 
- Il peut filtrer les catégories aussi bien que les potions via une barre de recherche.
- Il peut créer une nouvelle catégorie ou une nouvelle potion à condition de détenir le mot de passe administrateur. 
- L'application est hébergée sur Fly.io, où le mot de passe administrateur est stocké via une variable ENV (appelés *secrets* par Fly.io).  
- Sur la page "Détails" d'une catégorie, l'utilisateur peut directement accéder à une potion spécifique de ladite catégorie en cliquant sur son nom.
- De l'index des potions, il peut accéder aux détails des potions ou de la catégorie concernée en cliquant sur leurs noms.
- Il peut modifier et supprimer toutes les entrées de l'inventaire à condition de détenir le mot de passe administrateur. 
- L'utilisateur ne peut pas supprimer une catégorie si elle contient encore une potion. En revanche, il peut supprimer les potions à loisirs.
- Lorsqu'il crée un nouvel élement dans l'inventaire, les inputs de l'utilisateur sont validés et *sanitized* par Express-Validator.

## 🔨 Outils utilisés
- NodeJS
- Express
- MongoDB
- Mongoose
- EJS
- CSS