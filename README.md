# 

Personnalisation

L'application de consultation est constituée de 4 pages :

* Login (automatique)
* Recherche à la google
* Navigation par facette
* Recherche avancée
* Détail

Il faut personnaliser les pages Alfresco Share et Aiku :

* Alfresco Share :

 - page de login (automatique)
 - page de recherche
 - page des résultats de recherche
 - page de recherche avancée
 - page document-detail
 
* Aiku :

 - page faceted-search

Selon le type de page à modifier, les éléments à configurer et les mécanismes de configuration sont différents...

Attention, il faut configurer le header et le footer pour qu'ils soient identiques sur chaque page et quel que soit le type de page.

## Pages Alfresco Share

### Header & Footer

#### Header

#### Footer

### Pages

#### Login

Création d'un module d'authentification automatique authentifiant l'utilisateur Public avec un mot de passe stocké en dur dans la classe java
(ou idéalement dans le fichier alfresco-global.properties).

## Page Aiku

### Header & Footer

##### Header

Le header est

##### Footer

### Faceted-search

La configuration de cette partie se fait dans le webscript faceted-search.get.js

Il faut :

* ajouter un lien pour accéder à la recherche avancée
* ne garder que l'action multi-select Download
* ne garder que l'action Download sur un document
* ne garder que le nom, le titre, la taille

# Ressources

Source Alfresco Share :

* svn co https://community.alfresco.com/docs/DOC-4874-source-code

* http://localhost:8080/share-admin/page/modules/deploy : modules list
* http://localhost:8080/share-admin/service/index : to refresh or browse webscripts
* http://localhost:8080/share-admin/service/surfBugStatus : to enable surfBugStatus
