import { useState } from "react";

const C = {
  bg: "#f5f6fa", white: "#ffffff", border: "#e0e0e0",
  accent: "#1a73e8", text: "#1a1a2e", muted: "#6b7280",
  green: "#16a34a", red: "#dc2626", yellow: "#ca8a04",
  sidebar: "#1a1a2e",
};

// Initial data — TODO: replace with API calls
const INITIAL_USERS = [
  { id: 1, name: "Rahul Sharma",  email: "rahul@email.com",       role: "User",     bookings: 5, status: "Active" },
  { id: 2, name: "Priya Patel",   email: "priya@email.com",       role: "User",     bookings: 2, status: "Active" },
  { id: 3, name: "Operator Ajay", email: "ajay@bikerental.com",   role: "Operator", bookings: 0, status: "Active" },
  { id: 4, name: "Sneha Joshi",   email: "sneha@email.com",       role: "User",     bookings: 1, status: "Suspended" },
];

const INITIAL_BIKES = [
  { id: 1, name: "Royal Enfield Classic", type: "Cruiser", price: 800,  available: true,  cc: 350 },
  { id: 2, name: "Bajaj Pulsar NS200",    type: "Sports",  price: 600,  available: true,  cc: 200 },
  { id: 3, name: "Honda Activa 6G",       type: "Scooter", price: 300,  available: false, cc: 110 },
  { id: 4, name: "KTM Duke 390",          type: "Sports",  price: 1200, available: true,  cc: 390 },
];

const INITIAL_RENTALS = [
  { id: "BK10234", user: "Rahul Sharma", bike: "Royal Enfield Classic", days: 3, subtotal: 2400, gst: 432, total: 2832, status: "Active",    date: "2026-03-21" },
  { id: "BK10189", user: "Priya Patel",  bike: "KTM Duke 390",          days: 7, subtotal: 8400, gst: 1512, total: 9912, status: "Pending",   date: "2026-03-28" },
  { id: "BK09872", user: "Sneha Joshi",  bike: "Bajaj Pulsar NS200",    days: 2, subtotal: 1200, gst: 216,  total: 1416, status: "Completed", date: "2026-02-10" },
];

const INITIAL_PENDING = [
  { id: "BK10189", user: "Priya Patel", bike: "KTM Duke 390",   days: 7, total: 9912,  pickup: "Ring Road Depot", date: "2026-03-28" },
  { id: "BK10300", user: "Mohan Das",   bike: "Yamaha MT-15",   days: 2, total: 1652,  pickup: "Surat Central",   date: "2026-03-30" },
];

const STATUS_S = {
  Active:    { bg: "#dcfce7", color: "#16a34a" },
  Pending:   { bg: "#fef9c3", color: "#ca8a04" },
  Completed: { bg: "#dbeafe", color: "#1d4ed8" },
  Cancelled: { bg: "#fee2e2", color: "#dc2626" },
  Suspended: { bg: "#fee2e2", color: "#dc2626" },
};

const NAV_ITEMS = [
  { key: "overview",  label: "Dashboard",          icon: "📊" },
  { key: "users",     label: "Users & Operators",  icon: "👥" },
  { key: "bikes",     label: "Bike Management",    icon: "🏍️" },
  { key: "rentals",   label: "All Rentals",        icon: "📋" },
  { key: "approvals", label: "Approvals",          icon: "✅" },
];

const S = {
  shell: { display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", color: C.text },
  sidebar: { width: "220px", background: C.sidebar, display: "flex", flexDirection: "column", flexShrink: 0 },
  sidebarTop: { padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" },
  logoText: { fontSize: "15px", fontWeight: "800", color: "#fff" },
  logoSub: { fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" },
  adminName: { fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "6px" },
  navItem: (a) => ({
    display: "flex", alignItems: "center", gap: "10px",
    padding: "11px 16px", cursor: "pointer",
    background: a ? "rgba(26,115,232,0.3)" : "transparent",
    borderLeft: a ? "3px solid #1a73e8" : "3px solid transparent",
    color: a ? "#fff" : "rgba(255,255,255,0.55)",
    fontSize: "13px", fontWeight: a ? "700" : "500",
  }),
  logoutBtn: {
    margin: "auto 16px 16px", padding: "10px 14px", border: "none",
    borderRadius: "8px", background: "rgba(220,38,38,0.15)",
    color: "#fca5a5", fontSize: "13px", fontWeight: "600", cursor: "pointer",
  },
  main: { flex: 1, background: C.bg, padding: "24px", overflowY: "auto" },
  pageTitle: { fontSize: "20px", fontWeight: "800", marginBottom: "4px" },
  pageSub: { fontSize: "13px", color: C.muted, marginBottom: "22px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "14px", marginBottom: "24px" },
  statCard: (col) => ({
    background: C.white, border: `1px solid ${C.border}`, borderRadius: "12px",
    padding: "18px", borderTop: `3px solid ${col}`,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  }),
  statNum: { fontSize: "24px", fontWeight: "800", marginBottom: "4px" },
  statLabel: { fontSize: "12px", color: C.muted },
  tableWrap: { background: C.white, border: `1px solid ${C.border}`, borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" },
  tableHead: { display: "grid", padding: "12px 18px", background: C.bg, fontSize: "11px", fontWeight: "700", color: C.muted, textTransform: "uppercase", letterSpacing: "0.6px", borderBottom: `1px solid ${C.border}` },
  tableRow: { display: "grid", padding: "13px 18px", borderBottom: `1px solid ${C.border}`, fontSize: "13px", alignItems: "center" },
  badge: (s) => ({
    display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600",
    background: STATUS_S[s]?.bg || "#f3f4f6", color: STATUS_S[s]?.color || C.muted,
  }),
  actionBtn: (col) => ({
    padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer",
    fontSize: "12px", fontWeight: "600",
    background: col === C.red ? "#fef2f2" : col === C.green ? "#f0fdf4" : "#eff6ff",
    color: col,
  }),
  formCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "20px", marginBottom: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" },
  formTitle: { fontSize: "15px", fontWeight: "700", marginBottom: "14px" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "12px" },
  input: {
    padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: "8px",
    fontSize: "13px", color: C.text, outline: "none", width: "100%", boxSizing: "border-box",
  },
  addBtn: {
    marginTop: "12px", padding: "10px 22px", border: "none", borderRadius: "8px",
    background: C.accent, color: "#fff", fontWeight: "700", fontSize: "13px", cursor: "pointer",
  },
  approvalCard: {
    background: C.white, border: `1px solid ${C.border}`, borderRadius: "12px",
    padding: "18px", marginBottom: "12px", display: "flex", flexWrap: "wrap",
    gap: "14px", alignItems: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  empty: { textAlign: "center", padding: "50px 20px", color: C.muted },
};

// ---- Sub-components ----

function Overview({ users, bikes, rentals, pendingCount }) {
  // Dynamic stats computed from actual data
  const activeRentals    = rentals.filter(r => r.status === "Active").length;
  const totalRevenue     = rentals.filter(r => r.status !== "Cancelled").reduce((s, r) => s + r.total, 0);
  const completedRentals = rentals.filter(r => r.status === "Completed").length;

  const stats = [
    { label: "Total Users",       num: users.length,           color: C.accent },
    { label: "Total Bikes",       num: bikes.length,           color: "#8b5cf6" },
    { label: "Active Rentals",    num: activeRentals,          color: C.green },
    { label: "Pending Approvals", num: pendingCount,           color: C.yellow },
    { label: "Total Revenue",     num: `₹${totalRevenue.toLocaleString()}`, color: "#ec4899" },
    { label: "Completed Trips",   num: completedRentals,       color: "#06b6d4" },
  ];

  return (
    <>
      <div style={S.statsGrid}>
        {stats.map(s => (
          <div key={s.label} style={S.statCard(s.color)}>
            <div style={{ ...S.statNum, color: s.color }}>{s.num}</div>
            <div style={S.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px" }}>Recent Rentals</h3>
      <div style={S.tableWrap}>
        <div style={{ ...S.tableHead, gridTemplateColumns: "1.2fr 1.5fr 2fr 1fr 1fr 1fr" }}>
          <span>ID</span><span>User</span><span>Bike</span><span>Days</span><span>Total</span><span>Status</span>
        </div>
        {rentals.slice(0, 5).map(r => (
          <div key={r.id} style={{ ...S.tableRow, gridTemplateColumns: "1.2fr 1.5fr 2fr 1fr 1fr 1fr" }}>
            <span style={{ fontWeight: "700", color: C.accent }}>{r.id}</span>
            <span>{r.user}</span>
            <span style={{ color: C.muted }}>{r.bike}</span>
            <span>{r.days}d</span>
            <span>₹{r.total}</span>
            <span style={S.badge(r.status)}>{r.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ManageUsers({ users, setUsers }) {
  const toggle = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
    // TODO: PATCH /api/users/:id/status
  };
  return (
    <div style={S.tableWrap}>
      <div style={{ ...S.tableHead, gridTemplateColumns: "2fr 2.5fr 1fr 1fr 1fr 1.5fr" }}>
        <span>Name</span><span>Email</span><span>Role</span><span>Bookings</span><span>Status</span><span>Action</span>
      </div>
      {users.map(u => (
        <div key={u.id} style={{ ...S.tableRow, gridTemplateColumns: "2fr 2.5fr 1fr 1fr 1fr 1.5fr" }}>
          <span style={{ fontWeight: "700" }}>{u.name}</span>
          <span style={{ color: C.muted }}>{u.email}</span>
          <span style={{ color: u.role === "Operator" ? "#8b5cf6" : C.accent, fontWeight: "600" }}>{u.role}</span>
          <span>{u.bookings}</span>
          <span style={S.badge(u.status)}>{u.status}</span>
          <button style={S.actionBtn(u.status === "Active" ? C.red : C.green)} onClick={() => toggle(u.id)}>
            {u.status === "Active" ? "Suspend" : "Activate"}
          </button>
        </div>
      ))}
    </div>
  );
}

function BikeManagement({ bikes, setBikes }) {
  const [form, setForm] = useState({ name: "", type: "", price: "", cc: "" });
  const [editId, setEditId] = useState(null);

  const addBike = () => {
    if (!form.name || !form.type || !form.price) { alert("Fill all fields!"); return; }
    if (editId) {
      // Edit existing
      setBikes(bikes.map(b => b.id === editId ? { ...b, ...form, price: +form.price, cc: +form.cc } : b));
      setEditId(null);
      // TODO: PUT /api/bikes/:editId
    } else {
      // Add new
      setBikes([...bikes, { id: Date.now(), ...form, price: +form.price, cc: +form.cc, available: true }]);
      // TODO: POST /api/bikes
    }
    setForm({ name: "", type: "", price: "", cc: "" });
  };

  const startEdit = (bike) => {
    setForm({ name: bike.name, type: bike.type, price: String(bike.price), cc: String(bike.cc) });
    setEditId(bike.id);
  };

  const toggleAvail = (id) => {
    setBikes(bikes.map(b => b.id === id ? { ...b, available: !b.available } : b));
    // TODO: PATCH /api/bikes/:id/availability
  };

  return (
    <>
      <div style={S.formCard}>
        <div style={S.formTitle}>{editId ? "✏️ Edit Bike" : "➕ Add New Bike"}</div>
        <div style={S.formGrid}>
          {[["name","Bike Name"],["type","Type (Sports/Cruiser)"],["price","Price/Day (₹)"],["cc","Engine CC"]].map(([k, p]) => (
            <input key={k} style={S.input} placeholder={p} value={form[k]}
              onChange={e => setForm({ ...form, [k]: e.target.value })} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={S.addBtn} onClick={addBike}>{editId ? "Update Bike" : "Add Bike"}</button>
          {editId && (
            <button style={{ ...S.addBtn, background: C.muted }} onClick={() => { setEditId(null); setForm({ name:"",type:"",price:"",cc:"" }); }}>
              Cancel
            </button>
          )}
        </div>
      </div>
      <div style={S.tableWrap}>
        <div style={{ ...S.tableHead, gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 1.5fr" }}>
          <span>Bike Name</span><span>Type</span><span>CC</span><span>Price/Day</span><span>Status</span><span>Actions</span>
        </div>
        {bikes.map(b => (
          <div key={b.id} style={{ ...S.tableRow, gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 1.5fr" }}>
            <span style={{ fontWeight: "700" }}>{b.name}</span>
            <span style={{ color: C.muted }}>{b.type}</span>
            <span>{b.cc}cc</span>
            <span style={{ color: C.accent, fontWeight: "600" }}>₹{b.price}</span>
            <span style={S.badge(b.available ? "Active" : "Cancelled")}>{b.available ? "Available" : "Unavailable"}</span>
            <div style={{ display: "flex", gap: "6px" }}>
              <button style={S.actionBtn(C.accent)} onClick={() => startEdit(b)}>Edit</button>
              <button style={S.actionBtn(b.available ? C.red : C.green)} onClick={() => toggleAvail(b.id)}>
                {b.available ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AllRentals({ rentals }) {
  return (
    <div style={S.tableWrap}>
      <div style={{ ...S.tableHead, gridTemplateColumns: "1.2fr 1.5fr 2fr 1fr 1fr 1fr 1fr" }}>
        <span>ID</span><span>User</span><span>Bike</span><span>Days</span><span>Subtotal</span><span>Total</span><span>Status</span>
      </div>
      {rentals.map(r => (
        <div key={r.id} style={{ ...S.tableRow, gridTemplateColumns: "1.2fr 1.5fr 2fr 1fr 1fr 1fr 1fr" }}>
          <span style={{ fontWeight: "700", color: C.accent }}>{r.id}</span>
          <span>{r.user}</span>
          <span style={{ color: C.muted }}>{r.bike}</span>
          <span>{r.days}d</span>
          <span style={{ color: C.muted }}>₹{r.subtotal || "-"}</span>
          <span style={{ fontWeight: "600" }}>₹{r.total}</span>
          <span style={S.badge(r.status)}>{r.status}</span>
        </div>
      ))}
    </div>
  );
}

function Approvals({ items, setItems }) {
  const approve = (id) => {
    setItems(items.filter(i => i.id !== id));
    alert(`✅ Booking ${id} Approved!`);
    // TODO: PATCH /api/bookings/:id/approve
  };
  const reject = (id) => {
    if (window.confirm(`Reject booking ${id}?`)) {
      setItems(items.filter(i => i.id !== id));
      // TODO: PATCH /api/bookings/:id/reject
    }
  };

  if (items.length === 0) return (
    <div style={S.empty}>
      <div style={{ fontSize: "40px", marginBottom: "10px" }}>🎉</div>
      <p>All caught up! No pending approvals.</p>
    </div>
  );

  return items.map(a => (
    <div key={a.id} style={S.approvalCard}>
      <div style={{ flex: 1, minWidth: "160px" }}>
        <div style={{ fontSize: "15px", fontWeight: "800", marginBottom: "3px" }}>🏍️ {a.bike}</div>
        <div style={{ fontSize: "12px", color: C.muted }}>ID: <strong style={{ color: C.accent }}>{a.id}</strong></div>
      </div>
      <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
        {[["User",a.user],["Days",`${a.days}d`],["Total",`₹${a.total}`],["Pickup",a.pickup],["Date",a.date]].map(([l,v]) => (
          <div key={l}>
            <div style={{ fontSize: "10px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.6px" }}>{l}</div>
            <div style={{ fontSize: "13px", fontWeight: "700" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button style={{ ...S.actionBtn(C.green), padding: "9px 18px" }} onClick={() => approve(a.id)}>✅ Approve</button>
        <button style={{ ...S.actionBtn(C.red),   padding: "9px 18px" }} onClick={() => reject(a.id)}>❌ Reject</button>
      </div>
    </div>
  ));
}

// ---- Main Admin Dashboard ----
export default function AdminDashboard({ user, onLogout }) {
  const [active, setActive] = useState("overview");
  const [users, setUsers]   = useState(INITIAL_USERS);
  const [bikes, setBikes]   = useState(INITIAL_BIKES);
  const [rentals]           = useState(INITIAL_RENTALS);
  const [pending, setPending] = useState(INITIAL_PENDING);

  const PAGE_INFO = {
    overview:  ["Dashboard Overview",   "Welcome back, Admin!"],
    users:     ["Users & Operators",    "Manage all users and rental operators"],
    bikes:     ["Bike Management",      "Add, edit, and manage bike inventory"],
    rentals:   ["All Rentals",          "Monitor every rental in the system"],
    approvals: ["Booking Approvals",    "Review and approve/reject pending bookings"],
  };

  const [title, sub] = PAGE_INFO[active];
  const adminName = user?.name || "Admin";

  return (
    <div style={S.shell}>
      {/* Sidebar */}
      <div style={S.sidebar}>
        <div style={S.sidebarTop}>
          <div style={{ fontSize: "20px", marginBottom: "4px" }}>🚲</div>
          <div style={S.logoText}>Bike Rental</div>
          <div style={S.logoSub}>Admin Panel</div>
          <div style={S.adminName}>👤 {adminName}</div>
        </div>
        {NAV_ITEMS.map(n => (
          <div key={n.key} style={S.navItem(active === n.key)} onClick={() => setActive(n.key)}>
            <span>{n.icon}</span><span>{n.label}</span>
          </div>
        ))}
        <button style={S.logoutBtn} onClick={onLogout}>🚪 Logout</button>
      </div>

      {/* Main Content */}
      <div style={S.main}>
        <div style={S.pageTitle}>{title}</div>
        <div style={S.pageSub}>{sub}</div>
        {active === "overview"  && <Overview users={users} bikes={bikes} rentals={rentals} pendingCount={pending.length} />}
        {active === "users"     && <ManageUsers users={users} setUsers={setUsers} />}
        {active === "bikes"     && <BikeManagement bikes={bikes} setBikes={setBikes} />}
        {active === "rentals"   && <AllRentals rentals={rentals} />}
        {active === "approvals" && <Approvals items={pending} setItems={setPending} />}
      </div>
    </div>
  );
}
