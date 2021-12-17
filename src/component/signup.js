import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../Authentication/userauth";
import Navbar from "./navbar";
import SignupForm from "./signupform";
export default function Signup() {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to={"/quiz"} />;
  else
    return (
      <div>
        <Navbar>
          <Link
            to={"/"}
            style={{
              color: "white",
            }}
          >
            Login
          </Link>
        </Navbar>
        <SignupForm />
      </div>
    );
}
