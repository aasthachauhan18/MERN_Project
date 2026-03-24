import { useState } from "react";
import API from "../api";

const C = {
  bg: "#f5f6fa", white: "#ffffff", border: "#e0e0e0",
  accent: "#1a73e8", text: "#1a1a2e", muted: "#6b7280", green: "#16a34a",
};

const DURATIONS = [
  { days: 1,  label: "1 Day" },
  { days: 3,  label: "3 Days" },
  { days: 7,  label: "1 Week" },
  { days: 14, label: "2 Weeks" },
  { days: 30, label: "1 Month" },
  { days: 0,  label: "Custom" },
];

const S = {
  page: { minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif", color: C.text, padding: "24px" },
  backBtn: { background: "none", border: "none", color: C.accent, fontSize: "14px", fontWeight: "600", cursor: "pointer", marginBottom: "20px", padding: 0 },
  pageTitle: { fontSize: "20px", fontWeight: "800", marginBottom: "20px", maxWidth: "860px", margin: "0 auto 20px" },
  layout: { display: "flex", gap: "20px", flexWrap: "wrap", maxWidth: "860px", margin: "0 auto" },
  bikeCard: {
    flex: "0 0 240px", background: C.white, border: `1px solid ${C.border}`,
    borderRadius: "12px", padding: "24px", textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  bikeEmoji: { fontSize: "56px", marginBottom: "12px" },
  bikeName: { fontSize: "18px", fontWeight: "800", marginBottom: "4px" },
  bikeType: { fontSize: "12px", color: C.muted, marginBottom: "14px" },
  divider: { height: "1px", background: C.border, margin: "14px 0" },
  priceLabel: { fontSize: "12px", color: C.muted },
  priceVal: { fontSize: "26px", fontWeight: "800", color: C.accent },
  formCard: {
    flex: 1, minWidth: "280px", background: C.white, border: `1px solid ${C.border}`,
    borderRadius: "12px", padding: "24px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  sectionTitle: { fontSize: "16px", fontWeight: "700", marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: C.muted, marginBottom: "6px" },
  input: {
    width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`,
    borderRadius: "8px", fontSize: "14px", color: C.text,
    outline: "none", boxSizing: "border-box", marginBottom: "16px",
  },
  durationGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "16px" },
  durBtn: (a) => ({
    padding: "12px 8px", border: `1px solid ${a ? C.accent : C.border}`,
    borderRadius: "8px", background: a ? "#eff6ff" : C.white,
    color: a ? C.accent : C.muted, fontWeight: "700", fontSize: "13px",
    cursor: "pointer", textAlign: "center",
  }),
  fieldRow: { display: "flex", gap: "12px", marginBottom: "16px" },
  fieldHalf: { flex: 1 },
  summaryBox: {
    background: "#f0f7ff", border: `1px solid #bfdbfe`,
    borderRadius: "10px", padding: "16px", marginBottom: "16px", marginTop: "8px",
  },
  summaryTitle: { fontSize: "13px", fontWeight: "700", color: C.accent, marginBottom: "10px" },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: "13px", color: C.muted, marginBottom: "6px" },
  summaryTotal: {
    display: "flex", justifyContent: "space-between", fontSize: "16px",
    fontWeight: "800", color: C.text, paddingTop: "10px",
    borderTop: `1px solid ${C.border}`, marginTop: "6px",
  },
  submitBtn: {
    width: "100%", padding: "12px", background: C.accent, color: "#fff",
    border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer",
  },
};

// bike prop = the actual selected bike object from UserDashboard
export default function BookBike({ bike, onBack, onPay }) {
  const [duration, setDuration]     = useState(1);
  const [customDays, setCustomDays] = useState("");
  const [startDate, setStartDate]   = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  // Dynamic calculation based on selected bike price
  const activeDays = duration === 0 ? (parseInt(customDays) || 0) : duration;
  const subtotal   = (bike?.price || 0) * activeDays;
  const gst        = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  // Auto-calculate end date
  const calcEndDate = () => {
    if (!startDate || activeDays <= 0) return "";
    const d = new Date(startDate);
    d.setDate(d.getDate() + activeDays);
    return d.toISOString().split("T")[0];
  };

  const handleConfirm = async () => {
  if (!startDate) {
    alert("Please select a start date!");
    return;
  }

  if (!pickupLocation) {
    alert("Please enter pickup location!");
    return;
  }

  if (activeDays <= 0) {
    alert("Please select a valid duration!");
    return;
  }

  try {
    // ✅ Call backend
    const res = await API.post("/bookings", {
      bikeId: bike._id, // IMPORTANT: must exist in DB
      startDate,
      endDate: calcEndDate(),
      days: activeDays,
      pickupLocation,
      total: grandTotal,
    });

    const booking = res.data;

    // ✅ Pass REAL booking data
    onPay({
      bike,
      days: activeDays,
      startDate,
      endDate: calcEndDate(),
      pickupLocation,
      subtotal,
      gst,
      grandTotal,
      status: booking.status,
      bookingId: booking._id, // 🔥 real MongoDB ID
      bookedAt: new Date().toLocaleDateString(),
    });

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.msg || "Booking failed");
  }
};

  if (!bike) return (
    <div style={S.page}>
      <button style={S.backBtn} onClick={onBack}>← Back</button>
      <p>No bike selected. Please go back and choose a bike.</p>
    </div>
  );

  return (
    <div style={S.page}>
      <button style={S.backBtn} onClick={onBack}>← Back to Bikes</button>
      <h1 style={S.pageTitle}>Book Your Bike</h1>

      <div style={S.layout}>
        {/* LEFT — Bike Info (dynamic from selected bike) */}
        <div style={S.bikeCard}>
          <div style={S.bikeEmoji}>{bike.img}</div>
          <div style={S.bikeName}>{bike.name}</div>
          <div style={S.bikeType}>{bike.type} • {bike.cc}cc</div>
          <div style={S.divider}></div>
          <div style={S.priceLabel}>Price per day</div>
          <div style={S.priceVal}>₹{bike.price}</div>
          <div style={{ marginTop: "8px", fontSize: "12px", color: "#ca8a04" }}>⭐ {bike.rating}</div>
        </div>

        {/* RIGHT — Booking Form */}
        <div style={S.formCard}>
          <div style={S.sectionTitle}>Select Duration & Details</div>

          {/* Duration Buttons */}
          <label style={S.label}>Rental Duration</label>
          <div style={S.durationGrid}>
            {DURATIONS.map((d) => (
              <button key={d.label} style={S.durBtn(duration === d.days)}
                onClick={() => setDuration(d.days)}>
                {d.label}
                {/* Show cost dynamically based on bike price */}
                {d.days > 0 && (
                  <div style={{ fontSize: "11px", color: C.muted, marginTop: "2px" }}>
                    ₹{bike.price * d.days}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Custom days input */}
          {duration === 0 && (
            <>
              <label style={S.label}>Number of Days</label>
              <input style={S.input} type="number" min="1" placeholder="e.g. 5"
                value={customDays} onChange={(e) => setCustomDays(e.target.value)} />
            </>
          )}

          {/* Date fields */}
          <div style={S.fieldRow}>
            <div style={S.fieldHalf}>
              <label style={S.label}>Start Date</label>
              <input style={{ ...S.input, marginBottom: 0 }} type="date"
                min={new Date().toISOString().split("T")[0]}
                value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div style={S.fieldHalf}>
              <label style={S.label}>End Date</label>
              <input style={{ ...S.input, marginBottom: 0, background: "#f9fafb" }}
                type="date" value={calcEndDate()} readOnly />
            </div>
          </div>

          {/* Pickup Location */}
          <div style={{ marginTop: "16px" }}>
            <label style={S.label}>Pickup Location</label>
            <input style={S.input} type="text" placeholder="e.g. Surat Central Station"
              value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
          </div>

          {/* Dynamic Price Summary */}
          <div style={S.summaryBox}>
            <div style={S.summaryTitle}>📋 Booking Summary</div>
            <div style={S.summaryRow}><span>Bike</span><span>{bike.name}</span></div>
            <div style={S.summaryRow}><span>Duration</span><span>{activeDays} day(s)</span></div>
            <div style={S.summaryRow}><span>Rate</span><span>₹{bike.price}/day</span></div>
            <div style={S.summaryRow}><span>Subtotal ({activeDays} × ₹{bike.price})</span><span>₹{subtotal}</span></div>
            <div style={S.summaryRow}><span>GST (18%)</span><span>₹{gst}</span></div>
            <div style={S.summaryTotal}>
              <span>Total Amount</span>
              <span style={{ color: C.accent }}>₹{grandTotal}</span>
            </div>
          </div>

          <button style={S.submitBtn} onClick={handleConfirm}>
            Proceed to Payment → ₹{grandTotal}
          </button>
        </div>
      </div>
    </div>
  );
}
