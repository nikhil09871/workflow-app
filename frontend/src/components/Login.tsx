import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

const Login = ({
  onLoginSuccess,
}: {
  onLoginSuccess: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    // ✅ Basic validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        }
      );

      console.log("Login success:", response.data);

      // ✅ Navigate to workflow page
      onLoginSuccess();

    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">Sign in</h1>

      {/* Google Button */}
<div className="social-row">
  <button className="social-btn">
    <img
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      alt="Google"
      className="social-icon"
    />
    <span>Sign in with Google</span>
  </button>

  <span className="last-used">Last used</span>
</div>

{/* GitHub Button */}
<button className="social-btn">
  <img
    src="https://www.svgrepo.com/show/512317/github-142.svg"
    alt="GitHub"
    className="social-icon"
  />
  <span>Sign in with GitHub</span>
</button>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="password-row">
          <label>Password</label>
          <a href="#">Forgot password?</a>
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && <p className="error-text">{error}</p>}

        {/* Sign In */}
        <button
          className="signin-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Login;
