import "../App.css";
import React, { useState } from "react";
import login from "../api/Login";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../user/User";
import toast, { Toaster } from 'react-hot-toast';

function LoginPage() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const callLogin = async () => {
    setLoading(true);
    let response = await login(email, password);
    setLoading(false);
    if (response) {
      auth(response.token, email);
      history.push("/");
    } else {
      toast.error("Failed to login, please check your credentials", { position: "bottom-center" });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: "#ffffff", fontSize: 75 }}>
        Transcription Corrector
        </h1>
        <div
          style={{
            marginBottom: "20px",
            backgroundColor: "rgba(255,255,255,0.05)",
            padding: 20,
            borderRadius: 10,
            width: "60%",
          }}
        >
        <strong>This website will only work on Chrome and Firefox Browsers</strong>

        </div>


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

          {/*<p style={{ fontSize: 10, textAlign: "start" }}>Forgot Password?</p>*/}

          <button
            onClick={callLogin}
            style={{
              backgroundColor: "#20DF7F",
              width: "100%",
              height: 35,
              borderRadius: 7,
              marginTop: 10,
              color: "white",
            }}
          >
            Login
          </button>
          <div style={{ height: 10 }}></div>
          <ClipLoader color={"#ffffff"} loading={loading} size={40} />
        </div>

        <div style={{ height: 10 }}></div>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 10,
            width: "30%",
            padding: 20,
            paddingBottom:29
          }}
        >
          <Link to="/register" style={{ color: "#ffffff", fontSize: 12 }}>
            Do not have an account? register now!
          </Link>
        </div>
        <img
              src={require("../images/background.png").default}
              style={{
                bottom: "0%",
                backgroundColor: "rgba(0,0,0,0)",
                width: "100%",
                position: "absolute",
              }}
            ></img>
        <Toaster></Toaster>
      </header>
    </div>
  );
}

export default LoginPage;
