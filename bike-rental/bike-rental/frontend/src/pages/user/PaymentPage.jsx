import { useState } from "react";
import API from "../api";

const C = {
  bg: "#f5f6fa", white: "#ffffff", border: "#e0e0e0",
  accent: "#1a73e8", text: "#1a1a2e", muted: "#6b7280", green: "#16a34a",
};

const METHODS = ["💳 Card", "📱 UPI", "🏦 Net Banking", "💵 Cash on Pickup"];

const S = {
  page: { minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif", color: C.text, padding: "24px" },
  backBtn: { background: "none", border: "none", color: C.accent, fontSize: "14px", fontWeight: "600", cursor: "pointer", marginBottom: "20px", padding: 0 },
  pageTitle: { fontSize: "20px", fontWeight: "800", marginBottom: "20px", maxWidth: "820px", margin: "0 auto 20px" },
  layout: { display: "flex", gap: "20px", flexWrap: "wrap", maxWidth: "820px", margin: "0 auto" },
  card: { background: C.white, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "24px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
  sectionTitle: { fontSize: "15px", fontWeight: "700", marginBottom: "16px" },
  methodRow: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" },
  methodBtn: (a) => ({
    padding: "9px 16px", border: `1px solid ${a ? C.accent : C.border}`,
    borderRadius: "8px", background: a ? "#eff6ff" : C.white,
    color: a ? C.accent : C.muted, fontSize: "13px", fontWeight: "600", cursor: "pointer",
  }),
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: C.muted, marginBottom: "6px" },
  input: {
    width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`,
    borderRadius: "8px", fontSize: "14px", color: C.text,
    outline: "none", boxSizing: "border-box", marginBottom: "14px",
  },
  row2: { display: "flex", gap: "12px" },
  summaryCard: { flex: "0 0 280px", minWidth: "250px" },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: "13px", color: C.muted, padding: "9px 0", borderBottom: `1px solid ${C.border}` },
  summaryTotal: { display: "flex", justifyContent: "space-between", fontSize: "17px", fontWeight: "800", color: C.text, padding: "12px 0" },
  payBtn: {
    width: "100%", padding: "12px", background: C.accent, color: "#fff",
    border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer",
  },
  secureNote: { textAlign: "center", fontSize: "12px", color: C.muted, marginTop: "10px" },
  infoBox: { padding: "12px 14px", background: "#f0f7ff", border: `1px solid #bfdbfe`, borderRadius: "8px", fontSize: "13px", color: C.muted },
  successPage: { minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" },
  successCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "48px 36px", textAlign: "center", maxWidth: "420px", width: "100%" },
};

export default function PaymentPage({ booking, onBack, onSuccess }) {
  const [method, setMethod] = useState("💳 Card");
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [upi, setUpi] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const formatCard = (v) =>
    v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);

  // ✅ FINAL PAYMENT FUNCTION
  const handlePay = async () => {
    if (method === "💳 Card" && (!cardNo || !expiry || !cvv || !name)) {
      alert("Please fill all card details!");
      return;
    }

    if (method === "📱 UPI" && !upi) {
      alert("Please enter UPI ID!");
      return;
    }

    try {
      setLoading(true);

      // ✅ CALL BACKEND
      const res = await API.post("/payments", {
        bookingId: booking.bookingId,
        method,
        amount: booking.grandTotal,
      });

      // ✅ SUCCESS
      setPaid(true);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (paid)
    return (
      <div style={S.successPage}>
        <div style={S.successCard}>
          <div style={{ fontSize: "56px" }}>✅</div>
          <h2 style={{ color: C.green }}>Payment Successful!</h2>
          <p>
            Booking confirmed for <b>{booking?.bike?.name}</b><br />
            Amount Paid: ₹{booking?.grandTotal}<br />
            Booking ID: {booking?.bookingId}
          </p>

          <button
            style={S.payBtn}
            onClick={() =>
              onSuccess({
                ...booking,
                status: "Active",
                paidAt: new Date().toLocaleDateString(),
              })
            }
          >
            View My Bookings →
          </button>
        </div>
      </div>
    );

  if (!booking)
    return (
      <div style={S.page}>
        <button onClick={onBack}>Back</button>
        <p>No booking found</p>
      </div>
    );

  return (
    <div style={S.page}>
      <button style={S.backBtn} onClick={onBack}>
        ← Back
      </button>

      <div style={S.layout}>
        <div style={{ ...S.card, flex: 1 }}>
          <div style={S.sectionTitle}>Payment Method</div>

          <div style={S.methodRow}>
            {METHODS.map((m) => (
              <button key={m} style={S.methodBtn(method === m)} onClick={() => setMethod(m)}>
                {m}
              </button>
            ))}
          </div>

          {method === "💳 Card" && (
            <>
              <input style={S.input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input style={S.input} placeholder="Card Number" value={cardNo} onChange={(e) => setCardNo(formatCard(e.target.value))} />
              <div style={S.row2}>
                <input style={S.input} placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                <input style={S.input} placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </div>
            </>
          )}

          {method === "📱 UPI" && (
            <input style={S.input} placeholder="yourname@upi" value={upi} onChange={(e) => setUpi(e.target.value)} />
          )}
        </div>

        <div style={{ ...S.card, ...S.summaryCard }}>
          <div>Total: ₹{booking.grandTotal}</div>

          <button style={S.payBtn} onClick={handlePay} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}