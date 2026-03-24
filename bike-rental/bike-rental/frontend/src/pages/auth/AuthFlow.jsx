import { useState } from "react";
import axios from "axios";
import API from "../api";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@bikerental.com";
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "Admin@123";

const C = {
  bg: "#f5f6fa",
  white: "#ffffff",
  border: "#e0e0e0",
  accent: "#1a73e8",
  text: "#1a1a2e",
  muted: "#6b7280",
  red: "#dc2626",
  green: "#16a34a",
};

const S = {
  page: {
    minHeight: "100vh",
    background: C.bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: "16px",
    padding: "36px 32px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  },
  logoArea: { textAlign: "center", marginBottom: "20px" },
  logo: { fontSize: "40px" },
  title: {
    fontSize: "21px",
    fontWeight: "800",
    color: C.text,
    margin: "8px 0 3px",
  },
  subtitle: { fontSize: "13px", color: C.muted },

  // Role tabs (only on login)
  tabRow: {
    display: "flex",
    background: C.bg,
    borderRadius: "10px",
    padding: "4px",
    marginBottom: "20px",
    gap: "4px",
  },
  tab: (a) => ({
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    background: a ? C.accent : "transparent",
    color: a ? "#fff" : C.muted,
    transition: "all 0.2s",
  }),

  // Form
  row2: { display: "flex", gap: "12px" },
  fieldWrap: { marginBottom: "14px" },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: C.muted,
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    border: `1px solid ${C.border}`,
    borderRadius: "8px",
    fontSize: "14px",
    color: C.text,
    outline: "none",
    boxSizing: "border-box",
  },
  pwWrap: { position: "relative" },
  pwInput: {
    width: "100%",
    padding: "11px 42px 11px 14px",
    border: `1px solid ${C.border}`,
    borderRadius: "8px",
    fontSize: "14px",
    color: C.text,
    outline: "none",
    boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: 0,
  },
  forgotLink: {
    background: "none",
    border: "none",
    color: C.accent,
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    display: "block",
    textAlign: "right",
    marginBottom: "16px",
    padding: 0,
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    background: C.accent,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "4px",
  },
  errorBox: {
    padding: "10px 14px",
    borderRadius: "8px",
    marginBottom: "12px",
    background: "#fef2f2",
    border: `1px solid #fecaca`,
    color: C.red,
    fontSize: "13px",
  },
  successBox: {
    padding: "10px 14px",
    borderRadius: "8px",
    marginBottom: "12px",
    background: "#f0fdf4",
    border: `1px solid #bbf7d0`,
    color: C.green,
    fontSize: "13px",
  },
  infoBox: {
    marginTop: "14px",
    padding: "11px 14px",
    borderRadius: "8px",
    background: "#eff6ff",
    border: `1px solid #bfdbfe`,
    fontSize: "12px",
    color: C.muted,
    lineHeight: "1.6",
  },
  switchRow: {
    textAlign: "center",
    marginTop: "18px",
    fontSize: "13px",
    color: C.muted,
  },
  switchBtn: {
    background: "none",
    border: "none",
    color: C.accent,
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "13px",
    padding: 0,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "16px 0",
  },
  divLine: { flex: 1, height: "1px", background: C.border },
  divText: { fontSize: "12px", color: C.muted },
  backBtn: {
    background: "none",
    border: "none",
    color: C.accent,
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    marginTop: "14px",
    padding: 0,
    width: "100%",
  },
  successPage: { textAlign: "center", padding: "8px 0" },
};

// =============================================
// LOGIN SCREEN
// =============================================
function LoginScreen({
  onForgot,
  onLoginSuccess,
  onGoRegister,
  registeredUsers,
}) {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }

    if (role === "admin") {
      if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        onLoginSuccess("admin", email, "Admin");
      } else {
        setError("Invalid admin credentials!");
      }
    } else {
      try {
        const res = await API.post("/auth/login", {
          email,
          password,
        });

        // ✅ Save JWT
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        onLoginSuccess("user", res.data.user.email, res.data.user.name);
      } catch (err) {
        setError(err.response?.data?.msg || "Login failed");
      }
    }
  };

  return (
    <>
      <div style={S.logoArea}>
        <div style={S.logo}>🚲</div>
        <h2 style={S.title}>Welcome Back!</h2>
        <p style={S.subtitle}>Sign in to your account</p>
      </div>

      {/* Role Tabs */}
      <div style={S.tabRow}>
        <button
          style={S.tab(role === "user")}
          onClick={() => {
            setRole("user");
            setError("");
          }}
        >
          🙋 User
        </button>
        <button
          style={S.tab(role === "admin")}
          onClick={() => {
            setRole("admin");
            setError("");
          }}
        >
          🛠️ Admin
        </button>
      </div>

      {error && <div style={S.errorBox}>⚠️ {error}</div>}

      <div style={S.fieldWrap}>
        <label style={S.label}>Email Address</label>
        <input
          style={S.input}
          type="email"
          placeholder={
            role === "admin" ? "admin@bikerental.com" : "you@example.com"
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
      </div>

      <div style={S.fieldWrap}>
        <label style={S.label}>Password</label>
        <div style={S.pwWrap}>
          <input
            style={S.pwInput}
            type={showPw ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button style={S.eyeBtn} onClick={() => setShowPw(!showPw)}>
            {showPw ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {role === "user" && (
        <button style={S.forgotLink} onClick={onForgot}>
          Forgot Password?
        </button>
      )}

      <button style={S.submitBtn} onClick={handleLogin}>
        Login as {role === "admin" ? "Admin 🛠️" : "User 🙋"} →
      </button>

      {role === "admin" && (
        <div style={S.infoBox}>
          🔑 Admin credentials are fixed. Check .env file if forgotten.
        </div>
      )}

      {/* Switch to Register */}
      {role === "user" && (
        <div style={S.switchRow}>
          Don't have an account?{" "}
          <button style={S.switchBtn} onClick={onGoRegister}>
            Register here
          </button>
        </div>
      )}
    </>
  );
}

// =============================================
// REGISTER SCREEN
// =============================================
function RegisterScreen({ onGoLogin, onRegisterSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  // Password strength
  const getStrength = (pw) => {
    if (!pw) return null;
    if (pw.length < 6) return { label: "Weak", color: C.red, width: "30%" };
    if (pw.length < 10)
      return { label: "Medium", color: "#ca8a04", width: "65%" };
    return { label: "Strong", color: C.green, width: "100%" };
  };
  const strength = getStrength(password);

  const handleRegister = async () => {
    setError("");

    if (!firstName || !lastName || !email || !password || !confirm) {
      setError("Please fill all required fields!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await API.post("/auth/register", {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        password,
      });

      onRegisterSuccess({ name: `${firstName} ${lastName}` });
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <>
      <div style={S.logoArea}>
        <div style={S.logo}>🚲</div>
        <h2 style={S.title}>Create Account</h2>
        <p style={S.subtitle}>Join Bike Rental System today</p>
      </div>

      {error && <div style={S.errorBox}>⚠️ {error}</div>}

      {/* First + Last Name */}
      <div style={S.row2}>
        <div style={{ ...S.fieldWrap, flex: 1 }}>
          <label style={S.label}>First Name *</label>
          <input
            style={S.input}
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div style={{ ...S.fieldWrap, flex: 1 }}>
          <label style={S.label}>Last Name *</label>
          <input
            style={S.input}
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div style={S.fieldWrap}>
        <label style={S.label}>Email Address *</label>
        <input
          style={S.input}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={S.fieldWrap}>
        <label style={S.label}>Phone Number</label>
        <input
          style={S.input}
          type="tel"
          placeholder="+91 9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div style={S.fieldWrap}>
        <label style={S.label}>Password *</label>
        <div style={S.pwWrap}>
          <input
            style={S.pwInput}
            type={showPw ? "text" : "password"}
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={S.eyeBtn} onClick={() => setShowPw(!showPw)}>
            {showPw ? "🙈" : "👁️"}
          </button>
        </div>
        {/* Password strength bar */}
        {strength && (
          <div style={{ marginTop: "6px" }}>
            <div
              style={{
                background: C.border,
                borderRadius: "4px",
                height: "4px",
              }}
            >
              <div
                style={{
                  width: strength.width,
                  height: "100%",
                  background: strength.color,
                  borderRadius: "4px",
                  transition: "width 0.3s",
                }}
              ></div>
            </div>
            <span
              style={{
                fontSize: "11px",
                color: strength.color,
                marginTop: "3px",
                display: "block",
              }}
            >
              Password Strength: {strength.label}
            </span>
          </div>
        )}
      </div>

      <div style={S.fieldWrap}>
        <label style={S.label}>Confirm Password *</label>
        <input
          style={S.input}
          type="password"
          placeholder="Re-enter password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {confirm && (
          <span
            style={{
              fontSize: "11px",
              marginTop: "4px",
              display: "block",
              color: confirm === password ? C.green : C.red,
            }}
          >
            {confirm === password
              ? "✅ Passwords match!"
              : "❌ Passwords don't match"}
          </span>
        )}
      </div>

      <button style={S.submitBtn} onClick={handleRegister}>
        Create Account →
      </button>

      <div style={S.switchRow}>
        Already have an account?{" "}
        <button style={S.switchBtn} onClick={onGoLogin}>
          Login here
        </button>
      </div>
    </>
  );
}

// =============================================
// FORGOT PASSWORD SCREEN
// =============================================
function ForgotScreen({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent)
    return (
      <div style={S.successPage}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>📧</div>
        <h3
          style={{ fontSize: "18px", fontWeight: "800", marginBottom: "8px" }}
        >
          Check Your Email!
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: C.muted,
            lineHeight: "1.7",
            marginBottom: "20px",
          }}
        >
          Reset link sent to{" "}
          <strong style={{ color: C.accent }}>{email}</strong>.<br />
          Backend team will handle the reset flow.
        </p>
        <button style={S.submitBtn} onClick={onBack}>
          ← Back to Login
        </button>
      </div>
    );

  return (
    <>
      <div style={S.logoArea}>
        <div style={S.logo}>🔑</div>
        <h2 style={S.title}>Forgot Password?</h2>
        <p style={S.subtitle}>Enter your email to receive a reset link</p>
      </div>
      <div style={S.fieldWrap}>
        <label style={S.label}>Registered Email</label>
        <input
          style={S.input}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        style={S.submitBtn}
        onClick={() => {
          if (!email) {
            alert("Enter email!");
            return;
          }
          setSent(true);
        }}
      >
        Send Reset Link 📨
      </button>
      <button style={S.backBtn} onClick={onBack}>
        ← Back to Login
      </button>
    </>
  );
}

// =============================================
// REGISTER SUCCESS SCREEN
// =============================================
function RegisterSuccess({ name, onGoLogin }) {
  return (
    <div style={{ ...S.successPage, padding: "20px 0" }}>
      <div style={{ fontSize: "56px", marginBottom: "14px" }}>🎉</div>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "800",
          marginBottom: "8px",
          color: C.green,
        }}
      >
        Account Created!
      </h2>
      <p
        style={{
          fontSize: "13px",
          color: C.muted,
          lineHeight: "1.8",
          marginBottom: "24px",
        }}
      >
        Welcome, <strong>{name}</strong>!<br />
        Your account has been created successfully.
        <br />
        You can now login to book bikes.
      </p>
      <button style={S.submitBtn} onClick={onGoLogin}>
        Go to Login →
      </button>
    </div>
  );
}

// =============================================
// ROOT COMPONENT
// =============================================
export default function AuthFlow({ onLoginSuccess }) {
  // "login" | "register" | "forgot" | "registerSuccess"
  const [screen, setScreen] = useState("login");
  const [registeredUsers, setRegistered] = useState([]);
  const [newUserName, setNewUserName] = useState("");

  const handleRegisterSuccess = (userData) => {
    setNewUserName(userData.name);
    setScreen("registerSuccess");
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        {screen === "login" && (
          <LoginScreen
            onForgot={() => setScreen("forgot")}
            onLoginSuccess={onLoginSuccess}
            onGoRegister={() => setScreen("register")}
          />
        )}
        {screen === "register" && (
          <RegisterScreen
            onGoLogin={() => setScreen("login")}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}
        {screen === "forgot" && (
          <ForgotScreen onBack={() => setScreen("login")} />
        )}
        {screen === "registerSuccess" && (
          <RegisterSuccess
            name={newUserName}
            onGoLogin={() => setScreen("login")}
          />
        )}
      </div>
    </div>
  );
}
