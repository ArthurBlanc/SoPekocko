# So Pekocko 🌶️🍴

![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/ArthurBlanc)

<a href="#description-fr-">README en Français</a> - <a href="#en-description">English README</a>

## Description FR :

Ceci est un projet réalisé dans le cadre du programme de formation Développeur Web chez [OpenClassrooms](https://openclassrooms.com/fr/paths/717-developpeur-web)

> Créez le backend et l'API d'une application d'avis gastronomiques en utilisant les technologies OWASP, Node.js, MongoDB et Express.
>
> #### Compétences évaluées :
>
> -   Mettre en œuvre des opérations CRUD de manière sécurisée 🔒
> -   Stocker des données de manière sécurisée 🗄️
> -   Implémenter un modèle logique de données conformément à la réglementation 📊

### Situation (fictive) du projet :

Développeur web freelance depuis quelques années sur différents projets web.

Je suis contacté par une marque de sauces piquantes à succès qui souhaite développer une application d'évaluation de ses sauces piquantes, qui pourrait devenir dans le futur un magasin en ligne. Le product owner de la marque, décide que le MVP (Minimum Viable Product) du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.

Mon rôle a été de créer le back-end et l'API du MVP de cette application à l'aide de Node.js, Express et MongoDB.

### Cahier des charges :

#### Exigences concernant la sécurité :

-   L’API doit respecter le RGPD et les standards OWASP
-   Le mot de passe des utilisateurs doit être chiffré
-   Deux types de droits administrateur à la base de données doivent être définis :
    -   Un accès pour supprimer ou modifier des tables
    -   Un accès pour éditer le contenu de la base de données
-   La sécurité de la base de données MongoDB (à partir d’un service tel que MongoDBAtlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine
-   L’authentification est renforcée sur les routes requises
-   Les mots de passe sont stockés de manière sécurisée
-   Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.

#### Erreurs API :

-   Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire, utiliser une nouvelle Erreur()

#### Routes API :

-   Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Bearer [token]")

## Installation :

### Installation et lancement du back-end :

1. Cloner le repository du back-end :

-   `git clone https://github.com/ArthurBlanc/SoPekocko`

2. Installer toutes les dépendances pour le back-end :

-   `npm install` ou `yarn`

3. Créez un fichier **_.env_** et remplisez le en prenant comme exemple le fichier **_.env.example_**

4. Lancer le back-end :

-   `node server` ou `nodemon server`

### Installation et lancement du front-end :

1. Cloner le repository du front-end :

-   `git clone https://github.com/ArthurBlanc/SoPekocko-Frontend`

2. Installer la version 4.14.1 de node-sass :

-   `npm install node-sass@4.14.1` ou `yarn add node-sass@4.14.1`

2. Installer toutes les dépendances pour le front-end :

-   `npm install` ou `yarn`

4. Lancer le front-end :

-   `ng serve`

## Développé avec :

-   [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de texte
-   [GitHub](https://github.com/) - Outil de gestion de versions
-   [Node.js](https://nodejs.org/en/) - Plateforme pour exécuter du code JavaScript côté serveur
-   [Express](https://expressjs.com/fr/) - Framework web pour Node.js
-   [MongoDB](https://www.mongodb.com/fr) - Base de données NoSQL stockant des documents JSON

## Auteur :

**Arthur Blanc** : [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/portfolio)

---

## EN Description:

This is a project carried out as part of the Web Developer training program at [OpenClassrooms](https://openclassrooms.com/en/paths/555-web-developer).

> Create the backend and API of a gastronomic review application using OWASP technologies, Node.js, MongoDB, and Express.
>
> #### Evaluated skills:
>
> -   Implement CRUD operations securely 🔒
> -   Store data securely 🗄️
> -   Implement a logical data model in accordance with regulations 📊

### Project (fictional) situation:

As a freelance web developer for several years on different web projects.

I was contacted by a successful hot sauce brand that wanted to develop an application to evaluate its hot sauces, which could become an online store in the future. The product owner of the brand decides that the MVP (Minimum Viable Product) of the project will be a web application allowing users to add their favorite sauces and like or dislike sauces added by other users.

My role was to create the back-end and API of the MVP of this application using Node.js, Express, and MongoDB.

### Specifications:

#### Security requirements:

-   The API must comply with GDPR and OWASP standards.
-   User passwords must be encrypted.
-   Two types of administrator rights to the database must be defined:
    -   Access to delete or modify tables.
    -   Access to edit the content of the database.
-   The security of the MongoDB database (from a service such as MongoDBAtlas) must be such that the validator can launch the application from their machine.
-   Authentication is strengthened on the required routes.
-   Passwords are stored securely.
-   Email addresses in the database are unique and an appropriate Mongoose plugin is used to ensure their uniqueness and report errors.

#### API Errors:

-   All errors must be returned as is, without any modification or addition. If necessary, use a new Error()

#### API Routes:

-   All routes related to the sauce must require an authenticated request (containing a valid token in its authorization header: "Bearer [token]")

## Installation:

### Installing and launching Back-end:

1. Clone the back-end repository:

-   `git clone https://github.com/ArthurBlanc/SoPekocko`

2. Install all dependencies for Back-end:

-   `npm install` or `yarn`

3. Create a **_.env_** file and fill it like **_.env.example_**

4. Launch back-end:

-   `node server` or `nodemon server`

### Installing and launching Front-end:

1. Clone the front-end repository:

-   `git clone https://github.com/ArthurBlanc/SoPekocko-Frontend`

2. Install version 4.14.1 of node-sass:

-   `npm install node-sass@4.14.1` or `yarn add node-sass@4.14.1`

2. Install all dependencies for Front-end:

-   `npm install` or `yarn`

4. Launch Front-end:

-   `ng serve`

## Build With:

-   [Visual Studio Code](https://code.visualstudio.com/) - Text editor
-   [GitHub](https://github.com/) - Version control tool
-   [Node.js](https://nodejs.org/en/) - Platform for running server-side JavaScript code
-   [Express](https://expressjs.com/fr/) - Web framework for Node.js
-   [MongoDB](https://www.mongodb.com/fr) - NoSQL database storing JSON documents

## Author:

**Arthur Blanc**: [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/portfolio)
