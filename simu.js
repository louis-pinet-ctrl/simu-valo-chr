function loadScript(u){return new Promise(function(r,j){var s=document.createElement('script');s.src=u;s.onload=r;s.onerror=j;document.head.appendChild(s)})}
Promise.all([loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'),loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')]).then(function(){emailjs.init("3MND6tW8YvzuBeowW")});
function scrollToSim(){const el=document.getElementById('simu-valo');if(el)el.scrollIntoView({block:'start',behavior:'smooth'})}
let currentStep=1,calculationData={},narrativeText='',currentNarrativeType='complet',currentRole='cedant';
function toNum(v){if(v==null)return 0;v=String(v).replace(/[\s\u00a0\u202f€]/g,'').replace(/\.(?=\d{3}(\D|$))/g,'').replace(',','.');const n=parseFloat(v);return isFinite(n)&&n>0?n:0}
function num(id){return toNum(document.getElementById(id).value)}
function stepErr(s,m){const e=document.getElementById('step'+s+'-error');if(!e){alert(m);return}e.textContent=m;e.style.display='block';e.scrollIntoView({block:'nearest'});clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',6000)}
const COUT_ETP={brasserie:3200,traditionnel:3500,fastfood:2800,gastronomique:4000,darkkitchen:2500};
function calcMS(n,seg){return Math.round(n*(COUT_ETP[seg]||3500)*12)}
function calcRatioMS(n,ca,seg){return n<=0||ca<=0?0:(calcMS(n,seg)/ca*100)}
function saveToLocalStorage(){try{localStorage.setItem('simulator_data',JSON.stringify({
ca_n:document.getElementById('ca_n').value,ca_n1:document.getElementById('ca_n1').value,
ca_n2:document.getElementById('ca_n2').value,ebe:document.getElementById('ebe').value,
loyer:document.getElementById('loyer').value,nb_salaries:document.getElementById('nb_salaries').value,
timestamp:Date.now()}))}catch(e){}}
function loadFromLocalStorage(){try{const data=JSON.parse(localStorage.getItem('simulator_data'));
if(data&&Date.now()-data.timestamp<86400000){
if(data.ca_n)document.getElementById('ca_n').value=data.ca_n;
if(data.ca_n1)document.getElementById('ca_n1').value=data.ca_n1;
if(data.ca_n2)document.getElementById('ca_n2').value=data.ca_n2;
if(data.ebe)document.getElementById('ebe').value=data.ebe;
if(data.loyer)document.getElementById('loyer').value=data.loyer;
if(data.nb_salaries)document.getElementById('nb_salaries').value=data.nb_salaries}}catch(e){}}
document.addEventListener('DOMContentLoaded',function(){
loadFromLocalStorage();
['ca_n','ca_n1','ca_n2','ebe','loyer','nb_salaries'].forEach(id=>
document.getElementById(id).addEventListener('input',saveToLocalStorage));
document.querySelectorAll('input[name="indexation"]').forEach(i=>i.addEventListener('change',function(){
document.getElementById('derniere-revision-group').style.display=this.value==='triennale'?'block':'none'}));
const caInput=document.getElementById('ca_n'),loyerInput=document.getElementById('loyer'),
nbInput=document.getElementById('nb_salaries'),ebeInput=document.getElementById('ebe'),
segInputs=document.querySelectorAll('input[name="segment"]');
function validateData(){
const ca=toNum(caInput.value),loyer=toNum(loyerInput.value),
ebe=toNum(ebeInput.value);
const ebeWarn=document.getElementById('ebe-warning'),loyerWarn=document.getElementById('loyer-warning');
ebeWarn.style.display='none';loyerWarn.style.display='none';
if(ebe>0&&ca>0){const ebeRatio=(ebe/ca*100);
if(ebeRatio<5){ebeWarn.textContent='⚠️ EBE < 5% du CA : incohérent, vérifiez vos données';
ebeWarn.style.display='block'}
else if(ebeRatio>35){ebeWarn.textContent='⚠️ EBE > 35% du CA : exceptionnellement élevé, à vérifier';
ebeWarn.style.display='block'}}
if(loyer>0&&ca>0){const loyerRatio=(loyer/ca*100);
if(loyerRatio>15){loyerWarn.textContent='⚠️ Loyer > 15% du CA : exploitation probablement non viable';
loyerWarn.style.display='block'}}}
function updateLoyer(){
const ca=toNum(caInput.value),loyer=toNum(loyerInput.value),
infoDiv=document.getElementById('loyer-info'),ratioSpan=document.getElementById('loyer-ratio'),
commentDiv=document.getElementById('loyer-comment');validateData();
if(ca>0&&loyer>0){const ratio=(loyer/ca*100).toFixed(1);ratioSpan.textContent=ratio+' %';
infoDiv.style.display='block';
if(ratio<7){commentDiv.textContent='✓ Excellent (bas de marché)';commentDiv.style.color='#2e7d32'}
else if(ratio<=8){commentDiv.textContent='✓ Normal';commentDiv.style.color='#1565c0'}
else if(ratio<=9){commentDiv.textContent='⚠ Élevé';commentDiv.style.color='#f57c00'}
else{commentDiv.textContent='⚠ Très élevé (impact négatif sur valorisation)';commentDiv.style.color='#c62828'}}
else infoDiv.style.display='none'}
function updateMS(){
const ca=toNum(caInput.value),nb=toNum(nbInput.value),
segChecked=document.querySelector('input[name="segment"]:checked'),
infoDiv=document.getElementById('salaries-info'),montantSpan=document.getElementById('masse-salariale-montant'),
ratioSpan=document.getElementById('ratio-masse-salariale'),commentDiv=document.getElementById('masse-salariale-comment');
if(nb>0&&ca>0&&segChecked){const seg=segChecked.value,ms=calcMS(nb,seg),
ratioMS=calcRatioMS(nb,ca,seg).toFixed(1);
montantSpan.textContent=formatEuro(ms)+'/an';ratioSpan.textContent=ratioMS+'%';
infoDiv.style.display='block';
let ratioIdeal='30-38%';
if(seg==='fastfood'||seg==='darkkitchen')ratioIdeal='25-30%';
else if(seg==='gastronomique')ratioIdeal='38-45%';
if(ratioMS<30){commentDiv.innerHTML=`✓ Très bonne maîtrise (ratio optimal pour rentabilité)<br><small>Repère secteur: ${ratioIdeal}</small>`;
commentDiv.style.color='#2e7d32'}
else if(ratioMS<=38){commentDiv.innerHTML=`⚖️ Zone d'équilibre (ratio sain)<br><small>Repère secteur: ${ratioIdeal}</small>`;
commentDiv.style.color='#1565c0'}
else if(ratioMS<=45){commentDiv.innerHTML=`⚠ Élevé (acceptable si positionnement premium)<br><small>Repère secteur: ${ratioIdeal}</small>`;
commentDiv.style.color='#f57c00'}
else{commentDiv.innerHTML=`⚠ Très élevé (impact négatif sur rentabilité et valorisation)<br><small>Repère secteur: ${ratioIdeal}</small>`;
commentDiv.style.color='#c62828'}}else infoDiv.style.display='none'}
caInput.addEventListener('input',()=>{updateLoyer();updateMS()});
loyerInput.addEventListener('input',updateLoyer);ebeInput.addEventListener('input',validateData);
nbInput.addEventListener('input',updateMS);segInputs.forEach(i=>i.addEventListener('change',updateMS))});
function nextStep(){if(!validateStep(currentStep))return;
document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');
currentStep++;document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
scrollToSim()}
function prevStep(){document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
currentStep--;document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('completed');
document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
scrollToSim()}
function validateStep(s){
if(s===1){const ca=num('ca_n'),loyer=num('loyer');
if(!ca){stepErr(1,'Merci de saisir le chiffre d\'affaires HT de l\'année N (montant en euros, ex : 450 000)');return false}
if(!loyer){stepErr(1,'Merci de saisir le loyer annuel charges comprises (montant en euros, ex : 36 000)');return false}}
if(s===2){if(!document.querySelector('input[name="segment"]:checked')){stepErr(2,'Merci de sélectionner le segment d\'activité');return false}
if(!document.querySelector('input[name="localisation"]:checked')){stepErr(2,'Merci de sélectionner la localisation');return false}}
if(s===3){const bailWarn=document.getElementById('bail-warning');bailWarn.style.display='none';
if(!document.querySelector('input[name="bail_duree"]:checked')){stepErr(3,'Merci de sélectionner la durée restante du bail');return false}
const bailDuree=document.querySelector('input[name="bail_duree"]:checked').value;
if(bailDuree==='court'){bailWarn.textContent='⚠️ Bail < 3 ans : transmission difficile, renouvelez avant cession';
bailWarn.style.display='block'}}
if(s===5){
const profil=document.getElementById('profil_utilisateur').value,
nom=document.getElementById('nom').value.trim(),
prenom=document.getElementById('prenom').value.trim(),
tel=document.getElementById('telephone').value.trim(),
email=document.getElementById('email').value.trim();
if(!profil){showErr('Merci de sélectionner votre profil');return false}
if(!nom||!prenom||!tel||!email){showErr('Tous les champs sont obligatoires');return false}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showErr('Email invalide');return false}}
return true}
function showErr(m){const e=document.getElementById('contact-error');e.textContent=m;e.style.display='block';
setTimeout(()=>e.style.display='none',5000)}
document.addEventListener('change',e=>{if(e.target.type==='radio'){const name=e.target.name;
document.querySelectorAll(`input[name="${name}"]`).forEach(i=>i.closest('.radio-option').classList.remove('selected'));
e.target.closest('.radio-option').classList.add('selected')}});
function getSegName(s){const n={brasserie:'Brasserie',traditionnel:'Restaurant traditionnel',
fastfood:'Fast-food',gastronomique:'Gastronomique',darkkitchen:'Dark kitchen'};return n[s]||s}
function getProfilLabel(p){const labels={
'restaurateur':'Restaurateur/Exploitant',
'franchisé':'Franchisé',
'expert-comptable':'Expert-comptable',
'agent-immobilier':'Agent immobilier',
'avocat':'Avocat',
'conseiller':'Conseiller en cession/reprise',
'investisseur':'Investisseur',
'autre':'Autre'
};return labels[p]||p}
function calcCA(seg,caRef){const ranges={brasserie:{min:.50,med:.80,max:1.10},
traditionnel:{min:.50,med:.65,max:.80},fastfood:{min:.30,med:.55,max:.80},
gastronomique:{min:.30,med:.55,max:.80},darkkitchen:{min:.20,med:.40,max:.60}},coefs=ranges[seg];
return{basse:Math.round(caRef*coefs.min),mediane:Math.round(caRef*coefs.med),
haute:Math.round(caRef*coefs.max),coefMed:(coefs.med*100).toFixed(0)}}
function calcEBE(ebe,profile,caData){let multiples,profileName;
const hasGrowth=caData.ca_n1>0&&caData.ca_n2>0&&caData.ca_n>caData.ca_n1&&caData.ca_n1>caData.ca_n2;
if(profile.isPrime){multiples={min:3.0,med:3.5,max:4.0};profileName='Site prime'}
else if(profile.isRisky){multiples={min:1.5,med:2.0,max:2.5};profileName='Site risques'}
else{multiples={min:2.5,med:3.0,max:3.5};profileName='Bon site'}
if(hasGrowth){multiples.min+=.3;multiples.med+=.3;multiples.max+=.3;profileName+=' (croissance)'}
return{basse:Math.round(ebe*multiples.min),mediane:Math.round(ebe*multiples.med),
haute:Math.round(ebe*multiples.max),multipleMed:multiples.med.toFixed(1),profileName:profileName}}
function determineProfile(d){const isPrime=(d.bail_duree==='long'&&d.extraction==='conforme'&&
d.terrasse==='oui'&&d.localisation==='hypercentre');
const isRisky=(d.bail_duree==='court'||d.extraction==='incertaine'||d.conformite==='reserves'||
d.litiges==='oui'||d.localisation==='fragile'||d.dettes==='importantes');return{isPrime,isRisky}}
function applyAdj(baseM,d){const adj=[],addAdj=(lbl,pct)=>{adj.push({label:lbl,pct:pct,
amount:Math.round(baseM*pct/100)});return pct};let totalPct=0;
if(d.localisation==='hypercentre')totalPct+=addAdj('Hypercentre',15);
else if(d.localisation==='fragile')totalPct+=addAdj('Zone fragile',-15);
if(d.bail_duree==='long')totalPct+=addAdj('Bail ≥6 ans',7.5);
else if(d.bail_duree==='court')totalPct+=addAdj('Bail <3 ans',-7.5);
if(d.destination==='large')totalPct+=addAdj('Destination large',5);
else if(d.destination==='etroite')totalPct+=addAdj('Destination étroite',-7.5);
if(d.agrement_fdc==='oui')totalPct+=addAdj('Agrément FDC',-2.5);
if(d.agrement_dab==='oui')totalPct+=addAdj('Agrément DAB',-5);
if(d.indexation==='triennale'&&d.derniere_revision==='ancienne')totalPct+=addAdj('Révision due',-2.5);
if(d.extraction==='conforme')totalPct+=addAdj('Extraction sécurisée',10);
else if(d.extraction==='incertaine')totalPct+=addAdj('Extraction incertaine',-12.5);
const loyerR=(d.loyer/d.ca_ref*100);
if(loyerR<7)totalPct+=addAdj(`Loyer favorable (${loyerR.toFixed(1)}%)`,5);
else if(loyerR>9)totalPct+=addAdj(`Loyer élevé (${loyerR.toFixed(1)}%)`,Math.max(-15,Math.floor((9-loyerR))*2));
if(d.loyer_marche==='inferieur')totalPct+=addAdj('Loyer < marché',5);
else if(d.loyer_marche==='superieur')totalPct+=addAdj('Loyer > marché',-10);
if(d.terrasse==='oui')totalPct+=addAdj('Terrasse',7.5);
if(d.nb_salaries>0&&d.ca_ref>0){const ratioMS=calcRatioMS(d.nb_salaries,d.ca_ref,d.segment);
if(ratioMS<30)totalPct+=addAdj(`MS optimisée (${ratioMS.toFixed(1)}%)`,5);
else if(ratioMS>40)totalPct+=addAdj(`MS élevée (${ratioMS.toFixed(1)}%)`,-10)}
if(d.licence==='iv')totalPct+=addAdj('Licence IV',10);
else if(d.licence==='iii')totalPct+=addAdj('Licence III',5);
if(d.dettes==='importantes')totalPct+=addAdj('Dettes importantes',-15);
else if(d.dettes==='legeres')totalPct+=addAdj('Dettes légères',-5);
if(d.conformite==='reserves')totalPct+=addAdj('Réserves ERP',-10);
if(d.litiges==='oui')totalPct+=addAdj('Litiges',-10);
if(totalPct>25)totalPct=25;if(totalPct<-25)totalPct=-25;return{adjustments:adj,totalPct:totalPct}}
function aggregate(caR,ebeR){if(caR&&ebeR)return{basse:Math.round((caR.basse+ebeR.basse)/2),
mediane:Math.round((caR.mediane+ebeR.mediane)/2),haute:Math.round((caR.haute+ebeR.haute)/2)};
else if(caR)return{...caR};else if(ebeR)return{...ebeR};return null}
function listAtouts(d){const loyerR=(d.loyer/d.ca_ref*100).toFixed(1);let pts=[];
if(d.ca_n>0)pts.push(`chiffre d'affaires établi de ${formatEuro(d.ca_ref)}`);
if(d.ebe>0){const rent=d.ebe/d.ca_ref*100;
if(rent>=10)pts.push(`rentabilité solide avec un EBE de ${formatEuro(d.ebe)} (${rent.toFixed(1)}% du CA)`);
else pts.push(`EBE de ${formatEuro(d.ebe)} (${rent.toFixed(1)}% du CA), marge de progression sur la rentabilité`)}
if(d.localisation==='hypercentre')pts.push('emplacement premium en hypercentre');
else if(d.localisation==='centre')pts.push('emplacement centre-ville stratégique');
if(d.bail_duree==='long')pts.push('bail commercial sécurisé avec plus de 6 ans restants');
if(d.destination==='large')pts.push('destination du bail élargie incluant la vente à emporter');
if(d.extraction==='conforme')pts.push('clause d\'extraction des équipements sécurisée');
if(loyerR<8)pts.push(`charge locative maîtrisée à ${loyerR}% du CA (inférieure au marché)`);
if(d.licence==='iv')pts.push('licence IV complète, actif rare et valorisant');
else if(d.licence==='iii')pts.push('licence III permettant la vente d\'alcools');
if(d.terrasse==='oui')pts.push('terrasse autorisée, CA complémentaire');
if(d.conformite==='ok')pts.push('conformité totale ERP et hygiène');
if(d.dettes==='aucune')pts.push('aucune dette sociale ni fiscale');
if(d.litiges==='non')pts.push('aucun contentieux en cours');
if(d.nb_salaries>0&&calcRatioMS(d.nb_salaries,d.ca_ref,d.segment)<35)pts.push('structure salariale optimisée');
return pts}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function listVigilance(d){const loyerR=d.loyer/d.ca_ref*100,v=[];
if(d.bail_duree==='court')v.push('bail avec moins de 3 ans restants : renouvellement à obtenir avant la cession ou en condition suspensive');
else if(d.bail_duree==='moyen')v.push('bail avec 3 à 6 ans restants : anticiper les conditions du renouvellement');
if(d.destination==='etroite')v.push('destination du bail étroite : tout changement d\'activité ou vente à emporter suppose l\'accord du bailleur');
if(d.agrement_fdc==='oui')v.push('agrément du bailleur requis pour la cession du fonds : délai et risque de refus à intégrer');
if(d.agrement_dab==='oui')v.push('agrément du bailleur requis pour la cession du droit au bail');
if(d.indexation==='triennale'&&d.derniere_revision==='ancienne')v.push('révision triennale du loyer non appliquée depuis plus de 3 ans : hausse possible après la reprise');
if(d.extraction==='incertaine')v.push('sort des équipements incertain au regard du bail : à clarifier avant tout engagement');
if(loyerR>9)v.push(`loyer à ${loyerR.toFixed(1)}% du CA, au-dessus du seuil de confort du secteur`);
if(d.loyer_marche==='superieur')v.push('loyer supérieur au marché : à faire peser sur le prix');
if(d.nb_salaries>0){const r=calcRatioMS(d.nb_salaries,d.ca_ref,d.segment);
if(r>40)v.push(`masse salariale estimée à ${r.toFixed(1)}% du CA : rentabilité sous pression, les contrats de travail sont repris de plein droit`)}
if(d.dettes==='importantes')v.push('dettes sociales ou fiscales importantes : exiger les attestations de régularité et prévoir le séquestre du prix');
else if(d.dettes==='legeres')v.push('dettes sociales ou fiscales signalées : attestations de régularité à demander');
if(d.conformite==='reserves')v.push('réserves ERP ou hygiène : chiffrer les travaux de mise en conformité avant l\'offre');
if(d.litiges==='oui')v.push('contentieux en cours : en identifier l\'objet et l\'enjeu financier');
if(d.localisation==='fragile')v.push('zone commerciale fragile : vérifier la tendance du CA et l\'évolution du quartier');
if(d.licence==='petite')v.push('absence de licence III ou IV : vente d\'alcool limitée, à budgéter si le projet en dépend');
if(d.terrasse==='non')v.push('pas de terrasse : potentiel de CA limité aux couverts intérieurs');
if(!(d.ebe>0))v.push('EBE non communiqué : la valorisation repose sur le seul CA, demander les trois derniers bilans');
else{const rent=d.ebe/d.ca_ref*100;if(rent<10)v.push(`EBE à ${rent.toFixed(1)}% du CA : rentabilité faible, le prix doit rester cohérent avec la capacité de remboursement`)}
if(d.ca_n1>0&&d.ca_n<d.ca_n1)v.push('chiffre d\'affaires en baisse sur le dernier exercice : en comprendre la cause avant de fixer le prix');
return v}
function listPieces(d){const p=['les trois derniers bilans et liasses fiscales, avec une situation comptable récente',
'le bail commercial, ses avenants et le dernier avis d\'échéance de loyer',
'le registre du personnel et les contrats de travail',
'le dernier procès-verbal de la commission de sécurité et le dernier contrôle d\'hygiène',
'les attestations de régularité sociale et fiscale',
'l\'inventaire du matériel, en distinguant les biens financés ou loués',
'l\'état des inscriptions de privilèges et nantissements délivré par le greffe'];
if(d.licence!=='petite')p.push('l\'arrêté de licence et le permis d\'exploitation');
if(d.litiges==='oui')p.push('les pièces des contentieux en cours');
return p}
function droitsEnregistrement(prix){let d=0;if(prix>23000)d+=(Math.min(prix,200000)-23000)*.03;
if(prix>200000)d+=(prix-200000)*.05;return Math.round(d)}
function genRepreneur(d,finalR,type){const segName=getSegName(d.segment),pts=listAtouts(d),vig=listVigilance(d),
pieces=listPieces(d),offre=vig.length?finalR.basse:finalR.mediane;
if(type==='analyse'){return`REPRISE ${segName.toUpperCase()} - ANALYSE AVANT OFFRE

Fourchette de valeur : ${formatEuro(finalR.basse)} - ${formatEuro(finalR.haute)} (médiane ${formatEuro(finalR.mediane)})
Offre d'ouverture suggérée : ${formatEuro(offre)}
Prix cible : ${formatEuro(finalR.mediane)}. Plafond : ${formatEuro(finalR.haute)}, à ne dépasser qu'avec un élément nouveau.

Points de vigilance (${vig.length}) :
${vig.length?vig.map(v=>`⚠ ${cap(v)}`).join('\n'):'Aucun point bloquant sur les critères renseignés.'}

Atouts confirmés à vérifier sur pièces :
${pts.map(p=>`✓ ${cap(p)}`).join('\n')}

Pièces à demander avant toute offre :
${pieces.map(p=>`- ${cap(p)}`).join('\n')}

À budgéter en plus du prix :
- Droits d'enregistrement estimés sur le prix médian : ${formatEuro(droitsEnregistrement(finalR.mediane))} (barème de l'article 719 du CGI)
- Frais d'acte, stock, trésorerie de départ et travaux éventuels
- Prix séquestré pendant le délai d'opposition des créanciers après la cession`}
const cond=['obtention du financement','audit du bail et des comptes'];
if(d.agrement_fdc==='oui'||d.agrement_dab==='oui')cond.push('accord du bailleur');
if(d.bail_duree==='court')cond.push('renouvellement du bail');
cond.push('absence d\'inscription ou de passif non déclaré');
return`Objet : Marque d'intérêt - reprise ${segName}

Madame, Monsieur,

Suite à notre échange, je vous confirme mon intérêt pour la reprise du fonds de commerce que vous exploitez en ${segName}.

Sur la base des éléments communiqués et des méthodes de valorisation usuelles (coefficient du CA et multiple d'EBE), je situe la valeur du fonds entre ${formatEuro(finalR.basse)} et ${formatEuro(finalR.haute)}.
${vig.length?`
Les points suivants appellent une vérification et pèsent sur le prix :
${vig.map((v,i)=>`${i+1}. ${cap(v)}`).join('\n')}
`:''}
Dans ces conditions, je suis en mesure de formuler une offre indicative de ${formatEuro(offre)}, sous réserve des conditions suspensives usuelles : ${cond.join(', ')}.

Afin d'avancer, je vous remercie de me transmettre :
${pieces.map(p=>`- ${cap(p)}`).join('\n')}

Je reste à votre disposition pour une visite et un échange sur les modalités de reprise.

Veuillez agréer, Madame, Monsieur, mes salutations distinguées.`}
function genNarrative(d,finalR,type='complet'){if(type==='analyse'||type==='offre')return genRepreneur(d,finalR,type);
const segName=getSegName(d.segment),pts=listAtouts(d);
if(type==='annonce'){return`${segName.toUpperCase()} À CÉDER - ${formatEuro(finalR.mediane)}

${pts.map(p=>`✓ ${p.charAt(0).toUpperCase()+p.slice(1)}`).join('\n')}

Fourchette de valorisation : ${formatEuro(finalR.basse)} - ${formatEuro(finalR.haute)}

Dossier complet sur demande.
Visites organisées pour acquéreurs qualifiés.

Contact pour plus d'informations.`}
const intro=`Objet : Proposition de cession - ${segName}

Madame, Monsieur,

Suite à notre échange, je vous confirme ma volonté de céder mon fonds de commerce actuellement exploité en ${segName}.

En appliquant les méthodes de valorisation reconnues (coefficient du CA et multiple d'EBE), je valorise ce fonds de commerce entre ${formatEuro(finalR.basse)} et ${formatEuro(finalR.haute)}, avec une valorisation médiane de ${formatEuro(finalR.mediane)}.

Cette valorisation se justifie notamment par les atouts suivants :`;
const ptsLst=pts.map((p,i)=>`${i+1}. ${p.charAt(0).toUpperCase()+p.slice(1)}`).join('\n');
const concl=`\nCette estimation repose sur une méthodologie rigoureuse tenant compte des spécificités de l'établissement et des conditions juridiques de cession.

Je reste à votre disposition pour transmettre le dossier complet et organiser une visite à votre convenance.

Dans l'attente de votre retour, veuillez agréer, Madame, Monsieur, mes salutations distinguées.`;
return`${intro}\n\n${ptsLst}${concl}`}
function genChecklist(d){const items=[];
if(d.bail_duree==='court')items.push('Renouveler bail anticipé');
if(d.destination==='etroite')items.push('Élargir destination bail');
if(d.agrement_fdc==='oui')items.push('Alléger agrément FDC');
if(d.agrement_dab==='oui')items.push('Alléger agrément DAB');
if(d.indexation==='triennale'&&d.derniere_revision==='ancienne')items.push('Anticiper révision');
if(d.extraction==='incertaine')items.push('Sécuriser extraction');
if((d.loyer/d.ca_ref*100)>9||d.loyer_marche==='superieur')items.push('Réaligner loyer');
if(d.nb_salaries>0&&calcRatioMS(d.nb_salaries,d.ca_ref,d.segment)>40)items.push('Optimiser MS');
if(d.dettes!=='aucune')items.push('Apurer dettes');
if(d.conformite==='reserves')items.push('Purger réserves ERP');
if(d.litiges==='oui')items.push('Résoudre litiges');
if(d.localisation==='fragile')items.push('Valoriser atouts site');
if(d.terrasse==='non')items.push('Demander terrasse');
if(items.length===0){items.push('Fonds bien positionné');items.push('Maintenir qualité')}
return items}
function switchNarrative(type){currentNarrativeType=type;
document.querySelectorAll('.narrative-tab').forEach(t=>t.classList.toggle('active',t.dataset.type===type));
narrativeText=genNarrative(calculationData.data,calculationData.finalResult,type);
document.getElementById('narrative-text').textContent=narrativeText}
function switchRole(role){currentRole=role;
document.querySelectorAll('.narrative-role').forEach(r=>r.classList.toggle('active',r.dataset.role===role));
document.querySelectorAll('.narrative-tabs').forEach(t=>t.style.display=t.dataset.role===role?'':'none');
switchNarrative(role==='repreneur'?'analyse':'complet')}
const AVERTISSEMENT_MODELE=`---
Modèle indicatif généré automatiquement par le simulateur de valorisation de Louis Pinet, avocat des restaurateurs. Il ne constitue ni une évaluation, ni un conseil juridique, ni une offre engageante. À faire relire par un avocat avant tout envoi.
Prendre rendez-vous : https://calendly.com/contact-louispinetavocat/30min`;
function texteExport(){return narrativeText+'\n\n'+AVERTISSEMENT_MODELE}
function copyNarrative(){navigator.clipboard.writeText(texteExport()).then(()=>{
const s=document.getElementById('copy-success');s.classList.add('show');
setTimeout(()=>s.classList.remove('show'),3000)})}
function exportPDF(){const{jsPDF}=window.jspdf;const doc=new jsPDF();
doc.setFontSize(16);doc.text(currentRole==='repreneur'?'Reprise restaurant - Analyse':'Valorisation restaurant',20,20);
doc.setFontSize(12);const lines=doc.splitTextToSize(texteExport(),170);let y=40;
lines.forEach(l=>{if(y>280){doc.addPage();y=20}doc.text(l,20,y);y+=6});
doc.save(currentRole==='repreneur'?'reprise-restaurant.pdf':'valorisation.pdf')}
function renderCAChart(d){if(!d.ca_n1||!d.ca_n2)return;
const chartDiv=document.getElementById('ca-chart');chartDiv.innerHTML='';
const data=[{label:'N-2',value:d.ca_n2},{label:'N-1',value:d.ca_n1},{label:'N',value:d.ca_n}];
const maxVal=Math.max(...data.map(x=>x.value));
data.forEach(item=>{const bar=document.createElement('div');bar.className='ca-bar';
bar.style.height=`${(item.value/maxVal)*150}px`;
const label=document.createElement('div');label.className='ca-bar-label';label.textContent=item.label;
const value=document.createElement('div');value.className='ca-bar-value';
value.textContent=formatEuro(item.value);bar.appendChild(label);bar.appendChild(value);
chartDiv.appendChild(bar)});document.getElementById('ca-evolution').style.display='block'}
function renderResults(finalR,caR,ebeR,adjData,checklist){
calculationData.finalResult=finalR;
switchRole(calculationData.profil==='investisseur'?'repreneur':'cedant');
document.getElementById('final-range').innerHTML=`<div class="val-item"><div class="val-label">Basse</div>
<div class="val-amount">${formatEuro(finalR.basse)}</div></div>
<div class="val-item val-median"><div class="val-label">Médiane</div>
<div class="val-amount">${formatEuro(finalR.mediane)}</div></div>
<div class="val-item"><div class="val-label">Haute</div>
<div class="val-amount">${formatEuro(finalR.haute)}</div></div>`;
renderCAChart(calculationData.data);
let methodHTML='';
if(caR){methodHTML+=`<div class="method-item"><h4>Méthode CA</h4>
<div class="amount">${formatEuro(caR.basse)} - ${formatEuro(caR.haute)}</div>
<div style="color:#666;font-size:13px;margin-top:4px">Médiane: ${formatEuro(caR.mediane)}</div>
<div class="detail-text">Coef: ${caR.coefMed}% du CA</div></div>`}
if(ebeR){methodHTML+=`<div class="method-item"><h4>Méthode EBE</h4>
<div class="amount">${formatEuro(ebeR.basse)} - ${formatEuro(ebeR.haute)}</div>
<div style="color:#666;font-size:13px;margin-top:4px">Médiane: ${formatEuro(ebeR.mediane)}</div>
<div class="detail-text">Multiple: ×${ebeR.multipleMed} (${ebeR.profileName})</div></div>`}
else methodHTML+=`<div class="alert alert-warning">EBE non renseigné.</div>`;
const loyerR=(calculationData.data.loyer/calculationData.data.ca_ref*100).toFixed(1);
methodHTML+=`<div class="method-item"><h4>Charge locative</h4><div class="amount">${loyerR}%</div></div>`;
if(calculationData.data.nb_salaries>0){
const ratioMS=calcRatioMS(calculationData.data.nb_salaries,calculationData.data.ca_ref,calculationData.data.segment).toFixed(1);
methodHTML+=`<div class="method-item"><h4>Masse salariale</h4><div class="amount">${ratioMS}%</div></div>`}
document.getElementById('method-details').innerHTML=methodHTML;
const tbody=document.querySelector('#adjustments-table tbody');tbody.innerHTML='';
adjData.adjustments.forEach(a=>{const tr=document.createElement('tr'),
signClass=a.pct>=0?'positive':'negative',sign=a.pct>=0?'+':'';
tr.innerHTML=`<td>${a.label}</td><td class="${signClass}">${sign}${a.pct.toFixed(1)}%</td>
<td class="${signClass}">${sign}${formatEuro(a.amount)}</td>`;tbody.appendChild(tr)});
const totalRow=document.createElement('tr');totalRow.style.fontWeight='bold';
totalRow.style.borderTop='2px solid #1e1e1e';
const totalSign=adjData.totalPct>=0?'+':'',totalClass=adjData.totalPct>=0?'positive':'negative',
totalAmt=Math.round(calculationData.baseMedian*adjData.totalPct/100);
totalRow.innerHTML=`<td>Total (±25%)</td><td class="${totalClass}">${totalSign}${adjData.totalPct.toFixed(1)}%</td>
<td class="${totalClass}">${totalSign}${formatEuro(totalAmt)}</td>`;tbody.appendChild(totalRow);
const checklistUl=document.getElementById('checklist');checklistUl.innerHTML='';
checklist.forEach(item=>{const li=document.createElement('li');li.textContent=item;checklistUl.appendChild(li)});
document.querySelector('.step.active')?.classList.remove('active');
document.querySelectorAll('.step').forEach(s=>s.style.display='none');
document.getElementById('results').style.display='block';scrollToSim()}
async function sendEmail(contactData,allData,finalResult){
const serviceID='service_p4n5irf';
const templateID='template_qmnw673';
const params={
profil_utilisateur:getProfilLabel(contactData.profil_utilisateur),
nom:contactData.nom,
prenom:contactData.prenom,
telephone:contactData.telephone,
email:contactData.email,
ca_n:formatEuro(allData.ca_n),
ca_n1:allData.ca_n1>0?formatEuro(allData.ca_n1):'Non renseigné',
ca_n2:allData.ca_n2>0?formatEuro(allData.ca_n2):'Non renseigné',
ebe:allData.ebe>0?formatEuro(allData.ebe):'Non renseigné',
loyer:formatEuro(allData.loyer),
nb_salaries:allData.nb_salaries>0?allData.nb_salaries:'Non renseigné',
segment:getSegName(allData.segment),
localisation:allData.localisation,
terrasse:allData.terrasse==='oui'?'Oui':'Non',
bail_duree:allData.bail_duree==='court'?'< 3 ans':allData.bail_duree==='moyen'?'3-6 ans':'≥ 6 ans',
destination:allData.destination,
agrement_fdc:allData.agrement_fdc==='oui'?'Oui':'Non',
agrement_dab:allData.agrement_dab==='oui'?'Oui':'Non',
indexation:allData.indexation,
extraction:allData.extraction,
loyer_marche:allData.loyer_marche,
conformite:allData.conformite==='ok'?'Conforme':'Réserves',
litiges:allData.litiges==='oui'?'Oui':'Non',
licence:allData.licence==='iv'?'Licence IV':allData.licence==='iii'?'Licence III':'Sans licence',
dettes:allData.dettes,
valorisation_basse:formatEuro(finalResult.basse),
valorisation_mediane:formatEuro(finalResult.mediane),
valorisation_haute:formatEuro(finalResult.haute),
date:new Date().toLocaleString('fr-FR')
};
try{
await emailjs.send(serviceID,templateID,params);
return true;
}catch(e){
console.error('Erreur envoi email:',e);
return false;
}}
async function calculate(){if(!validateStep(5))return;
const btn=document.getElementById('btn-calculate'),btnText=document.getElementById('btn-text'),
btnSpinner=document.getElementById('btn-spinner');btn.disabled=true;btnText.style.display='none';
btnSpinner.style.display='inline-block';
const indexationValue=document.querySelector('input[name="indexation"]:checked').value;
let derniereRevisionValue='recente';
if(indexationValue==='triennale'){const c=document.querySelector('input[name="derniere_revision"]:checked');
if(c)derniereRevisionValue=c.value}
const data={ca_n:num('ca_n'),
ca_n1:num('ca_n1'),
ca_n2:num('ca_n2'),
ebe:num('ebe'),
loyer:num('loyer'),
nb_salaries:num('nb_salaries'),
segment:document.querySelector('input[name="segment"]:checked').value,
localisation:document.querySelector('input[name="localisation"]:checked').value,
terrasse:document.querySelector('input[name="terrasse"]:checked').value,
bail_duree:document.querySelector('input[name="bail_duree"]:checked').value,
destination:document.querySelector('input[name="destination"]:checked').value,
agrement_fdc:document.querySelector('input[name="agrement_fdc"]:checked').value,
agrement_dab:document.querySelector('input[name="agrement_dab"]:checked').value,
indexation:indexationValue,derniere_revision:derniereRevisionValue,
extraction:document.querySelector('input[name="extraction"]:checked').value,
loyer_marche:document.querySelector('input[name="loyer_marche"]:checked').value,
conformite:document.querySelector('input[name="conformite"]:checked').value,
litiges:document.querySelector('input[name="litiges"]:checked').value,
licence:document.querySelector('input[name="licence"]:checked').value,
dettes:document.querySelector('input[name="dettes"]:checked').value};
const contactData={
profil_utilisateur:document.getElementById('profil_utilisateur').value,
nom:document.getElementById('nom').value.trim(),
prenom:document.getElementById('prenom').value.trim(),
telephone:document.getElementById('telephone').value.trim(),
email:document.getElementById('email').value.trim()};
let caRef=data.ca_n,count=1;if(data.ca_n1>0){caRef+=data.ca_n1;count++}
if(data.ca_n2>0){caRef+=data.ca_n2;count++}caRef=caRef/count;data.ca_ref=caRef;
const caResult=calcCA(data.segment,caRef);let ebeResult=null;
if(data.ebe>0){const profile=determineProfile(data);
ebeResult=calcEBE(data.ebe,profile,data)}
const baseResult=aggregate(caResult,ebeResult);
calculationData.baseMedian=baseResult.mediane;calculationData.data=data;calculationData.profil=contactData.profil_utilisateur;
calculationData.caResult=caResult;calculationData.ebeResult=ebeResult;
const adjData=applyAdj(baseResult.mediane,data);
const adjFactor=1+(adjData.totalPct/100);
const finalResult={basse:Math.round(baseResult.basse*adjFactor),
mediane:Math.round(baseResult.mediane*adjFactor),haute:Math.round(baseResult.haute*adjFactor)};
await sendEmail(contactData,data,finalResult);
setTimeout(()=>{const checklist=genChecklist(data);
renderResults(finalResult,caResult,ebeResult,adjData,checklist)},1000)}
function formatEuro(amount){return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(amount)}
function reset(){localStorage.removeItem('simulator_data');location.reload()}
