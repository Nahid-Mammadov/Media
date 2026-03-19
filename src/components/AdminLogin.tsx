import React, { useState } from "react";

export default function AdminLogin({
  loginForm,
  setLoginForm,
  handleLogin,
  loginError,
}: any) {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="login-root">
      <div className="login-box">
        {/* LOGO */}
        <div className="login-logo">
          <div className="login-logo-icon">⬡</div>
          <h1>Admin Panel</h1>
          <p>Media Management System</p>
        </div>

        {/* ERROR */}
        {loginError && <div className="login-error">{loginError}</div>}

        {/* EMAIL */}
        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            value={loginForm.user}
            onChange={(e) =>
              setLoginForm({ ...loginForm, user: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {/* PASSWORD */}
        <div className="login-field">
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              value={loginForm.pass}
              onChange={(e) =>
                setLoginForm({ ...loginForm, pass: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{ paddingRight: "40px" }}
              
            />
            <span
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "var(--muted)",
                userSelect: "none",
              }}
            >
              {showPass ? "🙈" : "👁"}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button className="login-btn" onClick={handleLogin}>
          Sign In →
        </button>
      </div>
    </div>
  );
}
