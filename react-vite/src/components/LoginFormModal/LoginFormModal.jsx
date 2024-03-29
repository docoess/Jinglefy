import { thunkLogin } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./LoginForm.css";

function LoginFormModal() {
  const navigate = useNavigate();
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
      navigate('/albums')
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
      navigate('/albums')
      closeModal()
    }
  }

  return (
    <div className="login-modal-container">
      <h1>Log In</h1>
      <form className="login-modal-form" onSubmit={handleSubmit}>
        <label className="login-modal-input">
          Email
          <input
            className="login-modal-input-area"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
            <p className="error">{errors.email}</p>
        </label>
        <label className="login-modal-input">
          Password
          <input
            className="login-modal-input-area"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
            <p className="error">{errors.password}</p>
        </label>
        <button className="login-modal-submit-button" type="submit">Log In</button>
        <button className="login-modal-submit-button" onClick={demoLogin}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
