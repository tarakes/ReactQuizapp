import { useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../Authentication/userauth";
import Loading from "../styles/loading.module.css";
import Setstyle from "../styles/Set.module.css";
import Navbar from "./navbar";
import Question from "./Question";
import useSolutions from "./useSolution";
export default function Result() {
  const { currentUser, logout } = useAuth();
  const { state } = useLocation();
  const [total, setTotal] = useState(0);
  const { loading, solutions } = useSolutions();

  const [errr, seterrr] = useState("");
  const [logoutloading, setlogoutloading] = useState(false);
  const navigate = useNavigate();
  // console.log(state);
  // console.log(solutions, state, loading);
  async function handlelogout() {
    try {
      seterrr("");
      setlogoutloading(true);
      await logout();
      navigate("/");
    } catch (error) {
      seterrr("LogOut falied! Plz try again");
      setlogoutloading(false);
    }
  }
  useMemo(() => {
    setTotal(0);
    if (solutions.length !== 0) {
      for (var i = 0; i < state.length; i++) {
        //setfound(-1);
        var x = -1;
        for (var op = 1; op < state[i].options.length; op++) {
          //we found a wrong answer
          if (
            state[i].options[op].isselected &&
            !solutions[i].options[op].istrue
          ) {
            setTotal((prevc) => prevc - 1);
            x = 1;
            //  console.log([i, op, x, "wrong"]);
            break; //goto next question
          } else if (state[i].options[op].isselected) {
            //console.log([i], "corre");
            x = 0;
          }
        }
        // console.log(x);
        if (x === 0) {
          setTotal((prevc) => prevc + 1);
          //    console.log([i, "correct"]);
        }
      }
    }
  }, [solutions, state]);
  if (!currentUser) return <Navigate to={"/"} />;
  else if (!state) return <Navigate to={"/quiz"} />;
  else if (!loading && solutions.length !== 0) {
    //   console.log(state[4].options.length);
    /*   <img src="/image/user1.svg" alt="user" style={{ width: "6%" }} /> */
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
        {!logoutloading && <p>{errr}</p>}
        <div style={{ margin: "30px" }}>
          <img
            src="/image/result.svg"
            alt="Result"
            style={{ width: "220px" }}
          />
          <div
            style={{
              marginTop: "-5px",
              fontFamily: "'Spartan', sans-serif",
              fontWeight: "bolder",
              color: "#000000",
            }}
          >{`Your total score ${total} out of ${state.length}`}</div>
          <br />
          <div>
            <div>
              <img
                src="/image/correct.svg"
                alt="correct"
                style={{ width: "20px" }}
              />
              <span style={{ fontFamily: "serif" }}>+1 for correct</span>
            </div>
            <div>
              <img
                src="/image/wrong.svg"
                alt="wrong"
                style={{ width: "20px" }}
              />
              <span style={{ fontFamily: "serif" }}>-1 for wrong</span>
            </div>
          </div>
          <div className={Setstyle.qs}>
            {state.map((quesNo, index) => (
              <>
                <Question qs={quesNo.q} />
                {quesNo.options.map((ansNum, ansIndex) => {
                  return (
                    <>
                      <button
                        type="button"
                        style={{
                          backgroundColor:
                            ansNum.isselected &&
                            !solutions[index].options[ansIndex].istrue
                              ? "red"
                              : ansNum.isselected &&
                                solutions[index].options[ansIndex].istrue
                              ? "green"
                              : "skyblue",
                        }}
                      >
                        {ansNum.value}
                      </button>
                    </>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </>
    );
  } else
    return (
      <img src="/image/loading.svg" alt="loading" className={Loading.wheel} />
    );
}
