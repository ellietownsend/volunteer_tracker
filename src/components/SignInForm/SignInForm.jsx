import { useActionState, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/SigninFrom.css";
import { useAuth } from "../../context/AuthContext";



function SignIn() {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const [linkSuccessfullySent, setlinkSuccessfullySent] = useState(false);


  const [error, submitAction, isPending] = useActionState(
    async (previousSignInData, newSignInData) => {
      const email =  newSignInData.get('email');
    
      const {
        success,
        data,
        error: signInError
      } = await signInUser(email);

      if(signInError){
        return new Error(signInError);
      }

      setlinkSuccessfullySent(true);

    },null);

 return (
  <>
    <div className="signin-wrapper">
      <div className="signin-card">
        <div className="signin-header">
          <h2>
            Welcome, <br></br>Girls Who Math!
          </h2>
          <p>Login to your volunteer dashboard.</p>
        </div>

        <div className="signin-body">
          <form action={submitAction}>
            <div className="form-container">

              <div className="form-group" aria-label="Sign in form">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
              >
                {isPending
                  ? "Sending Sign-In Link..."
                  : "Send sign-in link"}
              </button>

              <div>
                {linkSuccessfullySent 
                ? "Link Sent! Please check email."
                : null}

              </div>
              

              {error && (
                <p className="error-message">
                  {error.message}
                </p>
              )}

            </div>
          </form>
        </div>
      </div>
    </div>
  </>
);


}

export default SignIn


