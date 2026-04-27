;(function(){
const T={
en:{title:"Maritime Purchasing HQ",subtitle:"Fleet Operations KPIs",fleetOverview:"Fleet Overview",alerts:"Alerts",fleetSummary:"Fleet Summary",procurement:"Procurement",budget:"Budget Monitor",certifications:"Certifications",composer:"Message Composer",routeInfo:"Route & Port Info",procStatus:"Procurement Status",emails:"Operative Emails",viewDetails:"View Details",backDash:"← Back to Dashboard",eta:"ETA",etb:"ETB",etd:"ETD",agent:"Agent",position:"Position",lastNoon:"Last noon report",itemDesc:"Item description",expiredLabel:"Expired / ≤15d",expiringLabel:"Expiring 30d",validLabel:"Valid",onTime:"On time",delayRisk:"Delay risk",anchored:"Anchored"},
it:{title:"Maritime Purchasing HQ",subtitle:"KPI Operativi Flotta",fleetOverview:"Panoramica Flotta",alerts:"Avvisi",fleetSummary:"Riepilogo Flotta",procurement:"Procurement",budget:"Monitor Budget",certifications:"Certificati",composer:"Compositore Email",routeInfo:"Rotta & Porto",procStatus:"Stato Procurement",emails:"Email Operative",viewDetails:"Dettagli",backDash:"← Torna alla Dashboard",eta:"ETA",etb:"ETB",etd:"ETD",agent:"Agente",position:"Posizione",lastNoon:"Ultimo noon report",itemDesc:"Descrizione",expiredLabel:"Scaduti / ≤15gg",expiringLabel:"Scad. 30gg",validLabel:"Validi",onTime:"In orario",delayRisk:"Ritardo",anchored:"Ancorata"}
};

let lang="en";
try{const s=localStorage.getItem("dashboardLang");if(s==="it"||s==="en")lang=s;}catch(e){}

function applyI18n(l){
  const t=T[l]||T.en;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(t[k]!==undefined)el.textContent=t[k];});
  document.querySelectorAll(".lang-btn").forEach(b=>b.classList.toggle("active",b.dataset.lang===l));
}

const V={
"peppino":{name:"PEPPINO",sc:"on-time",sk:"onTime",eta:"2026-04-28 08:00",etb:"2026-04-28 10:00",etd:"2026-04-29 16:00",agent:"Eastern Marine Agency",contact:"ops@easterning.it",pos:"N 44°25.123 E 008°55.456",noon:"2026-04-27 12:00",b:{u:136000,t:200000,p:68,c:"green"},cc:0,cw:1,co:4,
proc:[{d:"Main Engine Spares",r:"2026-PEP-SHPR-00012",po:"2026-PEP-HQPO-00008",dn:"2026-PEP-HQDN-00005",s:[1,1,1,1]},{d:"Lube Oil 40W",r:"2026-PEP-SHPR-00013",po:"2026-PEP-HQPO-00009",dn:"",s:[1,1,1,0]},{d:"Safety Equipment",r:"2026-PEP-SHPR-00014",po:"",dn:"",s:[1,1,0,0]}],
em:[{s:"warn",sub:"ETA Update Request",from:"ops@easterning.it",dt:"2026-04-27"},{s:"ok",sub:"PO Confirmation ACK",from:"supplier@marine.com",dt:"2026-04-26"}]},

"med-liguria":{name:"MED LIGURIA",sc:"delay",sk:"delayRisk",eta:"2026-04-29 14:00",etb:"2026-04-29 17:00",etd:"2026-04-30 22:00",agent:"Tyrrhenian Port Services",contact:"livorno@tyrrhenian.it",pos:"N 43°33.890 E 010°18.210",noon:"2026-04-27 12:00",b:{u:184000,t:200000,p:92,c:"red"},cc:1,cw:2,co:2,
proc:[{d:"Fuel Injectors Set",r:"2026-MLG-SHPR-00020",po:"2026-MLG-HQPO-00014",dn:"2026-MLG-HQDN-00009",s:[1,1,1,1]},{d:"Deck Hatch Gaskets",r:"2026-MLG-SHPR-00021",po:"2026-MLG-HQPO-00015",dn:"",s:[1,1,1,0]},{d:"Hydraulic Oil 46",r:"2026-MLG-SHPR-00022",po:"",dn:"",s:[1,0,0,0]}],
em:[{s:"crit",sub:"Budget Overrun Alert",from:"finance@hq.internal",dt:"2026-04-27"},{s:"warn",sub:"Delivery Delay Notice",from:"supplier@marine.com",dt:"2026-04-26"}]},

"med-toscana":{name:"MED TOSCANA",sc:"on-time",sk:"onTime",eta:"2026-04-30 07:00",etb:"2026-04-30 09:00",etd:"2026-04-30 20:00",agent:"Toscana Maritime Agents",contact:"port@toscanamaritime.it",pos:"N 42°05.340 E 011°47.680",noon:"2026-04-27 12:00",b:{u:164000,t:200000,p:82,c:"yellow"},cc:0,cw:1,co:4,
proc:[{d:"Navigation Lights",r:"2026-MDT-SHPR-00018",po:"2026-MDT-HQPO-00011",dn:"",s:[1,1,1,0]},{d:"Fire Extinguisher Pack",r:"2026-MDT-SHPR-00019",po:"",dn:"",s:[1,1,0,0]}],
em:[{s:"ok",sub:"Captain Request Received",from:"master@medtoscana.it",dt:"2026-04-27"},{s:"warn",sub:"Certificate Expiry — ISM",from:"compliance@hq.internal",dt:"2026-04-25"}]},

"norrbotten":{name:"NORRBOTTEN",sc:"anchored",sk:"anchored",eta:"2026-05-02 10:00",etb:"2026-05-02 14:00",etd:"2026-05-03 08:00",agent:"Naples Bay Agencies",contact:"nba@naplesagency.it",pos:"N 40°50.120 E 014°16.330",noon:"2026-04-27 12:00",b:{u:124000,t:200000,p:62,c:"green"},cc:0,cw:0,co:5,
proc:[{d:"Electrical Cables Set",r:"2026-NRB-SHPR-00015",po:"2026-NRB-HQPO-00010",dn:"2026-NRB-HQDN-00007",s:[1,1,1,1]},{d:"Refit Steel Plates",r:"2026-NRB-SHPR-00016",po:"",dn:"",s:[1,0,0,0]}],
em:[{s:"ok",sub:"Refit Schedule Confirmed",from:"yard@napolidockyard.it",dt:"2026-04-26"}]}
};

function setT(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}

function initVessel(){
  const vid=(new URLSearchParams(window.location.search).get("vessel"))||"peppino";
  const v=V[vid]||V["peppino"];
  document.title=v.name+" — Maritime Purchasing HQ";
  const tEl=document.querySelector(".vessel-page-title");
  if(tEl)tEl.textContent=v.name;
  const badge=document.querySelector(".vessel-status-badge");
  if(badge){
    badge.className="vessel-status-badge "+v.sc;
    const bt=badge.querySelector(".badge-text");
    if(bt)bt.setAttribute("data-i18n",v.sk);
  }
  setT("route-eta",v.eta);setT("route-etb",v.etb);setT("route-etd",v.etd);
  setT("route-agent",v.agent);setT("route-contact",v.contact);
  setT("route-position",v.pos);setT("route-noon",v.noon);
  const pctEl=document.getElementById("vessel-budget-pct");
  const fillEl=document.getElementById("vessel-budget-fill");
  const amtEl=document.getElementById("vessel-budget-amount");
  if(pctEl)pctEl.textContent=v.b.p+"%";
  if(fillEl){fillEl.style.width=v.b.p+"%";fillEl.className="fill "+v.b.c;}
  if(amtEl)amtEl.textContent="€"+(v.b.u/1000).toFixed(0)+"K / €"+(v.b.t/1000).toFixed(0)+"K";
  setT("cert-crit",v.cc);setT("cert-warn",v.cw);setT("cert-ok",v.co);
  const tbody=document.getElementById("vessel-proc-tbody");
  if(tbody){
    const L=["REQ","RFQ","PO","DN"];
    tbody.innerHTML=v.proc.map(r=>{
      const ph=r.s.map((x,i)=>`<div class="step-dot ${x?"done":"empty"}" title="${L[i]}">${L[i][0]}</div>${i<3?`<div class="step-line${x&&r.s[i+1]?" done":""}"></div>`:""}`).join("");
      return`<tr><td>${r.d}</td><td class="text-xs text-muted">${r.r}</td><td class="text-xs">${r.po||"—"}</td><td class="text-xs">${r.dn||"—"}</td><td><div class="progress-steps">${ph}</div></td></tr>`;
    }).join("");
  }
  const ec=document.getElementById("vessel-emails");
  if(ec)ec.innerHTML=v.em.map(e=>`<a class="email-item" href="mailto:${e.from}"><span class="email-dot ${e.s}"></span><span class="email-subject">${e.sub}</span><span class="email-from">${e.from}</span><span class="email-date">${e.dt}</span></a>`).join("");
}

function initComposer(){
  const btns=document.querySelectorAll(".template-box");
  const prev=document.querySelector(".composer-preview-text");
  const TPLS=[
    "Subject: ETA Confirmation Request\n\nDear Agent,\nPlease confirm ETA and berthing windows for [VESSEL] at [PORT].\n\nBest regards,\nMaritime Purchasing HQ",
    "Subject: Order Confirmation — [PO_NUMBER]\n\nDear Supplier,\nThis is to confirm PO [PO_NUMBER] for [VESSEL].\nPlease acknowledge receipt and confirm dispatch date.\n\nBest regards,\nMaritime Purchasing HQ",
    "Subject: Captain Request — [VESSEL]\n\nDear Captain,\nYour requisition [REQ_NUMBER] has been received.\nEstimated response: 24h.\n\nBest regards,\nMaritime Purchasing HQ"
  ];
  btns.forEach((b,i)=>b.addEventListener("click",()=>{
    btns.forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    if(prev)prev.value=TPLS[i]||"";
  }));
}

function init(){
  applyI18n(lang);
  document.querySelectorAll(".lang-btn").forEach(b=>b.addEventListener("click",()=>{
    lang=b.dataset.lang;
    try{localStorage.setItem("dashboardLang",lang);}catch(e){}
    applyI18n(lang);
  }));
  if(document.querySelector(".vessel-page-title")){
    initVessel();
    applyI18n(lang);
  }
  initComposer();
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
else init();
})();
