import React from "react";
import {  unAuth } from "../user/User";
import { useHistory } from "react-router-dom";
export default function BackButton()
{
    const history = useHistory();

    const back = () => {
        history.replace("/");
      };

    return(
        <button
            onClick={back}
            style={{
              position: "absolute",
              top: "4%",
              left: "2%",
              zIndex: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              border: "none",
              fontSize: "0.75em",
              cursor: "pointer",
            }}
          >
            Back
          </button>
    );
}