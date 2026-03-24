import { useState } from "react";

const C = {
  bg: "#f5f6fa", white: "#ffffff", border: "#e0e0e0",
  accent: "#1a73e8", text: "#1a1a2e", muted: "#6b7280",
  green: "#16a34a", red: "#dc2626",
};

// TODO: Replace with API call → GET /api/bikes
const BIKES = [
  { id: 1, name: "Royal Enfield Classic", type: "Cruiser",  price: 800,  available: true,  img: "🏍️", rating: 4.8, cc: 350 },
  { id: 2, name: "Bajaj Pulsar NS200",    type: "Sports",   price: 600,  available: true,  img: "🏎️", rating: 4.5, cc: 200 },
  { id: 3, name: "Honda Activa 6G",       type: "Scooter",  price: 300,  available: false, img: "🛵",  rating: 4.3, cc: 110 },
  { id: 4, name: "KTM Duke 390",          type: "Sports",   price: 1200, available: true,  img: "🏍️", rating: 4.9, cc: 390 },
  { id: 5, name: "Yamaha MT-15",          type: "Sports",   price: 700,  available: true,  img: "🏍️", rating: 4.6, cc: 155 },
  { id: 6, name: "TVS Jupiter",           type: "Scooter",  price: 250,  available: false, img: "🛵",  rating: 4.2, cc: 110 },
  { id: 7, name: "Harley Davidson X440",  type: "Cruiser",  price: 1500, available: true,  img: "🏍️", rating: 4.7, cc: 440 },
  { id: 8, name: "Hero Splendor Plus",    type: "Commuter", price: 200,  available: true,  img: "🚲",  rating: 4.1, cc: 100 },
];

const TYPES = ["All", "Cruiser", "Sports", "Scooter", "Commuter"];

const S = {
  page: { minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif", color: C.text },
  nav: {
    background: C.white, borderBottom: `1px solid ${C.border}`,
    padding: "14px 28px", display: "flex",
    alignItems: "center", justifyContent: "space-between",
  },
  navLogo: { fontWeight: "800", fontSize: "16px", color: C.text },
  navRight: { display: "flex", alignItems: "center", gap: "12px" },
  navUser: { fontSize: "13px", color: C.muted },
  navBtn: (primary) => ({
    padding: "8px 16px", borderRadius: "8px",
    border: primary ? "none" : `1px solid ${C.border}`,
    background: primary ? C.accent : C.white,
    color: primary ? "#fff" : C.text,
    fontSize: "13px", fontWeight: "600", cursor: "pointer",
  }),
  main: { padding: "24px 28px" },
  pageTitle: { fontSize: "20px", fontWeight: "800", marginBottom: "4px" },
  pageSub: { fontSize: "13px", color: C.muted, marginBottom: "20px" },
  filterRow: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px", alignItems: "center" },
  searchInput: {
    flex: 1, minWidth: "200px", padding: "10px 14px",
    border: `1px solid ${C.border}`, borderRadius: "8px",
    fontSize: "14px", color: C.text, outline: "none", background: C.white,
  },
  typeBtn: (a) => ({
    padding: "9px 16px", border: `1px solid ${a ? C.accent : C.border}`,
    borderRadius: "8px", background: a ? C.accent : C.white,
    color: a ? "#fff" : C.muted, fontSize: "13px", fontWeight: "600", cursor: "pointer",
  }),
  availToggle: (on) => ({
    display: "flex", alignItems: "center", gap: "6px",
    padding: "9px 14px", border: `1px solid ${on ? C.green : C.border}`,
    borderRadius: "8px", background: on ? "#f0fdf4" : C.white,
    color: on ? C.green : C.muted, fontSize: "13px", fontWeight: "600", cursor: "pointer",
  }),
  resultInfo: { fontSize: "13px", color: C.muted, marginBottom: "16px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" },
  bikeCard: {
    background: C.white, border: `1px solid ${C.border}`,
    borderRadius: "12px", padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)", transition: "box-shadow 0.2s",
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" },
  bikeEmoji: { fontSize: "40px" },
  availBadge: (a) => ({
    padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600",
    background: a ? "#dcfce7" : "#fee2e2", color: a ? C.green : C.red,
  }),
  bikeName: { fontSize: "15px", fontWeight: "700", marginBottom: "2px" },
  bikeType: { fontSize: "12px", color: C.muted, marginBottom: "12px" },
  priceRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  price: { fontSize: "20px", fontWeight: "800", color: C.accent },
  priceSub: { fontSize: "11px", color: C.muted },
  rating: { fontSize: "12px", color: "#ca8a04", fontWeight: "600" },
  bookBtn: (a) => ({
    width: "100%", padding: "10px", border: "none", borderRadius: "8px",
    fontSize: "14px", fontWeight: "600", cursor: a ? "pointer" : "not-allowed",
    background: a ? C.accent : "#f3f4f6", color: a ? "#fff" : C.muted,
  }),
  empty: { textAlign: "center", padding: "60px 20px", color: C.muted },
};

// user prop comes from App.jsx (has name, email)
export default function UserDashboard({ user, onBook, onMyBookings, onLogout }) {
  const [search, setSearch]           = useState("");
  const [filterType, setFilterType]   = useState("All");
  const [onlyAvailable, setOnlyAvail] = useState(false);

  const filtered = BIKES.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
                        b.type.toLowerCase().includes(search.toLowerCase());
    const matchType  = filterType === "All" || b.type === filterType;
    const matchAvail = onlyAvailable ? b.available : true;
    return matchSearch && matchType && matchAvail;
  });

  // Show username from email (e.g. "john@gmail.com" → "john")
  const displayName = user?.name || "User";

  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <div style={S.navLogo}>🚲 Bike Rental</div>
        <div style={S.navRight}>
          <span style={S.navUser}>👤 {displayName}</span>
          <button style={S.navBtn(false)} onClick={onMyBookings}>My Bookings</button>
          <button style={S.navBtn(true)} onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div style={S.main}>
        <h1 style={S.pageTitle}>Available Bikes 🏍️</h1>
        <p style={S.pageSub}>Browse and book a bike for your ride</p>

        <div style={S.filterRow}>
          <input style={S.searchInput} placeholder="🔍 Search by name or type..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
          {TYPES.map((t) => (
            <button key={t} style={S.typeBtn(filterType === t)} onClick={() => setFilterType(t)}>{t}</button>
          ))}
          <button style={S.availToggle(onlyAvailable)} onClick={() => setOnlyAvail(!onlyAvailable)}>
            {onlyAvailable ? "✅" : "☐"} Available Only
          </button>
        </div>

        <p style={S.resultInfo}>Showing <strong>{filtered.length}</strong> bikes</p>

        {filtered.length > 0 ? (
          <div style={S.grid}>
            {filtered.map((bike) => (
              <div key={bike.id} style={S.bikeCard}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)"}>
                <div style={S.cardTop}>
                  <span style={S.bikeEmoji}>{bike.img}</span>
                  <span style={S.availBadge(bike.available)}>
                    {bike.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div style={S.bikeName}>{bike.name}</div>
                <div style={S.bikeType}>{bike.type} • {bike.cc}cc</div>
                <div style={S.priceRow}>
                  <div>
                    <span style={S.price}>₹{bike.price}</span>
                    <span style={S.priceSub}>/day</span>
                  </div>
                  <span style={S.rating}>⭐ {bike.rating}</span>
                </div>
                <button style={S.bookBtn(bike.available)} disabled={!bike.available}
                  onClick={() => bike.available && onBook(bike)}>
                  {bike.available ? "Book Now →" : "Not Available"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={S.empty}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔍</div>
            <p>No bikes found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
