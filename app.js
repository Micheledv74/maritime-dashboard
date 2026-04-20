document.addEventListener("DOMContentLoaded", () => {

// ─────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────
const translations = {
  it: {
    title: "Maritime Purchasing HQ",
    subtitle: "Dashboard operativa per flotta e procurement",
    fleetOverview: "Fleet Overview",
    fleetOverviewSub: "Mappa + KPI globali",
    mapPlaceholder: "Connessione mappa in attesa",
    fleet: "Fleet",
    alerts: "Alerts",
    critical: "Critico",
    onTime: "On time",
    delayRisk: "Delay risk",
    anchored: "All'ancora",
    portCalls: "Scali 48h",
    naviMonitorate: "Navi monitorate",
    fleetAttiva: "Fleet attiva",
    tutteLeNavi: "Tutte le navi",
    budgetMedio: "Budget medio",
    utilizzoFlotta: "Utilizzo flotta",
    alertsCritici: "Alerts critici",
    azioneRichiesta: "Azione richiesta",
    deliveryPending: "Delivery pending",
    entro48ore: "Entro 48 ore",
    emailOperative: "Email operative",
    nonGestite: "Non gestite",
    alertsPriority: "Alerts & Priorità",
    alertsSub: "Sempre in cima · aggiornati dal digest",
    semaforoOperativo: "Semaforo operativo",
    alert1Title: "Delivery delay risk",
    alert1Sub: "scadenza confermata saltata · agire oggi",
    alert2Title: "Budget soglia rossa",
    alert2Sub: "89% budget usato · verifica residuo",
    alert3Title: "Captain request pending",
    alert3Sub: "richiesta supplies in attesa risposta",
    fleetSummary: "Fleet Summary",
    fleetSummarySub: "4 card sintetiche · click per pagina dedicata",
    datiNoonReport: "Dati da Noon Report via N8N",
    nextPort: "Prossimo Porto",
    openItems: "Items aperti",
    budget: "Budget",
    dettaglioNave: "Vessel detail →",
    procurementStatus: "Procurement Status",
    procurementSub: "Pipeline per nave",
    nave: "NAVE",
    ordini: "ORDINI",
    rfqChiuse: "RFQ chiuse",
    reqToPo: "REQ → PO",
    poRicevuti: "PO ricevuti",
    rfqAperte: "RFQ aperte",
    rfqOverdue: ">7gg",
    prontePO: "Pronte PO",
    poSenzaDN: "PO senza DN",
    dnTransit: "DN transit",
    cancellati: "Cancellati",
    itemConConsegnaScaduta: "item con consegna scaduta",
    dnNonRicevuto: "DN non ricevuto a bordo",
    budgetMonitor: "Budget Monitor",
    budgetMonitorSub: "Semaforo per nave",
    inputManuale: "Input manuale Notion",
    residui: "residui",
    usato: "Usato",
    totale: "Totale",
    emailDigest: "Email Digest",
    emailDigestSub: "Semafori in home · link a Outlook per dettaglio",
    parsingN8N: "Parsing N8N da Outlook",
    orderConf: "Conferme ordine",
    orderConfSub: "Conferme ordine ricevute",
    captainReq: "Richieste capitano",
    captainReqSub: "richiesta con priorità alta",
    supplierDelay: "Avviso ritardo fornitore",
    ritardoDelivery: "ritardo delivery",
    apriDigest: "📧 Open full email digest",
    apriOutlook: "↗ Apri Outlook",
    lastSync: "Ultimo sync"
  },
  en: {
    title: "Maritime Purchasing HQ",
    subtitle: "Operational dashboard for fleet and procurement",
    fleetOverview: "Fleet Overview",
    fleetOverviewSub: "Map + Global KPIs",
    mapPlaceholder: "Map connection pending",
    fleet: "Fleet",
    alerts: "Alerts",
    critical: "Critical",
    onTime: "On time",
    delayRisk: "Delay risk",
    anchored: "Anchored",
    portCalls: "Port calls 48h",
    naviMonitorate: "Vessels monitored",
    fleetAttiva: "Active fleet",
    tutteLeNavi: "All vessels",
    budgetMedio: "Average budget",
    utilizzoFlotta: "Fleet usage",
    alertsCritici: "Critical alerts",
    azioneRichiesta: "Action required",
    deliveryPending: "Delivery pending",
    entro48ore: "Within 48h",
    emailOperative: "Operative emails",
    nonGestite: "Not handled",
    alertsPriority: "Alerts & Priorities",
    alertsSub: "Always on top · updated from digest",
    semaforoOperativo: "Operational semaphore",
    alert1Title: "Delivery delay risk",
    alert1Sub: "confirmed deadline missed · act today",
    alert2Title: "Budget red threshold",
    alert2Sub: "89% budget used · verify balance",
    alert3Title: "Captain request pending",
    alert3Sub: "supply request awaiting response",
    fleetSummary: "Fleet Summary",
    fleetSummarySub: "4 vessel cards · click for dedicated page",
    datiNoonReport: "Data from Noon Report via N8N",
    nextPort: "Next Port",
    openItems: "Open items",
    budget: "Budget",
    dettaglioNave: "Vessel detail →",
    procurementStatus: "Procurement Status",
    procurementSub: "Pipeline per vessel",
    nave: "VESSEL",
    ordini: "ORDERS",
    rfqChiuse: "RFQ closed",
    reqToPo: "REQ → PO",
    poRicevuti: "PO received",
    rfqAperte: "Open RFQ",
    rfqOverdue: ">7d",
    prontePO: "Ready PO",
    poSenzaDN: "PO no DN",
    dnTransit: "DN transit",
    cancellati: "Cancelled",
    itemConConsegnaScaduta: "items with overdue delivery",
    dnNonRicevuto: "DN not received on board",
    budgetMonitor: "Budget Monitor",
    budgetMonitorSub: "Semaphore per vessel",
    inputManuale: "Manual input Notion",
    residui: "residual",
    usato: "Used",
    totale: "Total",
    emailDigest: "Email Digest",
    emailDigestSub: "Semaphores at home · link to Outlook for detail",
    parsingN8N: "N8N parsing from Outlook",
    orderConf: "Order confirmations",
    orderConfSub: "Order confirmations received",
    captainReq: "Captain requests",
    captainReqSub: "high priority request",
    supplierDelay: "Supplier delay notice",
    ritardoDelivery: "delivery delay",
    apriDigest: "📧 Open full email digest",
    apriOutlook: "↗ Open Outlook",
    lastSync: "Last sync"
  }
};

// ─────────────────────────────────────────────
// LANGUAGE
// ─────────────────────────────────────────────
function setLanguage(lang) {
  const t = translations[lang];
  if (document.getElementById("title"))    document.getElementById("title").textContent    = t.title;
  if (document.getElementById("subtitle")) document.getElementById("subtitle").textContent = t.subtitle;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });
  const btnIt = document.getElementById("lang-it");
  const btnEn = document.getElementById("lang-en");
  if (btnIt) btnIt.classList.toggle("active", lang === "it");
  if (btnEn) btnEn.classList.toggle("active", lang === "en");
  localStorage.setItem("dashboardLang", lang);
}

const btnIt = document.getElementById("lang-it");
const btnEn = document.getElementById("lang-en");
if (btnIt) btnIt.addEventListener("click", () => setLanguage("it"));
if (btnEn) btnEn.addEventListener("click", () => setLanguage("en"));

const savedLang = localStorage.getItem("dashboardLang") || "it";
setLanguage(savedLang);

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function t(key) {
  const lang = localStorage.getItem("dashboardLang") || "it";
  return (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function formatDate(isoString) {
  if (!isoString || isoString === "—") return "—";
  const d = new Date(isoString);
  if (isNaN(d)) return isoString;
  const day   = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en", { month: "short" });
  const hh    = String(d.getHours()).padStart(2, "0");
  const mm    = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${String(d.getMonth()+1).padStart(2,"0")} · ${hh}:${mm}`;
}

function formatDateShort(isoString) {
  if (!isoString || isoString === "—") return "—";
  const d = new Date(isoString);
  if (isNaN(d)) return isoString;
  return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}`;
}

function statusLabel(status) {
  const map = {
    moored:     { it: "Ormeggiata", en: "Moored",     bg: "#1a4d2e", color: "#2fd06f" },
    navigation: { it: "Navigation", en: "Navigation", bg: "#3d2e00", color: "#ffbf3c" },
    delay_risk: { it: "Ritardo",    en: "Delay risk", bg: "#3d1a1a", color: "#ff5f63" },
    on_time:    { it: "On time",    en: "On time",    bg: "#1a3d22", color: "#2fd06f" },
    anchored:   { it: "All'ancora", en: "Anchored",   bg: "#1a2a3d", color: "#57d4ff" }
  };
  return map[status] || { it: status, en: status, bg: "#1a2a3d", color: "#8aa7c2" };
}

function semaphoreColor(level) {
  if (level === "green")  return "#2fd06f";
  if (level === "yellow") return "#ffbf3c";
  if (level === "red")    return "#ff5f63";
  return "#8aa7c2";
}

function deliveryLabel(delivery) {
  const lang = localStorage.getItem("dashboardLang") || "it";
  const map = {
    today:   { it: "Oggi",    en: "Today",   color: "#2fd06f" },
    tomorrow:{ it: "Domani",  en: "Tomorrow",color: "#ffbf3c" },
    delayed: { it: "Ritardo", en: "Delayed", color: "#ff5f63" },
    "48h":   { it: "48h",     en: "48h",     color: "#2fd06f" },
    ok:      { it: "OK",      en: "OK",      color: "#2fd06f" }
  };
  return map[delivery] || { it: delivery, en: delivery, color: "#8aa7c2" };
}

function badgeHTML(value, color, bg) {
  return `<span style="color:${color};background:${bg};padding:2px 8px;border-radius:6px;font-weight:700;font-size:.82rem;">${value}</span>`;
}

const colorMap = {
  green:  { color: "#2fd06f", bg: "#1a4d2e" },
  yellow: { color: "#ffbf3c", bg: "#3d2e00" },
  red:    { color: "#ff5f63", bg: "#3d1a1a" },
  gray:   { color: "#6f8aa5", bg: "#0b1623" }
};

// ─────────────────────────────────────────────
// DETECT PAGE
// ─────────────────────────────────────────────
const page     = document.body.dataset.page;
const vesselId = document.body.dataset.vessel;

// ─────────────────────────────────────────────
// FETCH ALL DATA
// ─────────────────────────────────────────────
Promise.all([
  fetch("data-fleet.json").then(r => r.json()),
  fetch("data-procurement.json").then(r => r.json()),
  fetch("data-budget.json").then(r => r.json()),
  fetch("data-email.json").then(r => r.json())
])
.then(([fleetData, procData, budgetData, emailData]) => {
  if (page === "dashboard") {
    renderDashboard(fleetData, procData, budgetData, emailData);
  } else if (page === "vessel" && vesselId) {
    renderVesselPage(fleetData, procData, budgetData, vesselId);
  }
})
.catch(err => {
  console.error("Data load error:", err);
  const errEl = document.getElementById("data-error");
  if (errEl) errEl.style.display = "block";
});

// ─────────────────────────────────────────────
// RENDER DASHBOARD
// ─────────────────────────────────────────────
function renderDashboard(fleetData, procData, budgetData, emailData) {
  const lang         = localStorage.getItem("dashboardLang") || "it";
  const vessels      = fleetData.vessels;
  const budgetVessels= budgetData.vessels;
  // filtra solo navi reali (esclude hqs o altre voci non-fleet)
  const fleetIds     = vessels.map(v => v.id);
  const procVessels  = procVessels.filter(v => fleetIds.includes(v.vesselId));

  // ── Sync timestamp (usa lastSync da procurement — aggiornato da N8N)
  const syncEl = document.getElementById("sync-time");
  if (syncEl) {
    const d = new Date(procData.lastSync);
    syncEl.textContent = `Sync ${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")} · ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  }

  // ── KPI globali
  // — FIX: usa rfqOpen (non v.rfq che non esiste)
  const totalRfq  = procVessels.reduce((s, v) => s + (v.rfqOpen   || 0), 0);
  // — FIX: usa dnPending (non v.dn che è il totale storico, non il pending)
  const totalDnPending = procVessels.reduce((s, v) => s + (v.dnPending || 0), 0);
  const critCount = vessels.filter(v => v.alertLevel === "crit").length;
  const avgBudget = Math.round(budgetData.fleetSummary.averagePercentage);
  const emailCount = emailData?.summary?.totalUnhandled || 9;

  // contatori mappa
  const onTimeCount  = vessels.filter(v => ["on_time","moored"].includes(v.status)).length;
  const delayCount   = vessels.filter(v => v.status === "delay_risk").length;
  const anchoredCount= vessels.filter(v => v.status === "anchored").length;
  const portCalls    = vessels.filter(v => ["moored","on_time"].includes(v.status)).length;

  setEl("kpi-vessels",  vessels.length);
  setEl("kpi-rfq",      totalRfq);
  setEl("kpi-budget",   avgBudget + "%");
  setEl("kpi-alerts",   critCount);
  setEl("kpi-delivery", totalDnPending);
  setEl("kpi-emails",   emailCount);

  setEl("map-on-time",  onTimeCount);
  setEl("map-delay",    delayCount);
  setEl("map-anchored", anchoredCount);
  setEl("map-portcalls",portCalls);

  // ── Fleet cards
  const fleetGrid = document.getElementById("fleet-grid");
  if (fleetGrid) {
    fleetGrid.innerHTML = vessels.map(v => {
      const sl  = statusLabel(v.status);
      const bv  = budgetVessels.find(b => b.vesselId === v.id) || {};
      const pv  = procVessels.find(p => p.vesselId === v.id)   || {};
      const pct = bv.percentageUsed || 0;
      const bc  = colorMap[bv.semaphore] || colorMap.gray;
      const dl  = deliveryLabel(pv.delivery || "ok");
      const alertIcon = v.alertLevel === "crit" ? "🔴" : v.alertLevel === "warn" ? "🟡" : "🟢";
      const alertText = v.alertLevel === "crit"
        ? `${(v.alerts||[]).length} alert`
        : v.alertLevel === "warn" ? "1 attenzione" : "OK";
      const etaStr = v.eta ? formatDateShort(v.eta) : "—";

      return `
        <div class="ship-card" onclick="location.href='vessel-detail.html?vessel=${v.id}'" style="cursor:pointer">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
            <div>
              <div class="ship-name">🚢 ${v.name}</div>
              <div class="ship-meta">${v.location} · Agent: ${v.agent}</div>
            </div>
            <span style="background:${sl.bg};color:${sl.color};padding:3px 10px;border-radius:20px;font-size:.78rem;font-weight:700;white-space:nowrap">
              ${sl[lang] || sl.en}
            </span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:.82rem;color:#89a8c5;margin-bottom:10px">
            <span>${t("nextPort")} <strong style="color:#d7e8f6">${v.nextPort || "—"}</strong></span>
            <span>ETA <strong style="color:#d7e8f6">${etaStr}</strong></span>
            <span>${t("openItems")} <strong style="color:#d7e8f6">${pv.rfqOpen || 0} proc.</strong></span>
            <span>${t("budget")} <strong style="color:${bc.color}">${pct}%</strong></span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:.82rem">${alertIcon} ${alertText}</span>
            <button class="ghost-btn" style="font-size:.78rem;padding:5px 12px"
              onclick="event.stopPropagation();location.href='vessel-detail.html?vessel=${v.id}'">
              ${t("dettaglioNave")}
            </button>
          </div>
        </div>`;
    }).join("");
  }

  // ── Procurement Status (card per nave con barre)
  const procContainer = document.getElementById("proc-container");
  if (procContainer) {
    // ordina per priorità: delay_risk prima, poi per dnPending desc
    const sortedProc = [...procVessels].sort((a, b) => {
      const fa = vessels.find(v => v.id === a.vesselId);
      const fb = vessels.find(v => v.id === b.vesselId);
      const scoreA = fa?.alertLevel === "crit" ? 2 : fa?.alertLevel === "warn" ? 1 : 0;
      const scoreB = fb?.alertLevel === "crit" ? 2 : fb?.alertLevel === "warn" ? 1 : 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return (b.dnPending || 0) - (a.dnPending || 0);
    });

    procContainer.innerHTML = sortedProc.map(pv => {
      const fv = vessels.find(v => v.id === pv.vesselId) || {};
      const sl = statusLabel(fv.status || "on_time");
      const rfqPct  = Math.round(pv.pctReqToPO  || 0);
      const poPct   = Math.round(pv.pctPOToDN   || 0);
      // pctRfqClosed: % RFQ chiuse su tutti gli items con rfqIssued > 0
      const rfqClosedPct = pv.rfqClosedPct !== undefined
        ? Math.round(pv.rfqClosedPct)
        : Math.round(((pv.orders || 0) / Math.max(pv.totalReq || 1, 1)) * 100);

      // items scaduti: items con deliveryDate < oggi e dnStatus != "DN Received on Board"
      const today = new Date(); today.setHours(0,0,0,0);
      const overdueItems = (pv.items || []).filter(item => {
        if (!item.deliveryDate || item.deliveryDate === "—") return false;
        const dd = new Date(item.deliveryDate);
        return dd < today && item.dnStatus !== "DN Received on Board" && item.reqStatus !== "REQ Cancelled";
      });
      const overdueCount = overdueItems.length;
      const overdueExamples = overdueItems.slice(0, 2).map(i => i.description).join(", ");

      const isDelayed = fv.alertLevel === "crit" || pv.delivery === "delayed";
      const statusColor = isDelayed ? "#ff5f63" : (fv.alertLevel === "warn" ? "#ffbf3c" : "#2fd06f");
      const statusText  = isDelayed
        ? (lang === "it" ? "Ritardo" : "Delayed")
        : (sl[lang] || sl.en);

      return `
        <div style="background:#0d1e30;border:1px solid ${isDelayed ? "rgba(255,95,99,.4)" : "#244765"};border-radius:14px;padding:16px;margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <div style="font-weight:700;font-size:.98rem;color:#d7e8f6">🚢 ${pv.vesselName}</div>
            <div style="display:flex;gap:8px;align-items:center">
              <span style="background:${isDelayed?"rgba(255,95,99,.15)":sl.bg};color:${statusColor};padding:2px 10px;border-radius:20px;font-size:.76rem;font-weight:700">
                ● ${statusText}
              </span>
              <button class="ghost-btn" style="font-size:.75rem;padding:3px 10px"
                onclick="location.href='vessel-detail.html?vessel=${pv.vesselId}'">
                ▼ ${lang==="it"?"dettagli":"details"}
              </button>
            </div>
          </div>

          ${overdueCount > 0 ? `
          <div style="background:rgba(255,95,99,.08);border:1px solid rgba(255,95,99,.3);border-radius:8px;padding:8px 12px;margin-bottom:10px;font-size:.8rem;color:#ff5f63">
            🔴 <strong>${overdueCount} ${t("itemConConsegnaScaduta")}</strong> · ${t("dnNonRicevuto")}
            ${overdueExamples ? `<br><span style="color:#c0d0e0;font-size:.76rem">· es: ${overdueExamples}...</span>` : ""}
          </div>` : ""}

          <div style="display:grid;gap:6px;margin-bottom:10px">
            <div style="display:flex;align-items:center;gap:8px;font-size:.8rem;color:#86a4c0">
              <span style="width:90px">${t("rfqChiuse")}</span>
              <div style="flex:1;height:7px;background:#0b1623;border-radius:4px;overflow:hidden;border:1px solid #1e3a52">
                <div style="width:${rfqClosedPct}%;height:100%;background:#57d4ff;border-radius:4px"></div>
              </div>
              <span style="width:32px;text-align:right;color:#d7e8f6">${rfqClosedPct}%</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font-size:.8rem;color:#86a4c0">
              <span style="width:90px">${t("reqToPo")}</span>
              <div style="flex:1;height:7px;background:#0b1623;border-radius:4px;overflow:hidden;border:1px solid #1e3a52">
                <div style="width:${rfqPct}%;height:100%;background:#2fd06f;border-radius:4px"></div>
              </div>
              <span style="width:32px;text-align:right;color:#d7e8f6">${rfqPct}%</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;font-size:.8rem;color:#86a4c0">
              <span style="width:90px">${t("poRicevuti")}</span>
              <div style="flex:1;height:7px;background:#0b1623;border-radius:4px;overflow:hidden;border:1px solid #1e3a52">
                <div style="width:${poPct}%;height:100%;background:#ffbf3c;border-radius:4px"></div>
              </div>
              <span style="width:32px;text-align:right;color:#d7e8f6">${poPct}%</span>
            </div>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;font-size:.76rem">
            ${pv.rfqOverdue7    > 0 ? `<span style="background:#1a2a3d;border:1px solid #355d7b;border-radius:6px;padding:2px 8px;color:#89a8c5">⏱ <strong style="color:#ffbf3c">${pv.rfqOverdue7}</strong> ${t("rfqAperte")} ${t("rfqOverdue")}</span>` : ""}
            ${pv.readyForPO     > 0 ? `<span style="background:#1a2a3d;border:1px solid #355d7b;border-radius:6px;padding:2px 8px;color:#89a8c5">📋 <strong style="color:#d7e8f6">${pv.readyForPO}</strong> ${t("prontePO")}</span>` : ""}
            ${pv.poReadyForDN   > 0 ? `<span style="background:#1a2a3d;border:1px solid #355d7b;border-radius:6px;padding:2px 8px;color:#89a8c5">📦 <strong style="color:#ffbf3c">${pv.poReadyForDN}</strong> ${t("poSenzaDN")}</span>` : ""}
            ${pv.dnPending      > 0 ? `<span style="background:#1a2a3d;border:1px solid #355d7b;border-radius:6px;padding:2px 8px;color:#89a8c5">🚢 <strong style="color:#2fd06f">${pv.dnPending}</strong> ${t("dnTransit")}</span>` : ""}
          </div>
        </div>`;
    }).join("");
  }

  // ── Budget Monitor
  const budgetList = document.getElementById("budget-list");
  if (budgetList) {
    budgetList.innerHTML = budgetVessels
      .filter(bv => fleetIds.includes(bv.vesselId))
      .map(bv => {
        const pct   = bv.percentageUsed || 0;
        const color = semaphoreColor(bv.semaphore);
        const fill  = bv.semaphore === "red" ? "red" : bv.semaphore === "yellow" ? "yellow" : "green";
        const residualK = Math.round((bv.residualBudget || 0) / 1000);
        const usedK     = Math.round((bv.usedBudget     || 0) / 1000);
        const totalK    = Math.round((bv.totalBudget    || 0) / 1000);
        return `
          <div style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
              <strong style="font-size:.92rem;color:#d7e8f6">${bv.vesselName}</strong>
              <span style="color:${color};font-weight:700;font-size:.9rem">${pct}% · €${residualK}k ${t("residui")}</span>
            </div>
            <div class="budget-bar">
              <div class="fill ${fill}" style="width:${pct}%"></div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:4px;font-size:.78rem;color:#86a4c0">
              <span>${t("usato")}: €${usedK}k</span>
              <span>${t("totale")}: €${totalK}k</span>
            </div>
          </div>`;
      }).join("");
  }

  // ── Email Digest (card 3 categorie)
  renderEmailDigestCards(emailData);
}

// ─────────────────────────────────────────────
// EMAIL DIGEST CARDS (dashboard)
// ─────────────────────────────────────────────
function renderEmailDigestCards(emailData) {
  const s = emailData?.summary || {};
  const orderConfEl   = document.getElementById("email-order-conf-count");
  const captainEl     = document.getElementById("email-captain-count");
  const captainSubEl  = document.getElementById("email-captain-sub");
  const delayVesselEl = document.getElementById("email-delay-vessel");

  if (orderConfEl)  orderConfEl.textContent  = s.orderConfirmations || 0;
  if (captainEl)    captainEl.textContent    = s.captainRequests    || 0;
  if (captainSubEl) captainSubEl.textContent = `${s.captainRequestsHigh || 0} ${t("captainReqSub")}`;
  if (delayVesselEl && s.supplierDelayVessel) {
    delayVesselEl.textContent = `${s.supplierDelayVessel} · ${t("ritardoDelivery")}`;
  }
}

// ─────────────────────────────────────────────
// RENDER VESSEL PAGE
// ─────────────────────────────────────────────
function renderVesselPage(fleetData, procData, budgetData, vesselId) {
  const lang = localStorage.getItem("dashboardLang") || "it";

  // trova dati della nave
  const vessel   = fleetData.vessels.find(v => v.id === vesselId);
  const procV    = proc.Vessels.find(v => v.vesselId === vesselId);
  const budgetV  = budgetData.vessels.find(v => v.vesselId === vesselId);

  if (!vessel || !procV) {
    console.warn("Vessel not found:", vesselId);
    return;
  }

  // ── Topbar / header nave
  const sl = statusLabel(vessel.status);
  setEl("vessel-name",   vessel.name);
  setEl("vessel-imo",    vessel.imo   || "—");
  setEl("vessel-status", sl[lang]     || sl.en);
  setEl("vessel-location", vessel.location || "—");
  setEl("vessel-next-port", vessel.nextPort || "—");
  setEl("vessel-noon",   vessel.lastNoonReport ? formatDate(vessel.lastNoonReport) : "—");

  const statusBadge = document.getElementById("vessel-status-badge");
  if (statusBadge) {
    statusBadge.textContent    = sl[lang] || sl.en;
    statusBadge.style.color    = sl.color;
    statusBadge.style.background = sl.bg;
  }

  // ── Agente
  setEl("vessel-agent",         vessel.agent        || "—");
  setEl("vessel-agent-contact", vessel.agentContact || "—");
  setEl("vessel-agent-location",vessel.location     || "—");

  // ── ETA / ETB / ETD
  setEl("vessel-eta", vessel.eta ? formatDate(vessel.eta) : "—");
  setEl("vessel-etb", vessel.etb ? formatDate(vessel.etb) : "—");
  setEl("vessel-etd", vessel.etd ? formatDate(vessel.etd) : "—");

  // ── KPI barra superiore nave
  setEl("v-req-tot",     procV.totalReq    || 0);
  setEl("v-rfq-open",    procV.rfqOpen     || 0);
  setEl("v-overdue7",    procV.rfqOverdue7 || 0);
  setEl("v-req-po-pct",  (procV.pctReqToPO || 0) + "%");
  setEl("v-po-attivi",   procV.orders      || 0);
  setEl("v-po-dn-pct",   (procV.pctPOToDN  || 0) + "%");
  setEl("v-dn-transit",  procV.dnPending   || 0);
  setEl("v-ready-po",    procV.readyForPO  || 0);

  // colora KPI critici
  colorKpi("v-overdue7",   procV.rfqOverdue7 > 0 ? "#ffbf3c" : "#2fd06f");
  colorKpi("v-req-po-pct", (procV.pctReqToPO||0) < 50 ? "#ffbf3c" : "#2fd06f");
  colorKpi("v-po-dn-pct",  (procV.pctPOToDN ||0) < 30 ? "#ffbf3c" : (procV.pctPOToDN < 60 ? "#ffbf3c" : "#2fd06f"));
  colorKpi("v-dn-transit",  procV.dnPending  > 20 ? "#ffbf3c" : "#d7e8f6");

  // ── Budget
  if (budgetV) {
    const pct   = budgetV.percentageUsed || 0;
    const color = semaphoreColor(budgetV.semaphore);
    const fill  = budgetV.semaphore === "red" ? "red" : budgetV.semaphore === "yellow" ? "yellow" : "green";
    const residualK = Math.round((budgetV.residualBudget || 0) / 1000);
    const usedK     = Math.round((budgetV.usedBudget     || 0) / 1000);
    const totalK    = Math.round((budgetV.totalBudget    || 0) / 1000);
    setEl("v-budget-pct",      pct + "%");
    setEl("v-budget-residual", `€${residualK}k ${t("residui")}`);
    setEl("v-budget-used",     `€${usedK}k`);
    setEl("v-budget-total",    `€${totalK}k`);
    const fillEl = document.getElementById("v-budget-fill");
    if (fillEl) { fillEl.style.width = pct + "%"; fillEl.className = `fill ${fill}`; }
    const pctEl = document.getElementById("v-budget-pct");
    if (pctEl) pctEl.style.color = color;
  }

  // ── Tabella items procurement con filtri
  renderItemsTable(procV, lang);

  // ── Sync time (da procurement — aggiornato da N8N)
  const syncEl = document.getElementById("sync-time");
  if (syncEl) {
    const d = new Date(procData.lastSync);
    syncEl.textContent = `Sync ${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}, ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  }
}

function colorKpi(id, color) {
  const el = document.getElementById(id);
  if (el) el.style.color = color;
}

// ─────────────────────────────────────────────
// ITEMS TABLE — vessel-detail con filtri
// ─────────────────────────────────────────────
function renderItemsTable(procV, lang) {
  const container = document.getElementById("items-table-container");
  if (!container) return;

  const items   = procV.items || [];
  const today   = new Date(); today.setHours(0,0,0,0);
  let activeFilter = "all";

  // Definizione filtri con contatori dinamici
  const filters = [
    {
      key: "all",
      labelIt: "Tutti",
      labelEn: "All",
      count: () => items.filter(i => i.reqStatus !== "REQ Cancelled").length,
      fn: i => i.reqStatus !== "REQ Cancelled"
    },
    {
      key: "rfq_open",
      labelIt: "RFQ aperte",
      labelEn: "Open RFQ",
      color: "#ff5f63",
      count: () => items.filter(i => i.rfqStatus === "RFQ Sent to Vendor" || (i.rfqIssued > 0 && i.rfqClosed < i.rfqIssued)).length,
      fn: i => i.rfqStatus === "RFQ Sent to Vendor" || (i.rfqIssued > 0 && i.rfqClosed < i.rfqIssued)
    },
    {
      key: "overdue",
      labelIt: ">7gg",
      labelEn: ">7d",
      color: "#ff5f63",
      count: () => items.filter(i => {
        if (!i.deliveryDate || i.deliveryDate === "—") return false;
        const dd = new Date(i.deliveryDate);
        return dd < today && i.dnStatus !== "DN Received on Board" && i.reqStatus !== "REQ Cancelled";
      }).length,
      fn: i => {
        if (!i.deliveryDate || i.deliveryDate === "—") return false;
        const dd = new Date(i.deliveryDate);
        return dd < today && i.dnStatus !== "DN Received on Board" && i.reqStatus !== "REQ Cancelled";
      }
    },
    {
      key: "ready_po",
      labelIt: "Pronte PO",
      labelEn: "Ready PO",
      color: "#d7e8f6",
      count: () => items.filter(i => i.rfqStatus === "RFQ Offer Acknowledged" && !i.poStatus).length,
      fn: i => i.rfqStatus === "RFQ Offer Acknowledged" && !i.poStatus
    },
    {
      key: "po_no_dn",
      labelIt: "PO senza DN",
      labelEn: "PO no DN",
      color: "#ffbf3c",
      count: () => items.filter(i => i.poStatus && i.poStatus.startsWith("PO") && !i.dnStatus && i.poStatus !== "PO Cancelled").length,
      fn: i => i.poStatus && i.poStatus.startsWith("PO") && !i.dnStatus && i.poStatus !== "PO Cancelled"
    },
    {
      key: "dn_transit",
      labelIt: "DN transit",
      labelEn: "DN transit",
      color: "#2fd06f",
      count: () => items.filter(i => i.dnStatus === "DN Shipped to Vessel" || i.dnStatus === "DN Ready for Shipment").length,
      fn: i => i.dnStatus === "DN Shipped to Vessel" || i.dnStatus === "DN Ready for Shipment"
    },
    {
      key: "cancelled",
      labelIt: "Cancellati",
      labelEn: "Cancelled",
      color: "#6f8aa5",
      count: () => items.filter(i => i.reqStatus === "REQ Cancelled" || i.poStatus === "PO Cancelled").length,
      fn: i => i.reqStatus === "REQ Cancelled" || i.poStatus === "PO Cancelled"
    }
  ];

  function renderTable() {
    const filter  = filters.find(f => f.key === activeFilter);
    const visible = items.filter(filter.fn);

    const pillsHTML = filters.map(f => {
      const cnt = f.count();
      const isActive = f.key === activeFilter;
      const dotColor = f.color || "#89a8c5";
      return `
        <button onclick="setItemFilter('${f.key}')"
          style="border:1px solid ${isActive ? dotColor : "#244765"};
                 background:${isActive ? "rgba(87,212,255,.08)" : "transparent"};
                 color:${isActive ? "#d7e8f6" : "#86a4c0"};
                 padding:4px 12px;border-radius:20px;cursor:pointer;font-size:.78rem;
                 font-family:Arial,sans-serif;white-space:nowrap">
          ${f.key !== "all" && f.color ? `<span style="color:${dotColor}">●</span> ` : ""}${f[lang==="it"?"labelIt":"labelEn"]}
          <strong style="color:${isActive?"#d7e8f6":dotColor}">${cnt}</strong>
        </button>`;
    }).join("");

    const rowsHTML = visible.length === 0
      ? `<div style="padding:20px;text-align:center;color:#86a4c0;font-size:.85rem">Nessun elemento</div>`
      : visible.map(item => {
          const reqBadge  = item.reqStatus  ? statusBadge(item.reqStatus)  : "";
          const rfqBadge  = item.rfqStatus  ? statusBadge(item.rfqStatus)  : "";
          const poBadge   = item.poStatus   ? statusBadge(item.poStatus)   : "";
          const dnBadge   = item.dnStatus   ? statusBadge(item.dnStatus)   : "";
          const isOverdue = item.deliveryDate && item.deliveryDate !== "—"
            && new Date(item.deliveryDate) < today
            && item.dnStatus !== "DN Received on Board"
            && item.reqStatus !== "REQ Cancelled";
          const dateColor = isOverdue ? "#ff5f63" : "#89a8c5";
          const dateStr   = item.deliveryDate && item.deliveryDate !== "—"
            ? formatDateShort(item.deliveryDate)
            : "—";
          const supplier  = item.supplier && item.supplier !== "—" ? item.supplier : "";

          return `
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr 0.8fr;gap:8px;
                        padding:10px 14px;border-bottom:1px solid rgba(36,71,101,.35);
                        font-size:.78rem;align-items:center">
              <div>
                <div style="color:#d7e8f6;font-weight:600;line-height:1.3">${item.description}</div>
                ${supplier ? `<div style="color:#5a7a96;margin-top:2px;font-size:.73rem">${supplier}</div>` : ""}
              </div>
              <div>${reqBadge}</div>
              <div>${rfqBadge}
                ${item.rfqIssued > 0 ? `<div style="color:#5a7a96;font-size:.7rem;margin-top:2px">${item.rfqClosed}/${item.rfqIssued} closed</div>` : ""}
              </div>
              <div>${poBadge}</div>
              <div>${dnBadge}</div>
              <div style="color:${dateColor};font-weight:${isOverdue?"700":"400"}">${dateStr}${isOverdue?"  ⚠":""}</div>
            </div>`;
        }).join("");

    container.innerHTML = `
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;align-items:center">
        ${pillsHTML}
        <span style="margin-left:auto;color:#5a7a96;font-size:.78rem">${visible.length} items</span>
      </div>
      <div style="background:#0b1623;border:1px solid #244765;border-radius:12px;overflow:hidden">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr 0.8fr;gap:8px;
                    padding:8px 14px;background:rgba(87,212,255,.05);
                    font-size:.72rem;color:#6a8aaa;text-transform:uppercase;letter-spacing:.05em">
          <span>${lang==="it"?"Descrizione":"Description"}</span>
          <span>REQ</span><span>RFQ</span><span>PO</span><span>DN</span>
          <span>${lang==="it"?"Consegna":"Delivery"}</span>
        </div>
        ${rowsHTML}
      </div>`;
  }

  // esponi la funzione per i click sui pill
  window.setItemFilter = function(key) {
    activeFilter = key;
    renderTable();
  };

  renderTable();
}

// ─────────────────────────────────────────────
// STATUS BADGE helper
// ─────────────────────────────────────────────
function statusBadge(status) {
  if (!status) return "";
  const map = {
    "REQ Ordered":           { c: "#2fd06f", bg: "#0e2a1a" },
    "REQ Price Sourcing":    { c: "#ffbf3c", bg: "#2a1e00" },
    "REQ Endorsed":          { c: "#89a8c5", bg: "#0b1623" },
    "REQ Approved":          { c: "#57d4ff", bg: "#0a1e2e" },
    "REQ Cancelled":         { c: "#6f8aa5", bg: "#0b1623" },
    "RFQ Sent to Vendor":    { c: "#ffbf3c", bg: "#2a1e00" },
    "RFQ Offer Acknowledged":{ c: "#57d4ff", bg: "#0a1e2e" },
    "RFQ Refused":           { c: "#ff5f63", bg: "#2a0b0b" },
    "RFQ Cancelled":         { c: "#6f8aa5", bg: "#0b1623" },
    "PO Created":            { c: "#ffbf3c", bg: "#2a1e00" },
    "PO Approved":           { c: "#57d4ff", bg: "#0a1e2e" },
    "PO Confirmed":          { c: "#57d4ff", bg: "#0a1e2e" },
    "PO Published":          { c: "#8ad9ff", bg: "#0a2030" },
    "PO Finalized":          { c: "#2fd06f", bg: "#0e2a1a" },
    "PO Cancelled":          { c: "#6f8aa5", bg: "#0b1623" },
    "DN Ready for Shipment": { c: "#ffbf3c", bg: "#2a1e00" },
    "DN Shipped to Vessel":  { c: "#57d4ff", bg: "#0a1e2e" },
    "DN Received on Board":  { c: "#2fd06f", bg: "#0e2a1a" },
    "DN Cancelled":          { c: "#6f8aa5", bg: "#0b1623" }
  };
  const s = map[status] || { c: "#89a8c5", bg: "#0b1623" };
  const label = status
    .replace("REQ ", "").replace("RFQ ", "").replace("PO ", "").replace("DN ", "")
    .replace(" Acknowledged","✓").replace(" Finalized","✓").replace(" Received on Board","✓")
    .replace(" Sent to Vendor","↗").replace(" Shipped to Vessel","→")
    .replace(" Ready for Shipment","📦").replace(" Published","⬜").replace(" Price Sourcing","🔍")
    .replace(" Cancelled","✕").replace(" Endorsed","↑");
  return `<span style="background:${s.bg};color:${s.c};padding:2px 7px;border-radius:5px;font-size:.73rem;font-weight:600;white-space:nowrap">${label}</span>`;
}

}); // end DOMContentLoaded
