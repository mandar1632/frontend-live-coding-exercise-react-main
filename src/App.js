import "../src/App.css";
import React, { useState, useEffect, useRef } from "react";
import { QUESTIONS } from "./questions";

function App(props) {
  const [qno, setQno] = useState(1);
  const [marks, setMarks] = useState({});
  const [total, setTotal] = useState(0);
  const radioYesRef = useRef();
  const radioNoRef = useRef();
  let tempQuestions = QUESTIONS;

  useEffect(() => {}, [qno]);

  function setRadio(qno) {
    if (marks?.[qno] == "yes") {
      radioYesRef.current.checked = true;
      radioNoRef.current.checked = false;
    } else if (marks?.[qno] == "no") {
      radioYesRef.current.checked = false;
      radioNoRef.current.checked = true;
    } else {
      radioYesRef.current.checked = false;
      radioNoRef.current.checked = false;
    }
  }

  function indexHandler(e) {
    console.log("indexHandler - " + JSON.stringify(marks));

    if (e.target.value === "next")
      if (qno < Object.keys(QUESTIONS).length)
        setQno((prevState) => {
          setRadio(prevState + 1);
          return prevState + 1;
        });

    if (e.target.value === "prev")
      if (qno > 1)
        setQno((prevState) => {
          setRadio(prevState - 1);
          return prevState - 1;
        });
  }

  function radioHandler(e) {
    console.log("radioHandler - " + JSON.stringify(marks));
    let temp = {};
    temp[qno] = e.target.value;

    setMarks((prevState) => {
      const arr = { ...prevState, ...temp };
      let totalYes = 0;
      if (Object.keys(arr).length !== 0) {
        for (const [key, value] of Object.entries(arr)) {
          if (value === "yes") totalYes += 1;
        }
        setTotal((prev) => 100 * (totalYes / Object.keys(QUESTIONS).length));
      }
      return arr;
    });
  }

  return (
    <div className="main__wrap">
      <main className="container">
        <div>
          <div>{QUESTIONS[qno]}</div>
          <br />
          <div>
            <br />
            <input
              type="radio"
              id="yes"
              name="answer"
              value="yes"
              onChange={radioHandler}
              ref={radioYesRef}
            />
             <label for="html">Yes</label>
            <input
              type="radio"
              id="no"
              name="answer"
              value="no"
              onChange={radioHandler}
              ref={radioNoRef}
            />
            <label for="css">No</label>
            <br />
          </div>
          <button value={"prev"} onClick={indexHandler} className={"btnLeft"}>
            Previou
          </button>
          <button value={"next"} onClick={indexHandler} className={"btnRight"}>
            Next
          </button>
          <div>{"Score : " + total}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
