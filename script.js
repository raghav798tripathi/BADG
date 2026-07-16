/* ============================================================
   BADG TEAM — DATA LAYER (MOCK)
   ============================================================ */
const CURRENT_SYSTEM_DATE = "2026-07-16";

// Global Filter States
let filterRange = { start: "", end: "" };
let filterAsOf = "";

function makeCountryDataset(currencySymbol) {
  return {
    currencySymbol,
    tables: {
      sales_invoice: {
        label: "Sales Invoice", icon: "receipt", dateMode: "range", dateField: "invoice_date",
        columns: ["invoice_number", "invoice_date", "customer_name", "amount", "payment_status"],
        rows: [
          ["INV-2026-001", "2026-06-12", "Aarav Sharma", 15500.00, "Paid"], // Data from June for testing
          ["INV-2026-002", "2026-06-25", "Aditi Rao", 4200.50, "Paid"],
          ["INV-2026-003", "2026-07-03", "Rajesh Patel", 8900.00, "Paid"],
          ["INV-2026-004", "2026-07-05", "Sneha Reddy", 24500.75, "Overdue"],
          ["INV-2026-005", "2026-07-06", "Vikram Singh", 1250.00, "Paid"],
          ["INV-2026-006", "2026-07-08", "Priya Nair", 6750.20, "Pending"],
          ["INV-2026-007", "2026-07-09", "Amit Verma", 31000.00, "Paid"],
          ["INV-2026-008", "2026-07-10", "Deepika Padukone Ltd", 85000.00, "Paid"],
          ["INV-2026-009", "2026-07-11", "Ananya Chatterjee", 18250.00, "Pending"],
          ["INV-2026-010", "2026-07-12", "Rohan Gupta", 3400.00, "Cancelled"]
        ]
      },
      sales_order: {
        label: "Sales Order", icon: "cart", dateMode: "range", dateField: "order_date",
        columns: ["order_number", "order_date", "customer_id", "order_quantity", "order_status"],
        rows: [
          ["SO-2026-001", "2026-07-01", 101, 15, "Delivered"],
          ["SO-2026-002", "2026-07-02", 105, 5, "Processing"],
          ["SO-2026-003", "2026-07-03", 112, 50, "Delivered"],
          ["SO-2026-004", "2026-07-05", 103, 12, "Shipped"],
          ["SO-2026-005", "2026-07-06", 108, 8, "Pending"],
          ["SO-2026-006", "2026-07-07", 121, 24, "Delivered"],
          ["SO-2026-007", "2026-07-09", 115, 3, "Cancelled"],
          ["SO-2026-008", "2026-07-10", 102, 100, "Processing"],
          ["SO-2026-009", "2026-07-12", 110, 18, "Shipped"],
          ["SO-2026-010", "2026-07-13", 107, 35, "Pending"]
        ]
      },
      purchase_order: {
        label: "Purchase Order", icon: "truck", dateMode: "range", dateField: "po_date",
        columns: ["po_number", "po_date", "vendor_name", "expected_delivery_date", "total_cost"],
        rows: [
          ["PO-2026-201", "2026-06-15", "HDFC Bank Supplies", "2026-06-25", 25000.00], // June Data
          ["PO-2026-202", "2026-07-14", "Ambuja Cements", "2026-08-05", 540000.00],
          ["PO-2026-203", "2026-07-14", "Airtel Business Solutions", "2026-07-21", 18500.50],
          ["PO-2026-204", "2026-07-15", "Flipkart Wholesale", "2026-07-28", 115000.75],
          ["PO-2026-205", "2026-07-16", "Asian Paints Ltd", "2026-08-02", 89200.00]
        ]
      },
      customer_master: {
        label: "Customer Master", icon: "users", dateMode: "none", 
        columns: ["customer_id", "customer_name", "email_address", "phone_number", "city"],
        rows: [
          [1, "Aarav Sharma", "aarav.sharma@example.com", "+919876543210", "Mumbai"],
          [2, "Aditi Rao", "aditi.rao@example.com", "+918765432109", "Bengaluru"],
          [3, "Rajesh Patel", "rajesh.patel@example.com", "+917654321098", "Ahmedabad"]
        ]
      },
      item_master: {
        label: "Item Master", icon: "box", dateMode: "none",
        columns: ["item_id", "item_name", "item_category", "standard_cost", "reorder_level"],
        rows: [
          [1, "Heavy Duty Steel Pipes 6-inch", "Raw Materials", 3800.00, 25],
          [2, "Industrial Safety Helmets", "Safety Equipment", 250.00, 100],
          [3, "Copper Wiring Harness 10m", "Electrical", 950.00, 30]
        ]
      },
      exchange_master: {
        label: "Exchange Rate Master", icon: "coins", dateMode: "snapshot", dateField: "effective_date",
        columns: ["effective_date", "currency_code", "currency_name", "exchange_rate"],
        rows: [
          ["2026-07-14", "USD", "US Dollar", 83.5000],
          ["2026-07-14", "EUR", "Euro", 90.7500],
          ["2026-07-13", "USD", "US Dollar", 83.4500], // Previous day for filter test
          ["2026-07-13", "EUR", "Euro", 90.7000]
        ]
      },
      inventory: {
        label: "Inventory", icon: "warehouse", dateMode: "snapshot", dateField: "snapshot_date",
        columns: ["snapshot_date", "item_code", "item_description", "quantity_on_hand", "warehouse_location", "unit_price"],
        rows: [
          // Today's Inventory
          ["2026-07-16", "ITEM-001", "Heavy Duty Steel Pipes", 120, "Mumbai-A1", 4500.00],
          ["2026-07-16", "ITEM-002", "Industrial Safety Helmets", 450, "Bengaluru-B4", 350.50],
          ["2026-07-16", "ITEM-003", "Copper Wiring Harness", 80, "Chennai-C2", 1200.00],
          // Past Inventory for Filter Demo
          ["2026-07-10", "ITEM-001", "Heavy Duty Steel Pipes", 200, "Mumbai-A1", 4500.00],
          ["2026-07-10", "ITEM-002", "Industrial Safety Helmets", 380, "Bengaluru-B4", 350.50],
          ["2026-07-10", "ITEM-003", "Copper Wiring Harness", 150, "Chennai-C2", 1200.00]
        ]
      }
    }
  };
}

const DATABASES = {
  india: { id: "india", label: "India", code: "IN", ...makeCountryDataset("₹") },
  switzerland: { id: "switzerland", label: "Switzerland", code: "CH", ...makeCountryDataset("CHF ") }
};

const TICKER_FEED = DATABASES.india.tables.exchange_master.rows.map(
  (r) => `${r[1]} ${r[2]} — ${r[3].toFixed(2)}`
);

/* ============================================================
   AUTH 
   ============================================================ */
const USERS_KEY = "badg_users";
const SESSION_KEY = "badg_session";

function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); }
function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

function registerUser(email, password) {
  const users = getUsers();
  const key = email.trim().toLowerCase();
  if (users[key]) return { ok: false, message: "Account already exists." };
  users[key] = { email: key, password, hasSeenWelcome: false, createdAt: Date.now() };
  saveUsers(users); return { ok: true };
}

function loginUser(email, password) {
  const users = getUsers();
  const key = email.trim().toLowerCase();
  const user = users[key];
  if (!user) return { ok: false, message: "No account found." };
  if (user.password !== password) return { ok: false, message: "Incorrect password." };
  const isFirstLogin = !user.hasSeenWelcome; user.hasSeenWelcome = true;
  saveUsers(users); sessionStorage.setItem(SESSION_KEY, key);
  return { ok: true, isFirstLogin };
}

function getCurrentSessionEmail() { return sessionStorage.getItem(SESSION_KEY); }
function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById("screenDashboard").classList.add("panel-hidden");
  document.getElementById("screenAuth").classList.remove("panel-hidden");
  document.getElementById("formLogin").reset();
  document.getElementById("formSignup").reset();
}

/* ============================================================
   DASHBOARD RENDERING
   ============================================================ */
const ICONS = {
  receipt: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  cart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"/></svg>',
  truck: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 7h13v9H1z"/><path d="M14 11h4l4 4v1h-8z"/><circle cx="5.5" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/></svg>',
  users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  box: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  coins: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h2M16 12h2"/></svg>',
  warehouse: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 9 12 3 2 9v11h20V9Z"/><path d="M9 20v-6h6v6"/></svg>'
};

function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtMoney(value, symbol) {
  return symbol + Number(value).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

let activeCountry = "india";
let activeTableKey = null;

function renderCountrySwitch() {
  const wrap = document.getElementById("countrySwitch");
  wrap.innerHTML = Object.values(DATABASES).map(db => `
    <button class="country-btn ${db.id === activeCountry ? "active" : ""}" data-country="${db.id}">
      <span class="code">${db.code}</span> ${db.label}
    </button>
  `).join("");
  wrap.querySelectorAll(".country-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCountry = btn.dataset.country;
      activeTableKey = null;
      filterRange = { start: "", end: "" };
      filterAsOf = "";
      renderAll();
    });
  });
}

function renderTableCards() {
  const grid = document.getElementById("tableGrid");
  const db = DATABASES[activeCountry];
  grid.innerHTML = Object.entries(db.tables).map(([key, t]) => `
    <button class="table-card ${key === activeTableKey ? "active" : ""}" data-key="${key}">
      <div class="ic">${ICONS[t.icon] || ""}</div>
      <h3>${t.label}</h3>
      <div class="sub">${t.rows.length} records total</div>
    </button>
  `).join("");
  grid.querySelectorAll(".table-card").forEach(card => {
    card.addEventListener("click", () => {
      activeTableKey = card.dataset.key;
      filterRange = { start: "", end: "" };
      filterAsOf = "";
      renderAll();
    });
  });
}

function renderDataPanel() {
  const panel = document.getElementById("dataPanel");
  const db = DATABASES[activeCountry];
  if (!activeTableKey) {
    panel.innerHTML = `<div class="empty-state">Select a table above to view its records.</div>`;
    return;
  }
  const t = db.tables[activeTableKey];
  let filteredRows = t.rows;
  let filterUI = "";
  let stampText = "";

  // Filtering Logic
  if (t.dateField) {
    const dateColIdx = t.columns.indexOf(t.dateField);
    
    if (t.dateMode === "range") {
      stampText = "Date Range";
      if (filterRange.start && filterRange.end) {
        filteredRows = t.rows.filter(r => r[dateColIdx] >= filterRange.start && r[dateColIdx] <= filterRange.end);
      }
      filterUI = `
        <div class="filter-group">
          <label>From:</label> <input type="date" id="filterStart" value="${filterRange.start}">
          <label>To:</label> <input type="date" id="filterEnd" value="${filterRange.end}">
          <button class="btn-sm" id="btnApply">Apply Filter</button>
          <button class="btn-sm clear-btn" id="btnClear">Clear</button>
        </div>
      `;
    } 
    else if (t.dateMode === "snapshot") {
      stampText = "As Of Date";
      if (filterAsOf) {
        filteredRows = t.rows.filter(r => r[dateColIdx] === filterAsOf);
      }
      filterUI = `
        <div class="filter-group">
          <label>Snapshot Date:</label> <input type="date" id="filterAsOfDate" value="${filterAsOf}">
          <button class="btn-sm" id="btnApply">Apply Filter</button>
          <button class="btn-sm clear-btn" id="btnClear">Clear</button>
        </div>
      `;
    }
  } else {
    stampText = "Master Data";
    filterUI = `<div class="filter-group"><label>No date filter available for master data.</label></div>`;
  }

  const headerRow = t.columns.map(c => `<th>${c.replace(/_/g, " ")}</th>`).join("");
  const bodyRows = filteredRows.map(r => `
    <tr>${r.map((cell, i) => {
      const col = t.columns[i];
      if (col === "payment_status" || col === "order_status") return `<td><span class="status-pill status-${cell}">${cell}</span></td>`;
      if (col === "amount" || col === "total_cost" || col === "standard_cost" || col === "unit_price") return `<td>${fmtMoney(cell, db.currencySymbol)}</td>`;
      if (col === "exchange_rate") return `<td>${Number(cell).toFixed(4)}</td>`;
      if (col.includes("date")) return `<td>${fmtDate(cell)}</td>`;
      return `<td>${cell}</td>`;
    }).join("")}</tr>
  `).join("");

  panel.innerHTML = `
    <div class="filter-bar">
      <span class="stamp">${stampText}</span>
      ${filterUI}
    </div>
    <div class="table-scroll">
      <table class="data-table">
        <thead><tr>${headerRow}</tr></thead>
        <tbody>${bodyRows.length ? bodyRows : `<tr><td colspan="${t.columns.length}" style="text-align:center; padding: 30px;">No records found for selected dates.</td></tr>`}</tbody>
      </table>
    </div>
  `;

  // Attach Event Listeners for Filter Buttons
  const btnApply = document.getElementById("btnApply");
  const btnClear = document.getElementById("btnClear");

  if (btnApply) {
    btnApply.addEventListener("click", () => {
      if (t.dateMode === "range") {
        filterRange.start = document.getElementById("filterStart").value;
        filterRange.end = document.getElementById("filterEnd").value;
      } else if (t.dateMode === "snapshot") {
        filterAsOf = document.getElementById("filterAsOfDate").value;
      }
      renderDataPanel();
    });
  }
  
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      filterRange = { start: "", end: "" };
      filterAsOf = "";
      renderDataPanel();
    });
  }
}

function renderAll() {
  renderCountrySwitch();
  renderTableCards();
  renderDataPanel();
  document.getElementById("mainTitle").textContent = `${DATABASES[activeCountry].label} — Ledger Tables`;
}

function enterDashboard() {
  document.getElementById("screenAuth").classList.add("panel-hidden");
  document.getElementById("screenDashboard").classList.remove("panel-hidden");
  document.getElementById("sessionUser").textContent = getCurrentSessionEmail();
  renderAll();
}

/* ============================================================
   PAGE WIRING
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const tickerTrack = document.getElementById("tickerTrack");
  const feed = TICKER_FEED.concat(TICKER_FEED);
  tickerTrack.innerHTML = feed.map(t => `<span>&#9679;</span>${t}`).join("&nbsp;&nbsp;&nbsp;&nbsp;");

  const tabSignup = document.getElementById("tabSignup");
  const tabLogin = document.getElementById("tabLogin");
  const formSignup = document.getElementById("formSignup");
  const formLogin = document.getElementById("formLogin");

  function showTab(which) {
    if (which === "signup") {
      tabSignup.classList.add("active");
      tabLogin.classList.remove("active");
      formSignup.classList.remove("panel-hidden");
      formLogin.classList.add("panel-hidden");
    } else {
      tabSignup.classList.remove("active");
      tabLogin.classList.add("active");
      formSignup.classList.add("panel-hidden");
      formLogin.classList.remove("panel-hidden");
    }
  }

  tabSignup.addEventListener("click", () => showTab("signup"));
  tabLogin.addEventListener("click", () => showTab("login"));

  document.getElementById("logoutBtn").addEventListener("click", logout);

  formSignup.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;
    const msg = document.getElementById("signupMsg");

    if (!email.includes("@") || !email.includes(".")) { msg.textContent = "Please enter a valid email address."; msg.className = "form-msg err"; return; }
    if (password.length < 6) { msg.textContent = "Password must be at least 6 characters."; msg.className = "form-msg err"; return; }
    if (password !== confirm) { msg.textContent = "Passwords do not match."; msg.className = "form-msg err"; return; }

    const result = registerUser(email, password);
    if (!result.ok) { msg.textContent = result.message; msg.className = "form-msg err"; return; }
    msg.textContent = "Account created. Switching you to log in...";
    msg.className = "form-msg ok";
    
    setTimeout(() => {
      showTab("login");
      document.getElementById("loginEmail").value = email;
      msg.textContent = "";
    }, 900);
  });

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const msg = document.getElementById("loginMsg");

    const result = loginUser(email, password);
    if (!result.ok) { msg.textContent = result.message; msg.className = "form-msg err"; return; }
    msg.textContent = "Welcome back — signing you in...";
    msg.className = "form-msg ok";

    setTimeout(() => {
      enterDashboard();
      if (result.isFirstLogin) {
        document.getElementById("welcomeOverlay").classList.remove("panel-hidden");
      }
    }, 500);
  });

  document.getElementById("continueBtn").addEventListener("click", () => {
    document.getElementById("welcomeOverlay").classList.add("panel-hidden");
  });
});
