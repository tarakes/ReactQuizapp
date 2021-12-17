import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useAuth } from "../Authentication/userauth";
import Loading from "../styles/loading.module.css";
import Setstyle from "../styles/Set.module.css";
import Navbar from "./navbar";
import Question from "./Question";
import useQuestions from "./useQuestions";
export default function Quiz() {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, questions } = useQuestions();
  const [currq, setcurrq] = useState(0);

  const [errr, seterrr] = useState("");
  const [logoutloading, setlogoutloading] = useState(false);
  const { currentUser, logout } = useAuth();
  // eslint-disable-next-line no-new-object
  //const [isc, setisc] = useState("none");
  const navigate = useNavigate();
  useEffect(() => {
    setcurrq(0);
  }, []);
  async function handlelogout() {
    try {
      seterrr("");
      setlogoutloading(true);
      await logout();
      Navigate("/");
    } catch (error) {
      seterrr("LogOut falied! Plz try again");
      setlogoutloading(false);
    }
  }
  function handleclicknext() {
    // setisc("none");
    if (currq + 1 < questions.length) {
      setcurrq((prevcurr) => prevcurr + 1);
      var elements = document.getElementsByClassName("options");

      // console.log(questions[currq + 1].options);
      for (var i = 0; i < 4; i++) {
        //  console.log(questions[currq + 1].options);
        if (questions[currq + 1].options[i + 1].isselected)
          elements[i].style.backgroundColor = "green";
        else elements[i].style.backgroundColor = "aqua";
      }
    }
  }
  function handleclickprev() {
    //  setisc("none");
    if (currq !== 0) {
      setcurrq((prevcurr) => prevcurr - 1);
      var elements = document.getElementsByClassName("options");
      // console.log(questions[currq - 1].options);
      for (var i = 0; i < 4; i++) {
        // console.log(questions[currq - 1].options);
        if (questions[currq - 1].options[i + 1].isselected)
          elements[i].style.backgroundColor = "green";
        else elements[i].style.backgroundColor = "aqua";
      }
    }
  }
  function gotoresult() {
    navigate("/result", { state: questions });
  }
  //console.log(questions.length);
  if (!currentUser) return <Navigate to={"/"} />;
  else if (!loading && questions.length) {
    return (
      <>
        <Navbar>
          <>
            <img
              src="/image/logout.svg"
              alt="user"
              style={{ width: "40%", height: "30px" }}
              onClick={handlelogout}
              disabled={logoutloading}
            />
            <p style={{ marginTop: "0px" }}> {currentUser.displayName}</p>
          </>
        </Navbar>
        <div style={{ padding: "20px" }}>
          {!logoutloading && <p>{errr}</p>}
          <div className={Setstyle.qs}>
            <Question qs={questions[currq].q} />
            {questions[currq].options.map((ansoption, index) => (
              <>
                <button
                  className="options"
                  onClick={(e) => {
                    //  checkans(ansoption.istrue);

                    if (ansoption.isselected === false) {
                      ansoption.isselected = true;
                      e.target.style.backgroundColor = "green";
                    } else {
                      ansoption.isselected = false;
                      e.target.style.backgroundColor = "aqua";
                    }
                  }}
                >
                  {ansoption.value}
                </button>
              </>
            ))}
          </div>
          <img
            src="image/nextbutton.svg"
            alt="Next"
            style={{ width: "100px", float: "right", marginTop: "30px" }}
            onClick={handleclicknext}
          />
          <img
            src="image/prevbutton.svg"
            alt="Previous"
            style={{ width: "100px", marginTop: "30px" }}
            onClick={handleclickprev}
          />
          {currq + 1 === questions.length && (
            <button
              onClick={gotoresult}
              type="button"
              style={{
                float: "right",
                width: "100px",
                height: "32px",
                marginTop: "184px",
                marginRight: "-99px",
                borderRadius: "20px",
                backgroundColor: "#f77369",
                color: "white",
                fontWeight: "20px",
                fontFamily: "cursive",
                fontSize: "unset",
              }}
            >
              Submit
            </button>
          )}
          <div
            style={{
              width: `${((currq + 1) / questions.length) * 100}%`,
              height: "10px",
              borderRadius: "10px",
              marginTop: "182px",
              float: "left",
              position: "fixed",
              backgroundColor: "green",
            }}
          ></div>
        </div>
      </>
    );
  } else
    return (
      <img src="/image/loading.svg" alt="loading" className={Loading.wheel} />
    );
}
