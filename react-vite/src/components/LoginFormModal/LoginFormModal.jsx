import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault()

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password"
      })
    )
    if(serverResponse){
      setErrors(serverResponse)
    } else {
      closeModal()
    }
  }

  return (
    <div className="login-modal-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-modal-form">
        <label className="login-modal-input">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
            className="login-modal-input-area"
          />
        {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label className="login-modal-input">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
            className="login-modal-input-area"
          />
        {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <button className="login-modal-submit-button" type="submit">Log In</button>
        <button className="login-modal-submit-button" onClick={demoLogin}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
