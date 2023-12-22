import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkSignup } from "../../redux/session";
import { useState } from "react";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="sign-up-container">
      <h1 className="sign-up-header">Create your Jinglefy account!</h1>
      {errors.server && <p className="error">{errors.server}</p>}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label className="sign-up-input">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label className="sign-up-input">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        {errors.username && <p className="error">{errors.username}</p>}
        </label>
        <label className="sign-up-input">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <label className="sign-up-input">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </label>
        <button className="sign-up-submit-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
