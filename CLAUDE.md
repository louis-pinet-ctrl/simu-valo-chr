# Simulateur valorisation restaurant

## Skills disponibles

### estimation-cession-lj-rj
Estimation de prix de cession pour fonds de commerce en liquidation judiciaire (LJ) ou redressement judiciaire (RJ).
- Analyser les PDF fournis (inventaire, bail, dossier de presentation, fiche actif)
- Extraire les donnees cles (bail, materiel, licence, personnel, dettes)
- Estimer le droit au bail selon la localisation et les conditions
- Produire une fourchette de prix (bas / median / haut) avec budget total repreneur
- Identifier les points de vigilance juridiques

Appel : fournir les PDF du dossier de cession et demander une estimation de prix.

## Structure du simulateur

- `index.html` : page autonome (GitHub Pages) = HTML du simulateur + `simu.css` + `simu.js`
- `simu.css` : styles, tous scopés sous `#simu-valo` pour ne pas restyler le site Webflow
- `simu.js` : logique (validation, calcul, narratif, envoi EmailJS)
- `webflow-embed.html` : bloc à coller dans l'élément Embed de la page Webflow `/simulateur-valorisation`.
  Généré par `python3 build_embed.py`, il contient le HTML inline et charge CSS/JS depuis GitHub Pages.
  À recoller dans Webflow uniquement quand le HTML change ; une modification de CSS ou JS se déploie par simple merge sur `main`.
