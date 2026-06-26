import { useState } from "react";
import "../styles/LoginPage.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);

    console.log({
      email,
      password,
    });
  };

  const handleSocialLogin = (provider) => {
    console.log("Login with:", provider);
  };

  return (
    <div
      className="login-page gradient-bg"
    >
      <div className="background-overlay"></div>

    

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="subtitle">
          Sign in to your account to continue
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button
            className="login-button"
            disabled={isLoading}
          >
            {isLoading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        {/* GOOGLE */}

        <button
          className="social-button"
          onClick={() =>
            handleSocialLogin("Google")
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26
              1.37-1.04 2.53-2.21
              3.31v2.77h3.57c2.08-1.92
              3.28-4.74
              3.28-8.09z"
            />

            <path
              fill="#34A853"
              d="M12
              23c2.97
              0
              5.46-.98
              7.28-2.66l-3.57-2.77c-.98.66-2.23
              1.06-3.71
              1.06-2.86
              0-5.29-1.93-6.16-4.53H2.18v2.84C3.99
              20.53
              7.7
              23
              12
              23z"
            />

            <path
              fill="#FBBC05"
              d="M5.84
              14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43
              8.55
              1
              10.22
              1
              12s.43
              3.45
              1.18
              4.93l2.85-2.22.81-.62z"
            />

            <path
              fill="#EA4335"
              d="M12
              5.38c1.62
              0
              3.06.56
              4.21
              1.64l3.15-3.15C17.45
              2.09
              14.97
              1
              12
              1
              7.7
              1
              3.99
              3.47
              2.18
              7.07l3.66
              2.84c.87-2.6
              2.43-4.53
              6.16-4.53z"
            />
          </svg>

          Continue with Google

        </button>

        {/* APPLE */}

        <button
          className="social-button"
          onClick={() =>
            handleSocialLogin("Apple")
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 384 512"
            fill="currentColor"
          >
            <path d="M318.7 268.7c-.2-36.7
            16.4-64.4
            50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3
            20.7-88.5
            20.7-15
            0-49.4-19.7-76.4-19.7C63.3
            141.2
            4
            184.8
            4
            273.5q0
            39.3
            14.4
            81.2c12.8
            36.7
            59
            126.7
            107.2
            125.2
            25.2-.6
            43-17.9
            75.8-17.9
            31.8
            0
            48.3
            17.9
            76.4
            17.9
            48.6-.7
            90.4-82.5
            102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4
            24.8-61.9
            24-72.5-24.1
            1.4-52
            16.4-67.9
            34.9-17.5
            19.8-27.8
            44.3-25.6
            71.9
            26.1
            2
            49.9-11.4
            69.5-34.3z"/>
          </svg>

          Continue with Apple

        </button>
                {/* META */}

        <button
          className="social-button"
          onClick={() => handleSocialLogin("Meta")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#1877F2"
          >
            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
          </svg>

          Continue with Meta
        </button>

        <div className="forgot-password">
          <a href="#">
            Don't have an account? Sign up
          </a>
        </div>

      </div>
    </div>
  );
}

export default Login;