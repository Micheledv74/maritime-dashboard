# Maritime Procurement Dashboard

Dashboard operativa **vessel-centric** per il Purchasing di una società di navigazione. Punto di partenza della giornata: ti dice cosa fare ora e su quale nave concentrarti. Non sostituisce Infoship né Outlook, li affianca.

**Live**: https://micheledv74.github.io/maritime-dashboard/

---

## Struttura del repo

```
.
├── index.html                  # dashboard completa (HTML + CSS + JS in un file)
├── sw.js                       # service worker per uso offline
├── data-procurement.json       # dati procurement (popolati dal workflow n8n esistente)
├── data-tracking.json          # dati AIS (da popolare in v0.2)
└── data-tracking.sample.json   # esempio di schema tracking
```

---

## Setup iniziale (cose da fare una volta)

### 1. Configura le 4 navi
Apri `index.html` e modifica l'array `VESSELS` (lo trovi in cima al blocco `<script>`, sezione `=== CONFIG ===`). Per ogni nave compila i campi `imo`, `flag`, `type`, le email di `masterEmail` / `chiefEngEmail` / `inspectorEmail`, e i link `driveUrl` / `notionUrl` / `infoshipUrl`. Lascia immutato `vesselId` (deve combaciare con quello nel `data-procurement.json`).

### 2. Avvia per la prima volta
Committa i file su GitHub. GitHub Pages dovrebbe già essere attivo sul repo (Settings → Pages → Branch: main). Apri `https://micheledv74.github.io/maritime-dashboard/` e ti accoglie il tutorial onboarding di 5 step.

### 3. Crea `data-tracking.json` (opzionale ma raccomandato)
Per ora copia `data-tracking.sample.json` su `data-tracking.json` con valori finti. Senza questo file la dashboard funziona lo stesso, ma il pannello posizione mostrerà "—". Quando avrai pronto il workflow n8n AIS (vedi sotto), questo file verrà sovrascritto automaticamente.

---

## Funzionalità

- **Vessel switcher** sempre in cima con semaforo per nave (verde / ambra / rosso). Tasti `1-4` per saltare tra le navi, `0` per Overview.
- **Overview**: 4 vessel-card, azioni urgenti globali, heatmap delle consegne settimanali.
- **Vista dettaglio nave**: posizione AIS, ETA/ETB/ETD, agent, KPI, azioni filtrate, pipeline kanban REQ→RFQ→PO→DN, tabella items completa con ricerca/filtri/note locali.
- **Regole di priorità automatiche**: RFQ refused, consegne fuori finestra ETA, RFQ in attesa da troppi giorni, ready for PO, batch suggestion (≥3 RFQ pendenti dallo stesso fornitore).
- **Snooze**: rimanda un'azione a domani / 3 giorni / settimana / data custom.
- **Fine giornata**: report copia-incolla con diff rispetto alla mattina, azioni aperte, snooze in scadenza.
- **Cosa è nuovo**: banner sopra l'Overview con cambiamenti dall'ultima visita.
- **Pulse del fornitore**: vista per fornitore con tempo medio risposta, tasso refused, navi servite (apri dalle Impostazioni).
- **Quick capture**: bottone `+` flottante per buttare giù un to-do volante, viene inviato via webhook n8n alla Inbox Operativa Notion.
- **Cmd+K / Ctrl+K**: spotlight di ricerca globale (su mobile, l'icona lente nell'header).
- **Mappa Leaflet**: caricata on-demand quando apri il pannello posizione.
- **Esporta PDF**: stampa-PDF della scheda nave corrente.
- **Backup**: esporta/importa tutte le impostazioni locali, snooze e note in JSON.
- **Modalità solo lettura**: nasconde i pulsanti, ingrandisce ulteriormente i font — per consultazione mobile.
- **Modo denso**: paddings ridotti, numeri in monospace, più dati visibili (solo desktop).
- **Dark mode**: automatico dal sistema, override in Impostazioni.
- **Service worker**: la dashboard funziona offline mostrando l'ultimo JSON cachato.
- **Console diagnostica**: apri `index.html#debug` per dati di esempio integrati, utile per demo.

---

## Schema dati

### `data-procurement.json`

Già esistente, popolato dal workflow `Infoship → Drive → n8n → Notion → n8n → GitHub`.

```json
{
  "lastSync": "2026-06-04T15:12:00Z",
  "vessels": [
    {
      "vesselId": "medliguria",
      "vesselName": "MED LIGURIA",
      "rfqOpen": 5,
      "rfqOverdue7": 2,
      "rfqOverdue15": 0,
      "readyForPO": 1,
      "orders": 8,
      "poReadyForDN": 0,
      "dnPending": 17,
      "items": [
        {
          "id": "med liguria::air horn ibuki",
          "description": "AIR HORN IBUKI KOGYO",
          "supplier": "FUJI ELECTRIC Co., Ltd",
          "rfqIssued": 6, "rfqClosed": 3, "rfqPct": 50,
          "rfqDays": 51,
          "rfqStatus": "RFQ Refused",
          "poStatus": "PO Published",
          "dnStatus": "",
          "reqStatus": "REQ Ordered",
          "deliveryDate": "2026-04-07"
        }
      ]
    }
  ]
}
```

### `data-tracking.json` (v0.2)

Schema in `data-tracking.sample.json`. Da popolare con un workflow n8n che interroga un'API AIS.

---

## Workflow n8n necessari

### Già attivo
- **Infoship → Drive → n8n → Notion → n8n → GitHub** per `data-procurement.json`. Resta com'è.

### Da aggiungere in v0.2

#### Workflow A — Tracking AIS
- **Trigger**: schedulato ogni 30 minuti
- **HTTP Request**: chiama l'API AIS scelta (consigliato: [AISStream.io](https://aisstream.io/) tier free via WebSocket, oppure MarineTraffic/VesselFinder se la compagnia ha un account). Passa i 4 IMO di `VESSELS`.
- **Function**: normalizza la risposta nello schema di `data-tracking.sample.json`.
- **GitHub**: commit del file `data-tracking.json` sul repo `Micheledv74/maritime-dashboard`.

#### Workflow B — Quick Capture verso Notion
- **Trigger**: webhook
- **URL**: copialo da n8n e incollalo nelle Impostazioni della dashboard (campo "Webhook n8n Quick Capture")
- **Notion node**: crea una row nel database "Inbox Operativa" con campi: testo, timestamp, source

#### Workflow C — Estensione del workflow Notion → GitHub esistente
Quando aggiungerai in Notion i campi `notionFlag` (priorità manuale "Oggi") e `notionNote` (nota operativa) sugli items, includili nel mapping verso il JSON. La dashboard li userà per arricchire le azioni e le note.

---

## Estensibilità

Il codice è strutturato per essere modificato senza rotture:

- **Aggiungere una nave**: aggiungi un oggetto in `VESSELS` (in `index.html`) e accertati che il `vesselId` combaci con quello che esce dal JSON Infoship.
- **Aggiungere una regola di priorità**: aggiungi una funzione in `priorityRules[]`. Riceve `(item, vessel)`, ritorna `null` o `{ key, level, label, action }`.
- **Aggiungere un alert visivo**: aggiungi un'entry in `ALERT_CONFIG`.
- **Modificare le soglie**: dalle Impostazioni (overdueDays, staleHours) senza toccare il codice.

Codice diviso in sezioni commentate: `CONFIG`, `STATE`, `STORAGE / SETTINGS`, `DATA LAYER`, `RULES ENGINE`, `SNAPSHOT & DIFF`, `RENDERING`, `EVENT BINDINGS`, etc.

---

## Hotkey (desktop)

| Tasto | Azione |
|-------|--------|
| `0` | Overview |
| `1-4` | Switch alla nave 1-4 |
| `⌘K` / `Ctrl+K` | Ricerca globale |
| `R` | Refresh dati |
| `Esc` | Chiudi modale / palette |

---

## Roadmap

- **v0.1** (questa release): vessel-centric, dati procurement, regole priorità, snooze, EOD, heatmap, supplier pulse, backup, onboarding, offline, mappa, PDF.
- **v0.2**: workflow AIS attivo → posizione live, ETA reali. Quick capture verso Notion attivo. Note `notionNote` e flag `notionFlag` dal JSON.
- **v0.3** (futuro): Inbox per nave via Outlook (n8n parsing per nome nave nell'oggetto), drydock countdown, alert su scadenze certificati.

---

## Diagnostica

Se qualcosa non funziona: apri `https://micheledv74.github.io/maritime-dashboard/#debug` per la console diagnostica con dati di esempio integrati.

---

Realizzato con Claude (Anthropic). Issue / suggerimenti: apri una issue su questo repo.
