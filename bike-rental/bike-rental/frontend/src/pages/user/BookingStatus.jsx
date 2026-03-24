import { useState, useEffect } from "react";
import API from "../api";

const C = {
  bg: "#f5f6fa", white: "#ffffff", border: "#e0e0e0",
  accent: "#1a73e8", text: "#1a1a2e", muted: "#6b7280",
  green: "#16a34a", red: "#dc2626", yellow: "#ca8a04",
};

const STATUS_STYLE = {
  Active:    { bg: "#dcfce7", color: "#16a34a" },
  Pending:   { bg: "#fef9c3", color: "#ca8a04" },
  Completed: { bg: "#dbeafe", color: "#1d4ed8" },
  Cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

const S = {
  page: { minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif", color: C.text, padding: "24px" },
  backBtn: { background: "none", border: "none", color: C.accent, fontSize: "14px", fontWeight: "600", cursor: "pointer", marginBottom: "20px", padding: 0 },
  maxW: { maxWidth: "860px", margin: "0 auto" },
  pageTitle: { fontSize: "20px", fontWeight: "800", marginBottom: "4px" },
  pageSub: { fontSize: "13px", color: C.muted, marginBottom: "20px" },
  statsRow: { display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "24px" },
  statCard: { flex: 1, minWidth: "120px", background: C.white, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "16px", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" },
  statNum: { fontSize: "24px", fontWeight: "800", color: C.accent },
  statLabel: { fontSize: "12px", color: C.muted, marginTop: "4px" },
  tabRow: { display: "flex", gap: "4px", background: C.bg, borderRadius: "10px", padding: "4px", width: "fit-content", marginBottom: "20px", border: `1px solid ${C.border}` },
  tab: (a) => ({
    padding: "9px 20px", borderRadius: "8px", border: "none", cursor: "pointer",
    fontWeight: "600", fontSize: "13px",
    background: a ? C.accent : "transparent",
    color: a ? "#fff" : C.muted,
  }),
  bookingCard: {
    background: C.white, border: `1px solid ${C.border}`,
    borderRadius: "12px", padding: "18px", marginBottom: "12px",
    display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  bikeIcon: { fontSize: "36px" },
  bikeInfo: { flex: 1, minWidth: "140px" },
  bikeName: { fontSize: "15px", fontWeight: "700", marginBottom: "2px" },
  bookingId: { fontSize: "12px", color: C.muted },
  metaGrid: { display: "flex", gap: "20px", flexWrap: "wrap" },
  metaItem: { minWidth: "70px" },
  metaLabel: { fontSize: "11px", color: C.muted, marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.6px" },
  metaVal: { fontSize: "13px", fontWeight: "700" },
  badge: (s) => ({
    display: "inline-block", padding: "3px 10px", borderRadius: "20px",
    fontSize: "11px", fontWeight: "600",
    background: STATUS_STYLE[s]?.bg || "#f3f4f6",
    color: STATUS_STYLE[s]?.color || C.muted,
  }),
  cancelBtn: {
    padding: "7px 14px", borderRadius: "8px",
    border: "1px solid #fecaca", background: "#fef2f2",
    color: C.red, fontSize: "12px", fontWeight: "600", cursor: "pointer",
  },
  empty: { textAlign: "center", padding: "50px 20px", color: C.muted },
};

export default function BookingStatus({ user, onBack }) {
  const [tab, setTab] = useState("current");
  const [allBookings, setAllBookings] = useState([]);

  // ✅ Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings");
        setAllBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  // ✅ Filters
  const currentBookings = allBookings.filter(
    b => b.status === "Active" || b.status === "Pending"
  );

  const historyBookings = allBookings.filter(
    b => b.status === "Completed" || b.status === "Cancelled"
  );

  // ✅ Cancel booking
  const handleCancel = async (id) => {
    if (window.confirm("Cancel this booking?")) {
      try {
        await API.patch(`/bookings/${id}/cancel`);

        setAllBookings(prev =>
          prev.map(b =>
            b._id === id ? { ...b, status: "Cancelled" } : b
          )
        );

      } catch (err) {
        console.error(err);
        alert("Cancel failed");
      }
    }
  };

  // ✅ Total spent
  const totalSpent = allBookings
    .filter(b => b.status !== "Cancelled")
    .reduce((sum, b) => sum + (b.total || 0), 0);

  const displayName = user?.name || "User";

  // ✅ Card UI
  const renderCard = (b, showCancel = false) => (
    <div key={b._id} style={S.bookingCard}>
      <span style={S.bikeIcon}>{b.bike?.img || "🏍️"}</span>

      <div style={S.bikeInfo}>
        <div style={S.bikeName}>{b.bike?.name || "Bike"}</div>
        <div style={S.bookingId}>ID: {b._id}</div>
      </div>

      <div style={S.metaGrid}>
        {[
          ["Start",   b.startDate?.slice(0, 10)],
          ["End",     b.endDate?.slice(0, 10)],
          ["Days",    b.days],
          ["Total",   `₹${b.total}`],
          ["Pickup",  b.pickupLocation],
        ].map(([l, v]) => (
          <div key={l} style={S.metaItem}>
            <div style={S.metaLabel}>{l}</div>
            <div style={S.metaVal}>{v}</div>
          </div>
        ))}
      </div>

      <span style={S.badge(b.status)}>{b.status}</span>

      {showCancel && b.status === "Pending" && (
        <button style={S.cancelBtn} onClick={() => handleCancel(b._id)}>
          Cancel
        </button>
      )}
    </div>
  );

  return (
    <div style={S.page}>
      <button style={S.backBtn} onClick={onBack}>← Back to Dashboard</button>

      <div style={S.maxW}>
        <h1 style={S.pageTitle}>My Bookings</h1>
        <p style={S.pageSub}>Hello {displayName} — here are your rentals</p>

        {/* Stats */}
        <div style={S.statsRow}>
          {[
            { num: currentBookings.filter(b => b.status === "Active").length, label: "Active" },
            { num: currentBookings.filter(b => b.status === "Pending").length, label: "Pending" },
            { num: historyBookings.filter(b => b.status === "Completed").length, label: "Completed" },
            { num: `₹${totalSpent}`, label: "Total Spent" },
          ].map(({ num, label }) => (
            <div key={label} style={S.statCard}>
              <div style={S.statNum}>{num}</div>
              <div style={S.statLabel}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={S.tabRow}>
          <button style={S.tab(tab === "current")} onClick={() => setTab("current")}>
            Current Bookings
          </button>
          <button style={S.tab(tab === "history")} onClick={() => setTab("history")}>
            Rental History
          </button>
        </div>

        {/* Current */}
        {tab === "current" && (
          currentBookings.length > 0
            ? currentBookings.map(b => renderCard(b, true))
            : (
              <div style={S.empty}>
                <div style={{ fontSize: "40px" }}>📭</div>
                <p>No current bookings yet.</p>
              </div>
            )
        )}

        {/* History */}
        {tab === "history" && (
          historyBookings.length > 0
            ? historyBookings.map(b => renderCard(b))
            : (
              <div style={S.empty}>
                <div style={{ fontSize: "40px" }}>🕒</div>
                <p>No rental history yet.</p>
              </div>
            )
        )}
      </div>
    </div>
  );
}