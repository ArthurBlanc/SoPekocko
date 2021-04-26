# P6

![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/ArthurBlanc)


## Description :

> Créez le backend et l'API d'une application d'avis gastronomiques en utilisant les technologies OWASP, Node.js, MongoDB et Express.
>
> #### Compétences évaluées
>
> -   Mettre en œuvre des opérations CRUD de manière sécurisée
> -   Stocker des données de manière sécurisée
> -   Implémenter un modèle logique de données conformément à la réglementation

### Situation (fictive) du projet :

Développeur web freelance depuis quelques années sur différents projets web.

Je suis contacté par une marque de sauces piquantes à succès qui souhaite développer une application d'évaluation de ses sauces piquantes, qui pourrait devenir dans le futur un magasin en ligne. Le product owner de la marque, décide que le MVP (Minimum Viable Product) du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.

Mon rôle a été de créer le back-end et l'API du MVP de cette application à l'aide de Node.js, Express et MongoDB.

### Cahier des charges :

#### Exigences concernant la sécurité :
- L’API doit respecter le RGPD et les standards OWASP
- Le mot de passe des utilisateurs doit être chiffré
- Deux types de droits administrateur à la base de données doivent être définis :
  - Un accès pour supprimer ou modifier des tables
  - Un accès pour éditer le contenu de la base de données
- La sécurité de la base de données MongoDB (à partir d’un service tel que MongoDBAtlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine
- L’authentification est renforcée sur les routes requises
- Les mots de passe sont stockés de manière sécurisée
- Les adresses mails de la base de données sont uniques et un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.

#### Erreurs API :
- Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire, utiliser une nouvelle Erreur()

#### Routes API :
- Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Bearer [token]")

## Installation

-   **Exécutez Git bash**
-   **git clone https://github.com/ArthurBlanc/ArthurBlanc_6_17012021**
    -   Dans le dossier du premier projet, exécutez la commande ***npm install***, une fois l'installation terminée, créez un fichier ***.env*** et remplisez le en prenant comme exemple le fichier ***.env.example***, enfin démarrez le serveur avec la commande ***node server*** ou ***nodemon server***.
-   **git clone https://github.com/OpenClassrooms-Student-Center/dwj-projet6**
    -   Dans le dossier du second projet, exécutez la commande ***npm install node-sass@4.14.1*** puis ***npm install***, une fois l'installation terminée, démarrez avec la commande ***ng serve*** puis rendez-vous sur http://localhost:4200/.

## Développé avec

-   [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de texte et son intégration de GitHub
-   [GitHub](https://github.com/) - Outil de gestion de versions
-   [Node.js](https://nodejs.org/en/) - Une plateforme logicielle libre en JavaScript
-   [Express](https://expressjs.com/fr/) - Infrastructure Web minimaliste, souple et rapide pour Node.js
-   [MongoDB](https://www.mongodb.com/fr) - Un système de gestion de base de données orienté documents

## Auteur

**Arthur Blanc** : [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/)
