/* ============================================================
   Maritime Purchasing HQ — app.js
   i18n IT/EN + fetch JSON + dynamic render
   ============================================================ */

/* ── TRANSLATIONS ── */
const i18n = {
  en: {
    title:              "Maritime Purchasing HQ",
    subtitle:           "Operational Command Center",
    fleetMap:           "Fleet Status Map",
    activeFleet:        "Active Fleet",
    openRFQ:            "Open RFQ",
    budgetAvg:          "Budget Avg",
    critAlerts:         "Crit Alerts",
    deliveryPending:    "Delivery Pending",
    operativeEmails:    "Operative Emails",
    alerts:             "Alerts",
    fleetSummary:       "Fleet Summary",
    viewDetails:        "View Details →",
    procurementStatus:  "Procurement Status",
    vessel:             "Vessel",
    rfq:                "RFQ",
    orders:             "Orders",
    dn:                 "DN",
    budgetMonitor:      "Budget Monitor",
    residual:           "Residual",
    certifications:     "Certifications & Expiry",
    expired:            "Expired / <15d",
    expiring30d:        "Expiring 30d",
    valid:              "Valid",
    messageComposer:    "Message Composer",
    poweredBy:          "Powered by Maritime Purchasing HQ",
    lastSync:           "Last sync",
    onTime:             "On Time",
    delayRisk:          "Delay Risk",
    anchored:           "Anchored",
    moored:             "Moored",
    navigation:         "Navigation",
    nextPort:           "Next port",
    eta:                "ETA",
    openItems:          "Open items",
  },
  it: {
    title:              "Maritime Purchasing HQ",
    subtitle:           "Centro Comando Operativo",
    fleetMap:           "Mappa Stato Flotta",
    activeFleet:        "Flotta Attiva",
    openRFQ:            "RFQ Aperti",
    budgetAvg:          "Budget Medio",
    critAlerts:         "Alert Critici",
    deliveryPending:    "Consegne Pending",
    operativeEmails:    "Email Operative",
    alerts:             "Avvisi",
    fleetSummary:       "Riepilogo Flotta",
    viewDetails:        "Vedi Dettaglio →",
    procurementStatus:  "Stato Acquisti",
    vessel:             "Nave",
    rfq:                "RFQ",
    orders:             "Ordini",
    dn:                 "DN",
    budgetMonitor:      "Monitor Budget",
    residual:           "Residuo",
    certifications:     "Certificazioni & Scadenze",
    expired:            "Scaduti / <15g",
    expiring30d:        "In scadenza 30g",
    valid:              "Validi",
    messageComposer:    "Compositore Messaggi",
    poweredBy:          "Powered by Maritime Purchasing HQ",
    lastSync:           "Ultimo aggiornamento",
    onTime:             "In Orario",
    delayRisk:          "Rischio Ritardo",
    anchored:           "Ancorato",
    moored:             "Ormeggiato",
    navigation:         "Navigazione",
    nextPort:           "Porto successivo",
    eta:                "ETA",
    openItems:          "Voci aperte",
  }
};

/* ── LANGUAGE ── */
let currentLang = localStorage.getItem("dashboardLang") || "en";

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("dashboardLang", lang);
  const t = i18n[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.id === "lang-" + lang);
  });
}

/* ── CLOCK ── */
function updateClock() {
  const el = document.getElementById("current-time");
  if (!el) return;
  const now = new Date();
  el.textContent = now.toUTCString().slice(0, 25) + " UTC";
}

/* ── HELPERS ── */
function statusColor(s) {
  if (!s) return "neutral";
  s = s.toLowerCase();
  if (s.includes("on_time") || s.includes("moored")) return "green";
  if (s.includes("delay") || s.includes("navigation")) return "yellow";
  if (s.includes("anchor")) return "red";
  return "green";
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch { return iso; }
}

function formatDateTime(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) +
           " " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " UTC";
  } catch { return iso; }
}

/* ── TEMPLATES COMPOSER ── */
const templates = {
  "eta-agent": (v) => `TO: ${v ? v.agent : "[Agent]"}\nSUBJECT: ETA Confirmation Request — ${v ? v.name : "[Vessel]"}\n\nDear ${v ? v.agent : "[Agent]"},\nPlease confirm ETA for ${v ? v.name : "[Vessel]"} at ${v ? v.nextPort : "[Port]"}.\nExpected arrival: ${formatDateTime(v ? v.eta : null)}\n\nBest regards,\nMaritime Purchasing HQ`,
  "order-confirm": (v) => `TO: [Supplier]\nSUBJECT: Order Confirmation — ${v ? v.name : "[Vessel]"}\n\nDear [Supplier],\nWe confirm the purchase order for ${v ? v.name : "[Vessel]"}.\nDelivery port: ${v ? v.nextPort : "[Port]"}\nETA: ${formatDateTime(v ? v.eta : null)}\n\nBest regards,\nMaritime Purchasing HQ`,
  "captain-req": (v) => `TO: Captain — ${v ? v.name : "[Vessel]"}\nSUBJECT: Request Acknowledged — ${v ? v.name : "[Vessel]"}\n\nDear Captain,\nYour request has been received and is being processed.\nWe will update you before ETB: ${formatDateTime(v ? v.etb : null)}\n\nBest regards,\nMaritime Purchasing HQ`,
};

/* ── RENDER FLEET CARDS ── */
function renderFleet(vessels) {
  const container = document.getElementById("fleet-container");
  if (!container) return;
  const t = i18n[currentLang];
  container.innerHTML = vessels.map(v => {
    const col = v.statusColor || statusColor(v.status);
    const statusLabel = t[v.status] || v.status || "—";
    return `<div class="ship-card">
      <div class="ship-status-bar ${col}"></div>
      <div class="ship-name">${v.name}</div>
      <div class="ship-meta">
        <span>📍 ${v.location || "—"}</span>
        <span>${t.nextPort}: ${v.nextPort || "—"}</span>
        <span>${t.eta}: ${formatDateTime(v.eta)}</span>
        <span>${t.openItems}: ${v.openItems || 0}</span>
      </div>
      <a class="ghost-btn" href="vessel.html?vessel=${v.id}" data-i18n="viewDetails">${t.viewDetails}</a>
    </div>`;
  }).join("");
}

/* ── RENDER ALERTS ── */
function renderAlerts(vessels) {
  const container = document.getElementById("alerts-container");
  if (!container) return;
  const allAlerts = [];
  vessels.forEach(v => {
    (v.alerts || []).forEach(a => {
      allAlerts.push({ vessel: v.name, ...a });
    });
  });
  if (allAlerts.length === 0) {
    container.innerHTML = `<div class="alert warn">⚓ No active alerts at this time.</div>`;
    return;
  }
  container.innerHTML = allAlerts.map(a =>
    `<div class="alert ${a.type}">
      <span>${a.type === "crit" ? "🚨" : "⚠️"}</span>
      <span><strong>${a.vessel}</strong> — ${a.message}</span>
    </div>`
  ).join("");
}

/* ── RENDER KPI FROM FLEET ── */
function renderKPI(fleetData, budgetData, procData, emailData) {
  const vessels = fleetData.vessels || [];

  let onTime = 0, delayRisk = 0, anchored = 0;
  let critCount = 0;
  vessels.forEach(v => {
    if (v.alertLevel === "crit") critCount++;
    const s = (v.status || "").toLowerCase();
    if (s.includes("on_time") || s.includes("moored")) onTime++;
    else if (s.includes("delay") || s.includes("navigation")) delayRisk++;
    else if (s.includes("anchor")) anchored++;
  });

  const setEl = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  setEl("kpi-fleet", vessels.length);
  setEl("map-fleet-count", vessels.length);
  setEl("map-on-time", onTime);
  setEl("map-delay", delayRisk);
  setEl("map-anchored", anchored);
  setEl("kpi-alerts", critCount);

  if (budgetData) {
    const avg = budgetData.fleetSummary?.averagePercentage || 0;
    setEl("kpi-budget", avg + "%");
  }
  if (procData) {
    const allVessels = procData.vessels || [];
    const totalRFQ = allVessels.reduce((s, v) => s + (v.rfqOpen || 0), 0);
    const totalDN  = allVessels.reduce((s, v) => s + (v.dnPending || 0), 0);
    setEl("kpi-rfq", totalRFQ);
    setEl("kpi-delivery", totalDN);
  }
  if (emailData) {
    setEl("kpi-emails", emailData.summary?.totalUnhandled || 0);
  }
}

/* ── RENDER PROCUREMENT TABLE ── */
function renderProcurement(procData) {
  const tbody = document.getElementById("proc-tbody");
  if (!tbody || !procData) return;
  const vessels = procData.vessels || [];
  tbody.innerHTML = vessels.map(v => {
    const rfqCol = v.rfqOpen > 0 ? (v.rfqOverdue7 > 0 ? "red" : "yellow") : "green";
    const ordCol = v.orders > 0 ? "neutral" : "green";
    const dnCol  = v.delivery === "delayed" ? "red" : (v.dnPending > 0 ? "yellow" : "green");
    return `<tr>
      <td>${v.vesselName}</td>
      <td><span class="proc-badge ${rfqCol}">${v.rfqOpen}</span></td>
      <td><span class="proc-badge ${ordCol}">${v.orders}</span></td>
      <td><span class="proc-badge ${dnCol}">${v.dn} <small style="opacity:.7">(${v.dnPending} pend.)</small></span></td>
    </tr>`;
  }).join("");
}

/* ── RENDER BUDGET ── */
function renderBudget(budgetData) {
  const container = document.getElementById("budget-container");
  if (!container || !budgetData) return;
  const t = i18n[currentLang];
  container.innerHTML = (budgetData.vessels || []).map(v => {
    const pct = v.percentageUsed || 0;
    const col = v.semaphore || (pct >= 85 ? "red" : pct >= 70 ? "yellow" : "green");
    return `<div class="budget-item">
      <div class="budget-item-header">
        <span>${v.vesselName}</span>
        <span class="pct" style="color:${col === 'red' ? '#ff5f63' : col === 'yellow' ? '#ffbf3c' : '#2fd06f'}">${pct}%</span>
      </div>
      <div class="budget-bar"><div class="fill ${col}" style="width:${pct}%"></div></div>
      <div class="budget-sub">${t.residual}: €${(v.residualBudget || 0).toLocaleString("en-IE")}</div>
    </div>`;
  }).join("");
}

/* ── COMPOSER ── */
function initComposer(vessels) {
  const preview = document.getElementById("email-preview");
  const templates_els = document.querySelectorAll(".template-box");
  if (!preview || !templates_els.length) return;

  let selectedTemplate = "eta-agent";
  let selectedVessel = vessels && vessels.length ? vessels[0] : null;

  function updatePreview() {
    const fn = templates[selectedTemplate];
    preview.textContent = fn ? fn(selectedVessel) : "Select a template...";
  }

  templates_els.forEach(box => {
    box.addEventListener("click", () => {
      templates_els.forEach(b => b.classList.remove("active"));
      box.classList.add("active");
      selectedTemplate = box.dataset.template;
      updatePreview();
    });
  });

  updatePreview();
}

/* ── MAIN LOAD ── */
async function loadDashboard() {
  try {
    const [fleetRes, budgetRes, procRes, emailRes] = await Promise.allSettled([
      fetch("data-fleet.json").then(r => r.json()),
      fetch("data-budget.json").then(r => r.json()),
      fetch("data-procurement.json").then(r => r.json()),
      fetch("data-email.json").then(r => r.json()),
    ]);

    const fleetData  = fleetRes.status  === "fulfilled" ? fleetRes.value  : null;
    const budgetData = budgetRes.status === "fulfilled" ? budgetRes.value : null;
    const procData   = procRes.status   === "fulfilled" ? procRes.value   : null;
    const emailData  = emailRes.status  === "fulfilled" ? emailRes.value  : null;

    if (fleetData) {
      renderFleet(fleetData.vessels || []);
      renderAlerts(fleetData.vessels || []);
      renderKPI(fleetData, budgetData, procData, emailData);
      initComposer(fleetData.vessels || []);
    }
    if (procData)   renderProcurement(procData);
    if (budgetData) renderBudget(budgetData);

    // Last sync
    const syncEl = document.getElementById("last-sync");
    if (syncEl && fleetData?.lastSync) {
      syncEl.textContent = i18n[currentLang].lastSync + ": " + formatDate(fleetData.lastSync);
    }

  } catch (err) {
    console.error("Dashboard load error:", err);
  }
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  applyLang(currentLang);
  updateClock();
  setInterval(updateClock, 30000);

  document.getElementById("lang-it")?.addEventListener("click", () => { applyLang("it"); renderBudget(window._budgetData); });
  document.getElementById("lang-en")?.addEventListener("click", () => { applyLang("en"); renderBudget(window._budgetData); });

  if (document.getElementById("fleet-container")) {
    loadDashboard();
  }
});
