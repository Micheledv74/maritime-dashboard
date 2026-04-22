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
      nextPort: "Prossimo Porto",
      openItems: "Items aperti",
      dettaglioNave: "Dettaglio nave →",
      procurementStatus: "Procurement Status",
      procurementSub: "Numeri per nave",
      nave: "NAVE",
      ordini: "ORDINI",
      budgetMonitor: "Budget Monitor",
      budgetMonitorSub: "Semaforo per nave",
      emailDigest: "Email Digest",
      emailDigestSub: "Semafori in home · link a Outlook per dettaglio",
      orderConf: "Conferme ordine",
      orderConfSub: "Conferme ordine ricevute",
      captainReq: "Richieste capitano",
      captainReqSub: "1 richiesta con priorità alta",
      supplierDelay: "Avviso ritardo fornitore",
      ritardoDelivery: "ritardo delivery",
      apriDigest: "📧 Apri email digest completo",
      backDash: "← Dashboard",
      routeInfo: "Route & Port Info",
      agent: "Agente",
      position: "Posizione",
      procurementVesselSub: "Items aperti su questa nave",
      budgetVesselSub: "Utilizzo per questa nave",
      item: "Item",
      ordine: "Ord.",
      consegna: "Consegna",
      certifications: "Certificazioni & Scadenze",
      certificationsSub: "Semaforo scadenze per questa nave",
      certExpired: "Scaduto / meno di 15 giorni",
      certExpiring: "Scade entro 30 giorni",
      certValid: "Valido oltre 30 giorni",
      emailCollegate: "Email collegate",
      emailCollegateSub: "Messaggi operativi recenti su questa nave",
      emailOrderConf: "Order confirmation",
      emailRFQ: "RFQ response received",
      captainRequest: "Captain request — supplies",
      loadingError: "Errore caricamento dati",
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
      nextPort: "Next Port",
      openItems: "Open items",
      dettaglioNave: "Vessel detail →",
      procurementStatus: "Procurement Status",
      procurementSub: "Numbers per vessel",
      nave: "VESSEL",
      ordini: "ORDERS",
      budgetMonitor: "Budget Monitor",
      budgetMonitorSub: "Semaphore per vessel",
      emailDigest: "Email Digest",
      emailDigestSub: "Semaphores at home · link to Outlook for detail",
      orderConf: "Order confirmations",
      orderConfSub: "Order confirmations received",
      captainReq: "Captain requests",
      captainReqSub: "1 high priority request",
      supplierDelay: "Supplier delay notice",
      ritardoDelivery: "delivery delay",
      apriDigest: "📧 Open full email digest",
      backDash: "← Dashboard",
      routeInfo: "Route & Port Info",
      agent: "Agent",
      position: "Position",
      procurementVesselSub: "Open items for this vessel",
      budgetVesselSub: "Usage for this vessel",
      item: "Item",
      ordine: "Ord.",
      consegna: "Delivery",
      certifications: "Certifications & Expiry",
      certificationsSub: "Expiry semaphore for this vessel",
      certExpired: "Expired / under 15 days",
      certExpiring: "Expiring within 30 days",
      certValid: "Valid beyond 30 days",
      emailCollegate: "Related emails",
      emailCollegateSub: "Recent operational messages for this vessel",
      emailOrderConf: "Order confirmation",
      emailRFQ: "RFQ response received",
      captainRequest: "Captain request — supplies",
      loadingError: "Data loading error",
      lastSync: "Last sync"
    }
  };

  // ─────────────────────────────────────────────
  // LANGUAGE
  // ─────────────────────────────────────────────
  function setLanguage(lang) {
    if (document.getElementById("title"))
      document.getElementById("title").textContent = translations[lang].title;
    if (document.getElementById("subtitle"))
      document.getElementById("subtitle").textContent = translations[lang].subtitle;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) el.textContent = translations[lang][key];
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
  function formatDate(isoString) {
    if (!isoString) return "—";
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en", { month: "short" });
    const year = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year} · ${hh}:${mm}`;
  }

  function statusLabel(status) {
    const map = {
      moored:      { it: "Moored",      en: "Moored",      bg: "#1a4d2e", color: "#2fd06f" },
      navigation:  { it: "Navigation",  en: "Navigation",  bg: "#3d2e00", color: "#ffbf3c" },
      delay_risk:  { it: "Delay risk",  en: "Delay risk",  bg: "#3d1a1a", color: "#ff5f63" },
      on_time:     { it: "On time",     en: "On time",     bg: "#1a3d22", color: "#2fd06f" },
      anchored:    { it: "All'ancora",  en: "Anchored",    bg: "#1a2a3d", color: "#57d4ff" }
    };
    return map[status] || { it: status, en: status, bg: "#1a2a3d", color: "#8aa7c2" };
  }

  function semaphoreColor(level) {
    if (level === "green") return "#2fd06f";
    if (level === "yellow") return "#ffbf3c";
    if (level === "red") return "#ff5f63";
    return "#8aa7c2";
  }

  function deliveryLabel(delivery, lang) {
    const map = {
      today:    { it: "Oggi",    en: "Today",    color: "#2fd06f" },
      tomorrow: { it: "Domani",  en: "Tomorrow", color: "#ffbf3c" },
      delayed:  { it: "Ritardo", en: "Delayed",  color: "#ff5f63" },
      "48h":    { it: "48h",     en: "48h",      color: "#2fd06f" }
    };
    return map[delivery] || { it: delivery, en: delivery, color: "#8aa7c2" };
  }

  function badgeHTML(value, color, bg) {
    return `<span style="background:${bg};color:${color};padding:2px 9px;border-radius:20px;">${value}</span>`;
  }

  const colorMap = {
    green:  { color: "#2fd06f", bg: "#1a4d2e" },
    yellow: { color: "#ffbf3c", bg: "#3d2e00" },
    red:    { color: "#ff5f63", bg: "#3d1a1a" },
    gray:   { color: "#6f8aa5", bg: "#0b1623" }
  };

  // ─────────────────────────────────────────────
  // KPI ITEMS — unica fonte di verità
  // Calcola tutti i KPI procurement dagli items[]
  // così contatori e lista usano sempre la stessa logica
  // ─────────────────────────────────────────────
  function calcKPI(proc) {
    if (!proc || !proc.items) return {
      rfqOpenItems: [], scaduteItems: [], poAttiviItems: [],
      dnTransitItems: [], prontiPoItems: [],
      rfqOpenCount: 0, scaduteCount: 0, poAttiviCount: 0,
      dnTransitCount: 0, prontiPoCount: 0
    };

    const activeItems = proc.items.filter(i =>
      i.reqStatus !== "REQ Cancelled" &&
      i.poStatus  !== "PO Cancelled"
    );

    // RFQ APERTE: RFQ Sent to Vendor o REQ Endorsed, senza PO ancora emesso
    const rfqOpenItems = activeItems.filter(i =>
      (i.rfqStatus === "RFQ Sent to Vendor" || i.reqStatus === "REQ Endorsed") &&
      (!i.poStatus || i.poStatus === "")
    );

    // SCADUTE >7GG: RFQ Sent to Vendor senza PO, da più di 7 giorni
    const scaduteItems = rfqOpenItems.filter(i =>
      i.rfqDays !== null && i.rfqDays > 7
    );

    // PO ATTIVI: PO emesso ma DN non ancora emesso
    const poAttiviItems = activeItems.filter(i =>
      i.poStatus && i.poStatus !== "" &&
      (!i.dnStatus || i.dnStatus === "")
    );

    // DN TRANSIT: DN in viaggio verso la nave
    const dnTransitItems = activeItems.filter(i =>
      i.dnStatus === "DN Shipped to Vessel" ||
      i.dnStatus === "DN Ready for Shipment"
    );

    // PRONTI PO: offerta ricevuta da >7gg, PO non ancora emesso
    const prontiPoItems = activeItems.filter(i =>
      i.rfqStatus === "RFQ Offer Acknowledged" &&
      (!i.poStatus || i.poStatus === "") &&
      i.rfqDays !== null && i.rfqDays > 7
    );

    return {
      activeItems,
      rfqOpenItems,  rfqOpenCount:   rfqOpenItems.length,
      scaduteItems,  scaduteCount:   scaduteItems.length,
      poAttiviItems, poAttiviCount:  poAttiviItems.length,
      dnTransitItems,dnTransitCount: dnTransitItems.length,
      prontiPoItems, prontiPoCount:  prontiPoItems.length
    };
  }

  // ─────────────────────────────────────────────
  // DETECT PAGE
  // ─────────────────────────────────────────────
  const page = document.body.dataset.page;
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
  .then(([fleetData, procData, budgetData]) => {
    if (page === "dashboard") {
      renderDashboard(fleetData, procData, budgetData);
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
  function renderDashboard(fleetData, procData, budgetData) {
    const lang = localStorage.getItem("dashboardLang") || "it";
    const vessels = fleetData.vessels;
    const budgetVessels = budgetData.vessels;
    const procVessels = procData.vessels;

    // Sync timestamp
    const syncEl = document.getElementById("sync-time");
    if (syncEl) {
      const d = new Date(fleetData.lastSync);
      syncEl.textContent = `Sync ${d.getDate()} ${d.toLocaleString("en",{month:"short"})} · ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
    }

    // KPI globali calcolati dagli items
    const critCount    = vessels.filter(v => v.alertLevel === "crit").length;
    const onTimeCount  = vessels.filter(v => v.alertLevel === "ok").length;
    const delayCount   = vessels.filter(v => v.alertLevel === "crit").length;
    const anchoredCount= vessels.filter(v => v.status === "anchored").length;
    const avgBudget    = Math.round(budgetData.fleetSummary.averagePercentage);

    const totalRfqOpen   = procVessels.reduce((s,v) => s + calcKPI(v).rfqOpenCount, 0);
    const totalDnTransit = procVessels.reduce((s,v) => s + calcKPI(v).dnTransitCount, 0);

    setEl("kpi-vessels",  vessels.length);
    setEl("kpi-rfq",      totalRfqOpen);
    setEl("kpi-budget",   avgBudget + "%");
    setEl("kpi-alerts",   critCount);
    setEl("kpi-delivery", totalDnTransit);
    setEl("map-on-time",  onTimeCount);
    setEl("map-delay",    delayCount);
    setEl("map-anchored", anchoredCount);

    // Fleet cards
    const fleetGrid = document.getElementById("fleet-grid");
    if (fleetGrid) {
      fleetGrid.innerHTML = vessels.map(v => {
        const sl = statusLabel(v.status);
        const bv = budgetVessels.find(b => b.vesselId === v.id) || {};
        const pv = procVessels.find(p => p.vesselId === v.id) || {};
        const pct = bv.percentageUsed || 0;
        const bc = colorMap[bv.semaphore] || colorMap.gray;
        const dl = deliveryLabel(pv.delivery, lang);
        const alertIcon = v.alertLevel === "crit" ? "🔴 🟡" : v.alertLevel === "warn" ? "🟡" : "🟢 🟢";
        const alertText = v.alertLevel === "crit" ? `${v.alerts.length} alert` : v.alertLevel === "warn" ? "1 attenzione" : "OK";

        return `
        <div class="ship-card">
          <div>
            <div class="ship-name">${v.name}</div>
            <div class="ship-meta">${v.location} · Agent: ${v.agent}</div>
            <div style="margin-top:6px;">
              <span style="background:${sl.bg};color:${sl.color};padding:3px 10px;border-radius:20px;font-size:0.78rem;font-weight:700;">${sl.it}</span>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:0.82rem;text-align:left;width:100%;">
            <div><span style="color:#6f8aa5;">${lang === "it" ? "Prossimo Porto" : "Next Port"}</span><br><strong>${v.nextPort}</strong></div>
            <div><span style="color:#6f8aa5;">ETA</span><br><strong>${formatDate(v.eta).split(" · ")[0].slice(0,6)} · ${formatDate(v.eta).split(" · ")[1]}</strong></div>
            <div><span style="color:#6f8aa5;">${lang === "it" ? "Items aperti" : "Open items"}</span><br><strong>${v.openItems} proc.</strong></div>
            <div><span style="color:#6f8aa5;">Budget</span><br><strong style="color:${bc.color};">${pct}%</strong></div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
            <span style="font-size:0.82rem;">${alertIcon} ${alertText}</span>
            <a href="vessel-${v.id}.html" style="text-decoration:none;">
              <button class="ghost-btn">${lang === "it" ? "Dettaglio nave →" : "Vessel detail →"}</button>
            </a>
          </div>
        </div>`;
      }).join("");
    }

    // Procurement table
    const procTable = document.getElementById("proc-table-body");
    if (procTable) {
      procTable.innerHTML = procVessels.map(v => {
        const kpi = calcKPI(v);
        const rfqC = kpi.rfqOpenCount > 1 ? colorMap.red : kpi.rfqOpenCount === 1 ? colorMap.yellow : colorMap.gray;
        const poC  = kpi.poAttiviCount > 0 ? colorMap.yellow : colorMap.gray;
        const dnC  = kpi.dnTransitCount > 0 ? colorMap.yellow : colorMap.gray;
        const dl   = deliveryLabel(v.delivery, lang);
        return `
        <div class="proc-row">
          <span>${v.vesselName}</span>
          <span>${badgeHTML(kpi.rfqOpenCount,  rfqC.color, rfqC.bg)}</span>
          <span>${badgeHTML(kpi.poAttiviCount, poC.color,  poC.bg)}</span>
          <span>${badgeHTML(kpi.dnTransitCount,dnC.color,  dnC.bg)}</span>
          <span style="color:${dl.color};font-weight:600;">${dl[lang]}</span>
        </div>`;
      }).join("");
    }

    // Budget bars
    const budgetList = document.getElementById("budget-list");
    if (budgetList) {
      budgetList.innerHTML = budgetVessels.map(v => {
        const c = colorMap[v.semaphore] || colorMap.gray;
        const residual = (v.residualBudget / 1000).toFixed(0);
        const used = (v.usedBudget / 1000).toFixed(0);
        const total = (v.totalBudget / 1000).toFixed(0);
        return `
        <div class="budget-item">
          <div class="budget-top">
            <strong>${v.vesselName}</strong>
            <span style="color:${c.color};">${v.percentageUsed}% · €${residual}k residui</span>
          </div>
          <div class="budget-bar">
            <div class="fill ${v.semaphore}" style="width:${v.percentageUsed}%;"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#6f8aa5;">
            <span>Usato: €${used}k</span><span>Totale: €${total}k</span>
          </div>
        </div>`;
      }).join("");
    }

    // Sync label
    const syncLabel = document.getElementById("last-sync-label");
    if (syncLabel) {
      syncLabel.textContent = `${translations[lang].lastSync}: ${formatDate(fleetData.lastSync)}`;
    }
  }

  // ─────────────────────────────────────────────
  // RENDER VESSEL PAGE
  // ─────────────────────────────────────────────
  function renderVesselPage(fleetData, procData, budgetData, vesselId) {
    const lang   = localStorage.getItem("dashboardLang") || "it";
    const vessel = fleetData.vessels.find(v => v.id === vesselId);
    const proc   = procData.vessels.find(v => v.vesselId === vesselId);
    const budget = budgetData.vessels.find(v => v.vesselId === vesselId);

    if (!vessel) return;

    const sl = statusLabel(vessel.status);

    // Header nave
    setEl("vessel-name", vessel.name);
    setEl("vessel-meta", `${vessel.location} · Agent: ${vessel.agent} · IMO: ${vessel.imo}`);
    const statusBadge = document.getElementById("vessel-status-badge");
    if (statusBadge) {
      statusBadge.textContent = sl.it;
      statusBadge.style.background = sl.bg;
      statusBadge.style.color = sl.color;
    }

    // Route info
    setEl("vessel-next-port",    vessel.nextPort);
    setEl("vessel-eta",          formatDate(vessel.eta));
    setEl("vessel-etb",          formatDate(vessel.etb));
    setEl("vessel-etd",          formatDate(vessel.etd));
    setEl("vessel-agent-name",   vessel.agent);
    setEl("vessel-agent-contact",vessel.agentContact);
    setEl("vessel-position",     vessel.position);
    setEl("vessel-noon-report",  formatDate(vessel.lastNoonReport));

    // ── Procurement KPI (calcolati dagli items)
    if (proc) {
      const kpi = calcKPI(proc);

      // Tile KPI
      setEl("kpi-rfq-open",    kpi.rfqOpenCount);
      setEl("kpi-scadute",     kpi.scaduteCount);
      setEl("kpi-po-attivi",   kpi.poAttiviCount);
      setEl("kpi-dn-transit",  kpi.dnTransitCount);
      setEl("kpi-pronti-po",   kpi.prontiPoCount);

      // Colori tile SCADUTE: rosso se > 0
      const scaduteEl = document.getElementById("kpi-scadute");
      if (scaduteEl) scaduteEl.style.color = kpi.scaduteCount > 0 ? "#ff5f63" : "#ffbf3c";

      // Lista items con filtri
      const itemsContainer = document.getElementById("vessel-items-body");
      if (itemsContainer) {
        let activeFilter = "rfq-aperte";

        // Bottoni filtro
        const filterBtns = document.querySelectorAll("[data-filter]");
        filterBtns.forEach(btn => {
          btn.addEventListener("click", () => {
            activeFilter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderItems();
          });
        });

        function getFilteredItems() {
          switch (activeFilter) {
            case "tutti":        return kpi.activeItems;
            case "rfq-aperte":   return kpi.rfqOpenItems;
            case "scadute":      return kpi.scaduteItems;
            case "po-attivi":    return kpi.poAttiviItems;
            case "dn-transit":   return kpi.dnTransitItems;
            case "pronti-po":    return kpi.prontiPoItems;
            case "cancellati":   return proc.items.filter(i =>
                                   i.reqStatus === "REQ Cancelled" ||
                                   i.poStatus  === "PO Cancelled");
            default:             return kpi.activeItems;
          }
        }

        function rfqProgressBar(issued, closed) {
          if (!issued || issued === 0) return "";
          const pct = Math.round((closed / issued) * 100);
          const color = pct >= 100 ? "#2fd06f" : pct > 50 ? "#ffbf3c" : "#ff5f63";
          return `
          <div style="display:flex;align-items:center;gap:6px;margin-top:4px;">
            <div style="flex:1;height:4px;background:#1e3a52;border-radius:2px;">
              <div style="width:${pct}%;height:100%;background:${color};border-radius:2px;"></div>
            </div>
            <span style="font-size:0.75rem;color:#6f8aa5;">${closed}/${issued}</span>
          </div>`;
        }

        function statusDot(status, color) {
          return status
            ? `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${color};margin-right:4px;"></span>`
            : `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#1e3a52;margin-right:4px;"></span>`;
        }

        function itemColor(item) {
          if (item.rfqStatus === "RFQ Sent to Vendor" && item.rfqDays > 7) return "#ff5f63";
          if (item.rfqStatus === "RFQ Sent to Vendor") return "#ffbf3c";
          if (item.rfqStatus === "RFQ Offer Acknowledged") return "#57d4ff";
          if (item.poStatus)  return "#2fd06f";
          return "#8aa7c2";
        }

        function renderItems() {
          const filtered = getFilteredItems();
          if (!filtered.length) {
            itemsContainer.innerHTML = `<div style="color:#6f8aa5;padding:16px;text-align:center;">Nessun item per questo filtro</div>`;
            return;
          }
          itemsContainer.innerHTML = filtered.map(item => {
            const ic = itemColor(item);
            const reqDot = statusDot(item.reqStatus, item.reqStatus === "REQ Cancelled" ? "#ff5f63" : "#ffbf3c");
            const rfqDot = statusDot(item.rfqStatus, item.rfqStatus === "RFQ Sent to Vendor" ? "#ffbf3c" : item.rfqStatus === "RFQ Offer Acknowledged" ? "#57d4ff" : "#6f8aa5");
            const poDot  = statusDot(item.poStatus,  "#2fd06f");
            const dnDot  = statusDot(item.dnStatus,  item.dnStatus === "DN Received on Board" ? "#2fd06f" : "#57d4ff");
            const daysLabel = item.rfqDays !== null && item.rfqDays > 0 ? `<span style="color:#6f8aa5;font-size:0.75rem;">${item.rfqDays}gg</span>` : "";

            return `
            <div class="proc-item" style="padding:10px 14px;border-bottom:1px solid #0f2030;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                <div style="flex:1;">
                  <div style="font-size:0.78rem;color:#6f8aa5;margin-bottom:2px;">${item.id}</div>
                  <div style="font-size:0.88rem;font-weight:600;color:#e0eaf5;">${item.description}</div>
                  <div style="font-size:0.78rem;color:#8aa7c2;margin-top:2px;">${item.supplier}</div>
                </div>
                <div style="text-align:right;font-size:0.78rem;color:#6f8aa5;">
                  ${item.deliveryDate !== "—" ? item.deliveryDate : ""}
                  ${daysLabel}
                </div>
              </div>
              ${rfqProgressBar(item.rfqIssued, item.rfqClosed)}
              <div style="display:flex;gap:16px;margin-top:6px;font-size:0.78rem;">
                <span>${reqDot}${item.reqStatus || "—"}</span>
                <span>${rfqDot}${item.rfqStatus || "—"}</span>
                <span>${poDot}${item.poStatus || "—"}</span>
                <span>${dnDot}${item.dnStatus || "—"}</span>
              </div>
            </div>`;
          }).join("");
        }

        renderItems();
      }
    }

    // Budget
    if (budget) {
      const c = colorMap[budget.semaphore] || colorMap.gray;
      const residual = (budget.residualBudget / 1000).toFixed(0);
      const used = (budget.usedBudget / 1000).toFixed(0);
      const total = (budget.totalBudget / 1000).toFixed(0);

      setEl("vessel-budget-label", `${vessel.name}`);
      setEl("vessel-budget-pct",   `${budget.percentageUsed}% · €${residual}k residui`);
      const pctEl = document.getElementById("vessel-budget-pct");
      if (pctEl) pctEl.style.color = c.color;

      const barFill = document.getElementById("vessel-budget-fill");
      if (barFill) {
        barFill.style.width = budget.percentageUsed + "%";
        barFill.className = `fill ${budget.semaphore}`;
      }
      setEl("vessel-budget-used",  `Usato: €${used}k`);
      setEl("vessel-budget-total", `Totale: €${total}k`);
    }

    // Sync label vessel
    const syncLabel = document.getElementById("last-sync-label");
    if (syncLabel) {
      syncLabel.textContent = `${translations[lang].lastSync}: ${formatDate(fleetData.lastSync)}`;
    }
  }

  // ─────────────────────────────────────────────
  // UTILITY
  // ─────────────────────────────────────────────
  function setEl(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

});
