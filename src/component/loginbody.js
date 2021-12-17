import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../Authentication/userauth";
import Loginstyle from "../styles/login.module.css";

export default function Loginform() {
  const [loading, setloading] = useState(false);
  const [email, setmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const Navigate = useNavigate();
  const { login } = useAuth();
  async function handlelogin() {
    try {
      setloading(true);
      seterror("");
      await login(email, password);
      Navigate("/quiz");
    } catch (err) {
      console.log(err);
      setloading(false);
      seterror("LogIn failed!");
    }
  }
  return (
    <div>
      <img
        src="/image/Cartoon-Butterfly.svg"
        alt="Butterfly"
        style={{ width: "30%" }}
      />
      <img
        src="/image/butterfly.svg"
        alt="butterfly"
        style={{ width: "30%", float: "right" }}
      />
      <div className={Loginstyle.loginform}>
        <div>
          <input
            type="email"
            required
            placeholder="Enter email id"
            onChange={(e) => {
              setmail(e.target.value);
            }}
          />
          <img src="/image/email.svg" alt="email" />
        </div>
        <div>
          <input
            type="password"
            required
            placeholder="Enter password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <img src="/image/password.svg" alt="password" />
        </div>
        <button type="button" onClick={handlelogin}>
          LogIn
        </button>
        {!loading && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
