#!/usr/bin/env python3
"""Genere webflow-embed.html : le bloc a coller dans l'element Embed de la page Webflow.
Le HTML du simulateur est inline, le CSS et le JS sont charges depuis GitHub Pages
(pas de limite de 50 000 caracteres, corrections deployees par simple push sur main)."""
import re
BASE = "https://louis-pinet-ctrl.github.io/simu-valo-chr/"
src = open("index.html", encoding="utf-8").read()
body = src[src.index('<div id="simu-valo">'):src.index('<script src="simu.js"')].rstrip()
embed = ('<!-- Simulateur de valorisation restaurant - genere par build_embed.py, ne pas editer a la main -->\n'
         '<link rel="stylesheet" href="' + BASE + 'simu.css">\n' + body + '\n'
         '<script src="' + BASE + 'simu.js" charset="utf-8"></script>\n')
open("webflow-embed.html", "w", encoding="utf-8").write(embed)
print("webflow-embed.html :", len(embed), "caracteres")
