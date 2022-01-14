import "../App.css";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useHistory } from "react-router-dom";
import register from "../api/Register";
import pdf from "../files/agreement.pdf";
import toast, { Toaster } from "react-hot-toast";
function RegisterPage() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [agreement, setAgreement] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegisterClick = async () => {
    setLoading(true);
    if (email == "" || password == "" || repeatedPassword == "")
    {
      toast.error("please fill all fields", {
        position: "bottom-center",
      });
    }
    else if (!agreement)
    {
      toast.error("please accept the agreement", {
        position: "bottom-center",
      });
  }
    else if (password != repeatedPassword)
    {
      toast.error("please repeat your password correctly", {
        position: "bottom-center",
      });
    }
    else {
      let response = await register(email, password);
      if (response) {
        toast.success("Register succeeded", {
          position: "bottom-center",
        });
        history.push("/login");
      } else {
        toast.error("Register failed, please use a valid unregistered email", {
          position: "bottom-center",
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: "#ffffff", fontSize: 75 }}>
        Transcription Corrector
        </h1>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            padding: 20,
            borderRadius: 10,
            width: "30%",
          }}
        >
          <input
            style={{
              backgroundColor: "#224957",
              width: "100%",
              height: 30,
              marginTop: 10,
              borderRadius: 7,
              color: "#ffffff",
              borderWidth: 0,
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder=" Email Address"
          ></input>

          <input
            type="password"
            style={{
              backgroundColor: "#224957",
              width: "100%",
              height: 30,
              marginTop: 10,
              borderRadius: 7,
              color: "#ffffff",
              borderWidth: 0,
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder=" Password"
          ></input>

          <input
            type="password"
            style={{
              backgroundColor: "#224957",
              width: "100%",
              height: 30,
              marginTop: 10,
              borderRadius: 7,
              color: "#ffffff",
              borderWidth: 0,
            }}
            onChange={(e) => {
              setRepeatedPassword(e.target.value);
            }}
            placeholder=" Repeat Password"
          ></input>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              name="isGoing"
              type="checkbox"
              onChange={(e) => {
                setAgreement(e.target.checked);
              }}
              style={{ alignSelf: "center" }}
            />
            <p href={pdf} style={{ fontSize: 10, alignSelf: "center" }}>
              {" "}
              i agree to the terms and conditions of this{" "}
            </p>
            <div style={{ width: 5 }}> </div>
            <a
              href={pdf}
              style={{
                fontSize: 10,
                alignSelf: "center",
                display: "table-cell",
              }}
              target="_blank"
            >
              {" "}
              agreement
            </a>
          </div>

          <button
            onClick={onRegisterClick}
            style={{
              backgroundColor: "#20DF7F",
              width: "100%",
              height: 35,
              borderRadius: 7,
              marginTop: 10,
              color: "white",
            }}
          >
            Register
          </button>
          <ClipLoader color={"#ffffff"} loading={loading} size={40} />
        </div>
        <div style={{ height: 10 }}></div>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 10,
            width: "30%",
            padding: 20,
          }}
        >
          <Link to="login" style={{ color: "#ffffff", fontSize: 10 }}>
            already have an account? login now!
          </Link>
        </div>
        <Toaster></Toaster>
      </header>
    </div>
  );
}

export default RegisterPage;
