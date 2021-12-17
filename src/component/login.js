import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../Authentication/userauth";
import Loginform from "./loginbody";
import Navbar from "./navbar";
export default function Login() {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to={"/quiz"} />;
  else
    return (
      <div>
        <Navbar>
          <Link
            to={"/signup"}
            style={{
              color: "white",
            }}
          >
            SignUp
          </Link>
        </Navbar>
        <Loginform />
      </div>
    );
}
