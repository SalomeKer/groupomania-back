GROUPOMANIA
-----------

Voici le backend pour mon projet Groupomania p7.

### Technologies utilisées

- Node.js, Express, JWT, Multer
- MySQL hébergé sur PlanetScale
- Prisma pour l'ORM


### Pour lancer le projet Grouponania

1. Cloner la repo du projet
2. Faire un npm install
3. Renommer le fichier `.env.development` en `.env`
4. Remplir les données d'environnement du fichier `.env.development` avec vos propre variables d'environnement
5. Cette repo a été testés avec la base de données en ligne PlanetScale mySQL


### Comment utiliser Prisma pour communiquer avec la base de données 

Le db schema est à l'interieur du fichier `schema.prisma`, 
pour le modifier vous devrez lancer `npx prisma db push`
