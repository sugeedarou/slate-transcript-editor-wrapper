import "../App.css";
import React from "react";
import { useHistory,useLocation } from "react-router-dom";
import { auth } from "../user/User";
import * as qs from 'query-string';
import getUserInfo from "../api/GetUserInfo";

function ExternLoginPage(props) {
  const history = useHistory();
  const location = useLocation();
  console.log("location");
  const parsed = qs.parse(location.search);
  console.log(parsed.token);
  console.log(parsed.task_id)

  getUserInfo(parsed.token).then((e)=>{
    if(e.email)
    {
      auth(parsed.token, e.email);
      history.push("/?task_id="+parsed.task_id);
    }
    else
    {
      history.push("/");
    }
  })

  return (
    <div className="App">
      <header className="App-header">
    
        
      </header>
    </div>
  );
}

export default ExternLoginPage;
