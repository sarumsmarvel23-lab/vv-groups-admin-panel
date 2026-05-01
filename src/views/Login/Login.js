import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import browser from "browser-detect";
import { CSpinner } from "@coreui/react";

import { loginApi } from "../../api/auth";
import { setAuthToken } from "../../lib/localStorage";
import { toast } from "../../redux/toast/toast.action";
import { role } from "src/redux/role/role.action";
import { setAuthorization } from "../../config/axios";
import { validateLoginData } from "./validation";

const initailValue = { email: "", password: "", twoFACode: "", otp: "" };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState(initailValue);
  const [validateError, setValidateError] = useState({});
  const [loginHistory, setloginHistory] = useState({});
  const [showTwoFA, setShowTwoFA] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isOtp, setIsOtp] = useState(false);

  const { email, password, twoFACode, otp } = formValue;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
    if (value) setValidateError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    try {
      setLoader(true);
      e.preventDefault();
      let reqData = { email, password, loginHistory, twoFACode, isOtp, otp };
      const { isValid, validErr } = validateLoginData(reqData);
      if (!isValid) { setLoader(false); setValidateError(validErr); return; }

      const { success, message, token, errors, result, twoFA, status } =
        await loginApi(reqData, dispatch);
      setLoader(false);

      if (success) {
        if (status === "OTP") {
          setIsOtp(true);
          toast({ message, type: "success" }, dispatch);
          return;
        }
        setValidateError({});
        setFormValue(initailValue);
        setAuthToken(token);
        setAuthorization(token);
        role({ _id: result._id, email: result.email, name: result.name, role: result.role, restriction: result.restriction }, dispatch);
        navigate(result.role === "superAdmin" ? "/dashboard" : "/");
      } else {
        if (errors) { setValidateError(errors); }
        else {
          if (twoFA) { setIsOtp(false); setShowTwoFA(twoFA); }
          toast({ message, type: "error" }, dispatch);
        }
      }
    } catch (err) { }
  };

  const getLoginInfo = async () => {
    try {
      fetch("https://ipapi.co/json/")
        .then((data) => data.json())
        .then((parsed) => {
          const ua = window.navigator.userAgent;
          const patterns = [
            [/(Windows NT|Windows) ?([0-9._]+)/],
            [/(Mac OS X) ?([0-9._]+)/],
            [/(CPU(?: iPhone)? OS) ?([0-9._]+)/],
            [/(Android) ?([0-9._]+)/],
          ];
          let osName = "Unknown", osVersion = "";
          for (const [rx] of patterns) {
            if (rx.test(ua)) { osName = ua.match(rx)[1]; osVersion = ua.match(rx)[2] || ""; break; }
          }
          const br = browser();
          setloginHistory({ countryName: parsed.country_name, countryCode: parsed.country_calling_code, ipaddress: parsed.ip, region: parsed.region, broswername: br.name, ismobile: br.mobile, os: osName + osVersion });
        })
        .catch(() => { });
    } catch { }
  };

  useEffect(() => { getLoginInfo(); }, []);

  /* ── inline styles (all VV Groups Gold/Teak tokens) ── */
  const S = {
    page: {
      minHeight: "100vh",
      display: "flex",
      background: "#1C1410",
      fontFamily: "'Inter', sans-serif",
    },
    left: {
      flex: "0 0 45%",
      background: "linear-gradient(160deg, #2A1F14 0%, #3D2D1E 50%, #1C1410 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 50px",
      position: "relative",
      overflow: "hidden",
      borderRight: "1px solid rgba(201,168,76,0.15)",
    },
    leftOrb1: {
      position: "absolute", width: 400, height: 400,
      background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
      borderRadius: "50%", top: -100, right: -100, pointerEvents: "none",
    },
    leftOrb2: {
      position: "absolute", width: 300, height: 300,
      background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
      borderRadius: "50%", bottom: -50, left: -50, pointerEvents: "none",
    },
    logo: { width: 140, marginBottom: 40, position: "relative" },
    tagline: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 36,
      fontWeight: 600,
      color: "#EDE8DF",
      textAlign: "center",
      lineHeight: 1.3,
      marginBottom: 16,
      position: "relative",
    },
    taglineSub: {
      fontSize: 14, color: "#A89880", textAlign: "center",
      lineHeight: 1.7, maxWidth: 320, position: "relative",
    },
    divider: {
      width: 60, height: 2,
      background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
      margin: "28px auto",
    },
    stats: {
      display: "flex", gap: 40, marginTop: 20, position: "relative",
    },
    statItem: { textAlign: "center" },
    statNum: { fontSize: 22, fontWeight: 700, color: "#C9A84C" },
    statLabel: { fontSize: 11, color: "#7A6A55", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 },

    /* RIGHT PANEL */
    right: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 40px",
    },
    formBox: {
      width: "100%",
      maxWidth: 420,
    },
    formTitle: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 32,
      fontWeight: 600,
      color: "#EDE8DF",
      marginBottom: 6,
    },
    formSubtitle: { fontSize: 13, color: "#7A6A55", marginBottom: 36 },
    label: {
      display: "block", fontSize: 12, fontWeight: 600,
      color: "#A89880", marginBottom: 8,
      textTransform: "uppercase", letterSpacing: "0.06em",
    },
    inputWrap: { position: "relative", marginBottom: 8 },
    input: {
      width: "100%", height: 52,
      background: "#251A10",
      border: "1px solid #4A3820",
      borderRadius: 8,
      color: "#EDE8DF",
      fontSize: 14,
      padding: "0 44px 0 16px",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    inputIcon: {
      position: "absolute", right: 14, top: "50%",
      transform: "translateY(-50%)",
      color: "#7A6A55", cursor: "pointer", fontSize: 16,
    },
    error: { fontSize: 12, color: "#E05C5C", marginBottom: 16, display: "block" },
    fieldGroup: { marginBottom: 20 },
    btn: {
      width: "100%", height: 52,
      background: "linear-gradient(135deg, #C9A84C 0%, #A8893A 100%)",
      border: "none", borderRadius: 8,
      color: "#1C1410", fontSize: 15,
      fontWeight: 700, cursor: "pointer",
      letterSpacing: "0.04em",
      boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
      transition: "all 0.2s",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      marginTop: 8,
    },
    goldLine: {
      width: "100%", height: 1,
      background: "linear-gradient(90deg, transparent, #C9A84C44, transparent)",
      margin: "28px 0",
    },
    copyright: { fontSize: 12, color: "#4A3820", textAlign: "center", marginTop: 24 },
  };

  return (
    <div style={S.page}>
      {/* ── LEFT: BRANDING ── */}
      <div style={S.left}>
        <div style={S.leftOrb1} />
        <div style={S.leftOrb2} />

        <img src="/logo.png" alt="VV Groups" style={S.logo} />

        <div style={S.divider} />

        <h1 style={S.tagline}>
          Estates · Exports<br />& Stays
        </h1>
        <p style={S.taglineSub}>
          A curated portfolio of heritage real estate, premium spice exports, and sanctuary stays — managed from one powerful dashboard.
        </p>

        <div style={S.divider} />

        <div style={S.stats}>
          <div style={S.statItem}>
            <div style={S.statNum}>3</div>
            <div style={S.statLabel}>Verticals</div>
          </div>
          <div style={S.statItem}>
            <div style={S.statNum}>∞</div>
            <div style={S.statLabel}>Possibilities</div>
          </div>
          <div style={S.statItem}>
            <div style={S.statNum}>1</div>
            <div style={S.statLabel}>Dashboard</div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: LOGIN FORM ── */}
      <div style={S.right}>
        <div style={S.formBox}>
          <h2 style={S.formTitle}>Welcome back</h2>
          <p style={S.formSubtitle}>Sign in to your admin console</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={S.fieldGroup}>
              <label style={S.label}>Email Address</label>
              <div style={S.inputWrap}>
                <input
                  style={S.input}
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}

                  autoComplete="email"
                />
                <span style={S.inputIcon}>
                  <i className="bi bi-envelope" />
                </span>
              </div>
              {validateError.email && <span style={S.error}>{validateError.email}</span>}
            </div>

            {/* Password */}
            <div style={S.fieldGroup}>
              <label style={S.label}>Password</label>
              <div style={S.inputWrap}>
                <input
                  style={S.input}
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}

                  autoComplete="current-password"
                />
                <span style={S.inputIcon} onClick={() => setShowPass(!showPass)}>
                  <i className={`bi bi-eye${showPass ? "-slash" : ""}-fill`} />
                </span>
              </div>
              {validateError.password && <span style={S.error}>{validateError.password}</span>}
            </div>

            {/* OTP */}
            {isOtp && (
              <div style={S.fieldGroup}>
                <label style={S.label}>One-Time Password</label>
                <div style={S.inputWrap}>
                  <input
                    style={S.input}
                    type="number"
                    name="otp"
                    value={otp}
                    onChange={handleChange}
                    placeholder="Enter OTP sent to your email"
                  />
                  <span style={S.inputIcon}><i className="bi bi-shield-lock" /></span>
                </div>
                {validateError.otp && <span style={S.error}>{validateError.otp}</span>}
              </div>
            )}

            {/* 2FA */}
            {showTwoFA && (
              <div style={S.fieldGroup}>
                <label style={S.label}>2FA Authenticator Code</label>
                <div style={S.inputWrap}>
                  <input
                    style={S.input}
                    type="number"
                    name="twoFACode"
                    value={twoFACode}
                    onChange={handleChange}
                    placeholder="6-digit code"
                  />
                  <span style={S.inputIcon}><i className="bi bi-qr-code" /></span>
                </div>
                {validateError.twoFACode && <span style={S.error}>{validateError.twoFACode}</span>}
              </div>
            )}

            <button
              type="submit"
              style={S.btn}
              disabled={loader}
              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(201,168,76,0.45)"; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,76,0.35)"; }}
            >
              {loader ? (
                <>
                  <CSpinner size="sm" />
                  Authenticating…
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div style={S.goldLine} />
          <p style={S.copyright}>© {new Date().getFullYear()} VV Groups · All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
