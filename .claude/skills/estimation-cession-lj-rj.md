# Estimation prix de cession - Liquidation / Redressement judiciaire

## Declencheur
Ce skill est appele quand l'utilisateur fournit des documents (PDF) relatifs a une cession de fonds de commerce en procedure collective (LJ ou RJ) et demande une estimation de prix.

## Documents attendus
Lire tous les PDF fournis. Les documents typiques sont :
- **Inventaire** (commissaire de justice) : mobilier, materiel, agencement, stock, elements incorporels
- **Dossier de presentation** (mandataire judiciaire) : bail, clientele, personnel, cahier des charges
- **Bail commercial** : clauses, loyer, duree, destination, agrement
- **Fiche actif** : resume de l'offre, modalites, date limite

## Methodologie d'extraction

### Etape 1 : Extraction des donnees cles
A partir des documents, extraire et structurer :

**Identite**
- Denomination sociale, enseigne, activite
- Adresse, arrondissement/ville
- Type de procedure (LJ/RJ), date jugement, date limite offres

**Bail commercial**
- Loyer annuel HT
- Duree initiale, date debut/fin, situation actuelle (en cours / tacite reconduction / expire)
- Destination (etroite restauration / large / tous commerces)
- Agrement bailleur pour cession (oui/non)
- Agrement cession droit au bail (oui/non)
- Clause de solidarite cedant/cessionnaire
- Arrieres de loyer (montant + loyers post-jugement a estimer)
- Depot de garantie a rembourser
- Indexation (ILC/ILAT/ICC)

**Inventaire corporel**
- Mobilier (valeur inventaire)
- Materiel d'exploitation (valeur inventaire)
- Agencement (valeur inventaire)
- Etat general du materiel (neuf/correct/use/HS - noter les elements casses)
- Equipements remarquables (marques pro, annee)

**Stock**
- Valeur inventaire
- Composition (vins, spiritueux, denrees, etc.)
- Le stock est-il repris en sus du prix ou inclus ?

**Elements incorporels**
- Licence (IV, III, petite licence, aucune) + valeur inventaire
- Enseigne / nom commercial / marque
- Site internet, reseaux sociaux, fichier clients

**Personnel**
- Nombre de salaries au jugement
- Salaries licencies ou non
- Postes, anciennete, remuneration brute
- Priorite de reembauchage

**Dettes et passif**
- Arrieres de loyer
- Dettes sociales/fiscales connues
- Creanciers nantis sur le fonds

### Etape 2 : Analyse du droit au bail (valeur principale)

Le droit au bail est le poste principal en cession LJ/RJ. Evaluer selon :

**Localisation** - Appliquer les fourchettes suivantes pour le DAB :
- Paris hypercentre (1er-8e, parties du 9e/10e/11e) : 1 000 - 3 000 EUR/m2
- Paris centre (autres arrondissements intra-muros) : 500 - 1 500 EUR/m2
- Paris peripherie (13e, 19e, 20e zones secondaires) : 300 - 800 EUR/m2
- Banlieue attractive (Boulogne, Neuilly, St-Germain) : 400 - 1 200 EUR/m2
- Banlieue standard : 200 - 600 EUR/m2
- Province grande ville centre : 300 - 1 000 EUR/m2
- Province autre : 100 - 400 EUR/m2

**Ajustements du DAB :**
- Loyer inferieur au marche : +15 a +30%
- Loyer superieur au marche : -15 a -30%
- Bail en tacite reconduction : -20 a -30% (incertitude duree)
- Bail < 3 ans restants : -30 a -50%
- Bail > 6 ans : +10 a +20%
- Destination etroite (restauration seule) : -10%
- Destination large / tous commerces : +10 a +15%
- Agrement bailleur obligatoire : -10 a -15% (risque blocage)
- Arrieres de loyer importants : -10% (bailleur potentiellement hostile)
- Clause de solidarite cessionnaire : -5% (risque juridique)
- Terrasse autorisee : +10 a +20%
- Extraction equipements : +5% si securisee, -10% si incertaine

**Ratio loyer/zone** - Verifier la coherence :
- Paris 9e (Trudaine, Martyrs) : 35 000 - 55 000 EUR/an pour un petit restaurant
- Paris 11e (Oberkampf) : 30 000 - 50 000 EUR/an
- Paris 6e (St-Germain) : 50 000 - 80 000 EUR/an
- Si loyer sous marche de >20% : signal positif fort pour le DAB

### Etape 3 : Valorisation des autres actifs

**Licence IV (Paris)**
- Paris centre : 15 000 - 25 000 EUR
- Paris peripherie : 10 000 - 18 000 EUR
- Province grande ville : 8 000 - 15 000 EUR
- Province autre : 3 000 - 8 000 EUR
- En LJ, la licence est souvent sous-evaluee dans l'inventaire

**Licence III** : 30-50% de la valeur d'une Licence IV equivalente

**Materiel en contexte LJ**
- Appliquer une decote de 30 a 50% sur la valeur inventaire
- Materiel < 3 ans et marques pro (Rational, Hoshizaki, Winterhalter) : decote 30%
- Materiel > 5 ans ou marques generiques : decote 50%
- Materiel HS ou casse : valeur 0

**Stock**
- Generalement repris en sus du prix, apres inventaire contradictoire
- Decote 10-20% sur la valeur inventaire (risque perissabilite)

### Etape 4 : Estimation du passif repreneur

Le repreneur ne reprend pas les dettes de la LJ mais supporte :
- Depot de garantie a reconstituer aupres du liquidateur
- Arrieres de loyer post-jugement (indemnite d'occupation)
- Droits d'enregistrement (3% entre 23k et 107k, 5% au-dela de 200k)
- Frais d'acte avocat (3-6% HT, minimum 3 000 EUR HT)
- Frais de publication (~500 EUR)
- Frais de purge inscriptions (800 - 1 500 EUR)
- Travaux de remise en etat (estimer selon etat du materiel)

**Attention clause de solidarite :** Selon Cass. 27/09/2011, en LJ la clause de solidarite cessionnaire/cedant est opposable au cessionnaire. Le repreneur peut etre tenu garant des loyers dus a la date de cession.

### Etape 5 : Synthese et fourchette de prix

Calculer trois scenarios :

**Scenario bas** (peu d'encherisseurs, bailleur hostile, bail fragile)
= DAB bas + licence decotee + materiel decote 50% - risques

**Scenario median** (concurrence normale)
= DAB median + licence marche + materiel decote 35%

**Scenario haut** (forte concurrence, emplacement premium)
= DAB haut + licence marche + materiel decote 25%

### Etape 6 : Budget total repreneur

Pour chaque scenario, calculer :
- Prix de cession net vendeur
- Depot de garantie
- Frais (acte + enregistrement + publication + purge)
- Stock (en sus)
- Estimation travaux (fourchette)
- **Total budget repreneur**

## Format de sortie

Presenter le resultat sous cette structure :

```
## Fiche synthetique
[Denomination / Enseigne / Adresse / Activite / Procedure / Date limite]

## Donnees extraites
### Bail
[Tableau des donnees bail]
### Inventaire
[Tableau recapitulatif inventaire]
### Personnel
[Tableau salaries]
### Passif connu
[Arrieres, dettes identifiees]

## Analyse du droit au bail
[Raisonnement sur la valeur du DAB avec ajustements]

## Valorisation des actifs
[Detail par poste : licence, materiel, stock]

## Points de vigilance
[Liste des risques juridiques et pratiques]

## Estimation prix de cession

| Scenario | Prix net vendeur | Budget total repreneur |
|----------|-----------------|----------------------|
| Bas      | XX 000 EUR      | XX 000 EUR           |
| Median   | XX 000 EUR      | XX 000 EUR           |
| Haut     | XX 000 EUR      | XX 000 EUR           |

## Recommandation
[Prix d'offre suggere et strategie]
```

## Disclaimer
Ajouter systematiquement :
> Cette estimation est indicative et ne constitue pas un avis juridique ni une evaluation certifiee. Elle est basee sur les documents fournis et les pratiques de marche observees. Un accompagnement par un avocat specialise en droit des entreprises en difficulte est indispensable pour toute offre de reprise.
