import React from "react";
import {  unAuth } from "../user/User";
import { useHistory } from "react-router-dom";
export default function LogoutButton()
{
    const history = useHistory();

    const logout = () => {
        unAuth();
        history.push("login");
      };

    return(
        <button
            onClick={logout}
            style={{
              position: "absolute",
              top: "4%",
              right: "2%",
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
            Logout
          </button>
    );
}