import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/SigninFrom.css";


function SignInForm({ className = "", ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
  };
return (
  <div className={`signin-wrapper ${className}`} {...props}>
    <div className="signin-card">
      <div className="signin-header">
        <h2>Welcome, Girls Who Math!</h2>
        <p>Login to your volunteer dashboard.</p>
      </div>

      <div className="signin-body">
        <form onSubmit={handleSignIn}>
          <div className="form-container">

            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>



            {error && (
              <p className="error-message">
                {error}
              </p>
            )}


            <button
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Signing in..."
                : "Sign in"}
            </button>

          </div>
        </form>
      </div>
    </div>
  </div>
);
}

export default SignInForm
