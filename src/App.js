import "./App.css";
import LoginPage from "./pages/LoginPage"
import ToolPage from "./pages/ToolPage"
import RegisterPage from "./pages/RegisterPage"
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 
import SlateTranscriptEditorPage from "./pages/SlateTranscriptEditorPage";
import ExternLoginPage from './pages/ExternLoginPage'
function App() {
  return (
    <Router>
        <Switch>
          <Route exact path={"/"}>
             <ToolPage></ToolPage>
          </Route> 
          <Route exact path={"/editor"}>
             <SlateTranscriptEditorPage></SlateTranscriptEditorPage>
          </Route>
          <Route exact path={"/login"}>
             <LoginPage></LoginPage>
          </Route>   
          <Route exact path={"/register"}>
             <RegisterPage></RegisterPage>
          </Route>     
          <Route exact path={"/router"}>
             <ExternLoginPage></ExternLoginPage>
          </Route> 
        </Switch>
    </Router>
  );
}

export default App;
