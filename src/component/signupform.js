import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/userauth";
import cutecss from "../styles/cutegirl.module.css";
import Signupstyle from "../styles/SignupForm.module.css";
export default function SignupForm({ className }) {
  const [username, setname] = useState();
  const [useremail, setusermail] = useState();
  const [userpassword, setpassword] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  async function handleclick(e) {
    try {
      setloading(true);
      seterror("");

      await signup(useremail, userpassword, username);
      navigate("/quiz");
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror("Sign Up failed!");
    }
  }

  return (
    <>
      <img
        src="/image/cute-girl.svg"
        alt="AnimeSvg"
        className={cutecss.cute_girl}
      />
      <div className={Signupstyle.form}>
        <div>
          <input
            type="text"
            placeholder="Enter Your username"
            required
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <img src="/image/user1.svg" alt="username" />
        </div>
        <div>
          <input
            type="email"
            required
            placeholder="Enter valid email id"
            onChange={(e) => {
              setusermail(e.target.value);
            }}
          />
          <img src="/image/email.svg" alt="email" />{" "}
        </div>
        <div>
          <input
            type="password"
            required
            placeholder="Enter Password (use strong password)"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <img src="/image/password.svg" alt="password" />{" "}
        </div>
        <button type="button" disabled={loading} onClick={handleclick}>
          Create Account
        </button>
        {!loading && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}
